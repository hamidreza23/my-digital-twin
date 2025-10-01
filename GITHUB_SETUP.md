# 🚀 GitHub Setup Guide

Quick guide to push your Digital Twin Chatbot to GitHub.

## 📋 Prerequisites

- GitHub account
- Git installed locally
- OpenAI API key

## 🔧 Initial Setup

### 1. Initialize Git Repository
```bash
cd /path/to/your/twin
git init
```

### 2. Add All Files
```bash
git add .
```

### 3. Initial Commit
```bash
git commit -m "Initial commit: Digital Twin Chatbot with streaming support"
```

### 4. Connect to Your GitHub Repository
```bash
git remote add origin https://github.com/hamidreza23/my-digital-twin.git
git branch -M main
git push -u origin main
```

## 🔐 Environment Variables

### For Local Development
Create `backend/.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGINS=http://localhost:3000,http://192.168.1.100:3000
```

### For Production Deployment
Set these in your hosting platform:
- `OPENAI_API_KEY`
- `CORS_ORIGINS` (your production domains)

## 🚀 Quick Start After Clone

```bash
# Clone the repository
git clone https://github.com/hamidreza23/my-digital-twin.git
cd my-digital-twin

# Run setup script
chmod +x setup.sh
./setup.sh

# Add your OpenAI API key
echo "OPENAI_API_KEY=your_key_here" > backend/.env

# Start the application
npm run dev
```

## 📁 Project Structure

```
digital-twin-chatbot/
├── README.md                 # Main documentation
├── CONTRIBUTING.md           # Contribution guidelines
├── DEPLOYMENT.md            # Deployment instructions
├── LICENSE                  # MIT License
├── package.json             # Root package.json
├── setup.sh                 # Setup script
├── .gitignore               # Git ignore rules
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI/CD
├── backend/                 # FastAPI backend
│   ├── server.py           # Main API server
│   ├── me.txt              # Digital twin personality
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example        # Environment template
│   └── .gitignore          # Backend gitignore
└── frontend/               # Next.js frontend
    ├── app/                # Next.js app directory
    ├── components/         # React components
    ├── package.json        # Frontend dependencies
    └── .gitignore          # Frontend gitignore
```

## 🎯 Next Steps

1. **Customize**: Update the personality in `backend/me.txt`
2. **Deploy**: Follow `DEPLOYMENT.md` for production
3. **Contribute**: Read `CONTRIBUTING.md` for guidelines
4. **Monitor**: Set up GitHub Actions for CI/CD

## 🔗 Useful Links

- [GitHub Repository](https://github.com/hamidreza23/my-digital-twin)
- [Issues](https://github.com/hamidreza23/my-digital-twin/issues)
- [Discussions](https://github.com/hamidreza23/my-digital-twin/discussions)

---

**Happy Coding! 🚀**
