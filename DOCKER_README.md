# Docker Setup

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd IMY320
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your MongoDB credentials:
   ```
   DB_USERNAME=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   ```

3. **Run the application:**
   ```bash
   docker-compose up --build
   ```

4. **Access your app:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000
   - Backend Health Check: http://localhost:3000/health

5. **Stop the application:**
   ```bash
   docker-compose down
   ```

## Troubleshooting

### Backend 500 Error
- **Check logs:** `docker-compose logs backend`
- **Verify .env file exists** and contains valid MongoDB credentials
- **Ensure MongoDB connection** is working

### Common Issues
- **Port conflicts:** Change ports in `docker-compose.yml` if 3000 or 5173 are in use
- **Environment variables:** Make sure `.env` file is in the root directory
- **Build failures:** Clear Docker cache: `docker system prune`

### Development Mode
To run in development mode with hot reloading:
```bash
docker-compose up
```

### Production Build
To build for production:
```bash
docker-compose -f docker-compose.prod.yml up --build
```
