# 🤖 Digital Twin Chatbot

A sophisticated AI-powered digital twin chatbot that represents Hamid Dadvar, an AI Engineer and Developer. This project showcases advanced AI capabilities with real-time streaming responses, conversation memory, and a modern web interface.

## ✨ Features

### 🧠 **AI-Powered Personality**
- **Authentic Digital Twin**: Embodies Hamid's professional expertise and personality
- **Rich Context**: Detailed background in AI engineering, mobile development, and innovative projects
- **Data Repository**: Uses real LinkedIn data, structured facts, and communication style preferences
- **Dynamic Context**: Automatically generates personality prompts from multiple data sources
- **Conversational**: Natural, engaging responses that feel like talking to the real person

### 🚀 **Real-Time Streaming**
- **Live Responses**: Watch responses being generated in real-time
- **Smooth UX**: No waiting for complete responses
- **Stop Generation**: Ability to stop mid-stream if needed

### 💾 **Conversation Memory**
- **Session Persistence**: Conversations are saved and can be resumed
- **Context Awareness**: AI remembers previous parts of the conversation
- **Export Functionality**: Download conversations as text files

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful Interface**: Clean, modern design with smooth animations
- **Interactive Elements**: Suggested starter questions and conversation management

### 🛠 **Technical Features**
- **FastAPI Backend**: High-performance Python API with streaming support
- **Next.js Frontend**: Modern React-based user interface
- **CORS Configured**: Proper cross-origin resource sharing
- **Error Handling**: Robust error management and user feedback

## 🏗️ Architecture

```
twin/
├── backend/           # FastAPI Python backend
│   ├── server.py      # Main API server with streaming
│   ├── context.py     # Dynamic personality generation
│   ├── resources.py   # Data loading utilities
│   ├── data/          # Data repository
│   │   ├── facts.json # Structured personal information
│   │   ├── linkedin.pdf # LinkedIn profile data
│   │   ├── style.txt  # Communication style
│   │   └── summary.txt # Professional summary
│   ├── requirements.txt
│   └── memory/        # Conversation storage
└── frontend/          # Next.js React frontend
    ├── app/
    ├── components/
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- OpenAI API key

### 1. Clone the Repository
```bash
git clone https://github.com/hamidreza23/my-digital-twin.git
cd my-digital-twin
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file:
```bash
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGINS=http://localhost:3000,http://192.168.1.100:3000
```

**Note**: The digital twin uses a data repository system with:
- `data/facts.json` - Structured personal information
- `data/linkedin.pdf` - LinkedIn profile data
- `data/style.txt` - Communication preferences
- `data/summary.txt` - Professional background

Start the backend:
```bash
python server.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Health Check**: http://localhost:8000/health

## 🔧 API Endpoints

### Chat Endpoints
- `POST /chat` - Standard chat (non-streaming)
- `POST /chat/stream` - Streaming chat with real-time responses
- `GET /sessions` - List all conversation sessions

### Utility Endpoints
- `GET /health` - Health check
- `GET /` - API information

## 🎯 Usage Examples

### Starter Questions
Try these suggested questions to get started:
- "Tell me about your Chef AI project"
- "What's your background in AI?"
- "How do you approach AI development?"

### Conversation Management
- **Export**: Click the download icon to save conversations
- **Clear**: Click the trash icon to start a new conversation
- **Stop**: Click "Stop" during generation to halt responses

## 🛠️ Development

### Backend Development
```bash
cd backend
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
cd frontend
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGINS=http://localhost:3000,http://192.168.1.100:3000
```

## 📁 Project Structure

```
twin/
├── README.md
├── backend/
│   ├── server.py              # FastAPI application
│   ├── context.py             # Dynamic personality generation
│   ├── resources.py           # Data loading utilities
│   ├── data/                  # Data repository
│   │   ├── facts.json         # Structured personal information
│   │   ├── linkedin.pdf       # LinkedIn profile data
│   │   ├── style.txt          # Communication style
│   │   └── summary.txt        # Professional summary
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   └── memory/                # Conversation storage
│       └── *.json             # Session files
└── frontend/
    ├── app/
    │   ├── page.tsx          # Main page
    │   └── layout.tsx        # App layout
    ├── components/
    │   └── twin.tsx          # Chat component
    ├── package.json         # Node dependencies
    └── next.config.ts       # Next.js configuration
```

## 📊 Data Repository System

The digital twin uses a sophisticated data repository system to ensure accurate and personalized responses:

### **Data Sources:**
- **`facts.json`** - Structured personal information (name, role, specialties, experience)
- **`linkedin.pdf`** - Real LinkedIn profile data extracted via PDF processing
- **`style.txt`** - Communication style preferences and tone
- **`summary.txt`** - Professional background and achievements

### **Dynamic Context Generation:**
- **`context.py`** - Generates personalized prompts from all data sources
- **`resources.py`** - Handles data loading and PDF processing
- **Real-time Updates** - Context includes current date/time for relevance

### **Benefits:**
- **Accuracy**: Uses real LinkedIn data instead of generic descriptions
- **Consistency**: Structured facts ensure consistent responses
- **Personalization**: Communication style matches your actual preferences
- **Maintainability**: Easy to update information by modifying data files

## 🔒 Security & Privacy

- **API Keys**: Store OpenAI API keys securely in environment variables
- **CORS**: Configured for specific origins only
- **Memory**: Conversations stored locally, not in external databases
- **Data Privacy**: All personal data stored locally, not shared externally
- **HTTPS**: Use HTTPS in production environments

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Install dependencies: `pip install -r requirements.txt`
3. Run with production server: `uvicorn server:app --host 0.0.0.0 --port 8000`

### Frontend Deployment
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Or deploy to platforms like Vercel, Netlify, etc.

### Docker Deployment (Optional)
```dockerfile
# Backend Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY backend/ .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "server.py"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 About the Digital Twin

This digital twin represents **Hamid Dadvar**, an AI Engineer with:
- 10+ years in technology (mobile development → AI)
- Master's in AI from University of Sussex
- Creator of innovative AI applications (Chef AI, Email Marketing AI)
- Expertise in agentic AI, RAG, and fine-tuning

## 🆘 Support

For issues and questions:
1. Check the [Issues](https://github.com/hamidreza23/my-digital-twin/issues) page
2. Create a new issue with detailed description
3. Include error logs and environment details

---

