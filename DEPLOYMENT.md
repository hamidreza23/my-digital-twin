# 🚀 Deployment Guide

This guide covers different deployment options for the Digital Twin Chatbot.

## 📋 Prerequisites

- OpenAI API key
- Domain name (for production)
- SSL certificate (for HTTPS)
- Server with Python 3.8+ and Node.js 18+

## 🌐 Deployment Options

### 1. Vercel (Recommended for Frontend)

#### Frontend Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

#### Backend Deployment
- Deploy to Railway, Render, or Heroku
- Set environment variables:
  - `OPENAI_API_KEY`
  - `CORS_ORIGINS`

### 2. Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .

EXPOSE 8000

CMD ["python", "server.py"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci --only=production

COPY frontend/ .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - CORS_ORIGINS=http://localhost:3000
    volumes:
      - ./backend/memory:/app/memory

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend
```

### 3. Railway Deployment

#### Backend
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

#### Frontend
1. Connect GitHub repository
2. Set build command: `cd frontend && npm run build`
3. Set start command: `cd frontend && npm start`

### 4. Render Deployment

#### Backend
1. Create new Web Service
2. Connect repository
3. Set build command: `pip install -r backend/requirements.txt`
4. Set start command: `cd backend && python server.py`

#### Frontend
1. Create new Static Site
2. Connect repository
3. Set build command: `cd frontend && npm run build`
4. Set publish directory: `frontend/out`

## 🔧 Environment Variables

### Backend
```env
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGINS=https://your-frontend-domain.com
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=production
```

### Frontend
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## 🛡️ Security Considerations

### Production Checklist
- [ ] Use HTTPS for all endpoints
- [ ] Set secure CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Regular security updates

### Rate Limiting
Add to backend/server.py:
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/chat/stream")
@limiter.limit("10/minute")
async def chat_stream(request: Request, chat_request: ChatRequest):
    # ... existing code
```

## 📊 Monitoring

### Health Checks
- Backend: `GET /health`
- Frontend: Built-in Next.js health checks

### Logging
```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add logging to endpoints
logger.info(f"Chat request from {request.client.host}")
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          # Your deployment commands
```

## 📈 Performance Optimization

### Backend
- Use async/await properly
- Implement connection pooling
- Add caching for frequent requests
- Monitor memory usage

### Frontend
- Optimize bundle size
- Implement code splitting
- Use CDN for static assets
- Enable compression

## 🆘 Troubleshooting

### Common Issues
1. **CORS Errors**: Check CORS_ORIGINS configuration
2. **API Key Issues**: Verify OpenAI API key
3. **Memory Issues**: Check conversation storage
4. **Streaming Issues**: Verify WebSocket connections

### Debug Mode
```bash
# Backend
DEBUG=1 python server.py

# Frontend
NODE_ENV=development npm run dev
```

## 📞 Support

For deployment issues:
1. Check logs in your hosting platform
2. Verify environment variables
3. Test locally first
4. Create GitHub issue with details

---

**Happy Deploying! 🚀**
