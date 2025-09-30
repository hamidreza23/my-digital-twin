#!/bin/bash

# Push Digital Twin Chatbot to GitHub
echo "🚀 Pushing Digital Twin Chatbot to GitHub..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Add all files
echo "📁 Adding files to Git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Initial commit: Digital Twin Chatbot with streaming support

Features:
- Real-time streaming responses
- Conversation memory and export
- Modern UI with suggested questions
- FastAPI backend with CORS support
- Next.js frontend with TypeScript
- Comprehensive documentation
- CI/CD pipeline with GitHub Actions"
fi

# Add remote origin if not exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/hamidreza23/my-digital-twin.git
fi

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "🌐 Repository: https://github.com/hamidreza23/my-digital-twin"
echo ""
echo "🎯 Next steps:"
echo "1. Add your OpenAI API key to backend/.env"
echo "2. Test the application locally"
echo "3. Deploy to production (see DEPLOYMENT.md)"
echo "4. Share your digital twin with the world! 🚀"
