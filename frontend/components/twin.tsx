'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Download, Trash2, RefreshCw } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingContent, setStreamingContent] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading || isStreaming) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        const messageToSend = input;
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsStreaming(true);
        setStreamingContent('');

        // Create abort controller for this request
        abortControllerRef.current = new AbortController();

        try {
            const response = await fetch('http://localhost:8000/chat/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageToSend,
                    session_id: sessionId || undefined,
                }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) throw new Error('Failed to send message');

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No response body');

            let fullContent = '';
            let currentSessionId = sessionId;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            
                            if (data.type === 'session_id') {
                                currentSessionId = data.session_id;
                                if (!sessionId) {
                                    setSessionId(data.session_id);
                                }
                            } else if (data.type === 'content') {
                                fullContent += data.content;
                                setStreamingContent(fullContent);
                            } else if (data.type === 'done') {
                                // Streaming complete
                                const assistantMessage: Message = {
                                    id: (Date.now() + 1).toString(),
                                    role: 'assistant',
                                    content: fullContent,
                                    timestamp: new Date(),
                                };
                                setMessages(prev => [...prev, assistantMessage]);
                                setStreamingContent('');
                                break;
                            } else if (data.type === 'error') {
                                throw new Error(data.error);
                            }
                        } catch (parseError) {
                            // Ignore parse errors for incomplete chunks
                        }
                    }
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
            if (error.name !== 'AbortError') {
                // Add error message
                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again.',
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, errorMessage]);
                setStreamingContent('');
            }
        } finally {
            setIsStreaming(false);
            abortControllerRef.current = null;
        }
    };

    const clearConversation = () => {
        setMessages([]);
        setSessionId('');
        setStreamingContent('');
    };

    const exportConversation = () => {
        const conversationText = messages.map(msg => 
            `${msg.role.toUpperCase()}: ${msg.content}\n`
        ).join('\n');
        
        const blob = new Blob([conversationText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `conversation-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const stopGeneration = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Bot className="w-6 h-6" />
                            Hamid's Digital Twin
                        </h2>
                        <p className="text-sm text-slate-300 mt-1">AI Engineer & Developer</p>
                    </div>
                    <div className="flex gap-2">
                        {messages.length > 0 && (
                            <>
                                <button
                                    onClick={exportConversation}
                                    className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                                    title="Export conversation"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={clearConversation}
                                    className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                                    title="Clear conversation"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="text-lg font-medium">Hello! I'm Hamid's Digital Twin.</p>
                        <p className="text-sm mt-2 max-w-md mx-auto">
                            Ask me about my AI projects, technical expertise, career journey, 
                            or anything related to AI engineering and development!
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            <button 
                                onClick={() => setInput("Tell me about your Chef AI project")}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs hover:bg-slate-200 transition-colors"
                            >
                                Chef AI Project
                            </button>
                            <button 
                                onClick={() => setInput("What's your background in AI?")}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs hover:bg-slate-200 transition-colors"
                            >
                                AI Background
                            </button>
                            <button 
                                onClick={() => setInput("How do you approach AI development?")}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs hover:bg-slate-200 transition-colors"
                            >
                                Development Approach
                            </button>
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {message.role === 'assistant' && (
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        )}

                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                message.role === 'user'
                                    ? 'bg-slate-700 text-white'
                                    : 'bg-white border border-gray-200 text-gray-800'
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <p
                                className={`text-xs mt-1 ${
                                    message.role === 'user' ? 'text-slate-300' : 'text-gray-500'
                                }`}
                            >
                                {message.timestamp.toLocaleTimeString()}
                            </p>
                        </div>

                        {message.role === 'user' && (
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {(isLoading || isStreaming) && (
                    <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[70%]">
                            {streamingContent ? (
                                <>
                                    <p className="whitespace-pre-wrap">{streamingContent}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex space-x-1">
                                            <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
                                            <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-100" />
                                            <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-200" />
                                        </div>
                                        <button
                                            onClick={stopGeneration}
                                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                        >
                                            <RefreshCw className="w-3 h-3" />
                                            Stop
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-800"
                        disabled={isLoading || isStreaming}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading || isStreaming}
                        className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}