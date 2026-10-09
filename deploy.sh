#!/usr/bin/env bash
# ==============================================================================
# SkyFlow - Automated Production Deployment Script
# Supports: Ubuntu, Debian, CentOS, macOS, Cloud VPS (AWS, DigitalOcean, etc.)
# ==============================================================================

set -e

# ANSI Color Codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}       🚀 Starting SkyFlow Deployment Script          ${NC}"
echo -e "${BLUE}======================================================${NC}"

# 1. Check prerequisites
echo -e "\n${YELLOW}[1/5] Checking Docker & Docker Compose...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

if ! docker compose version &> /dev/null; then
    echo -e "${RED}❌ Docker Compose plugin is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker & Docker Compose are ready.${NC}"

# 2. Check environment configuration
echo -e "\n${YELLOW}[2/5] Checking Environment Configuration (.env)...${NC}"
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo -e "${YELLOW}⚠️ .env not found. Creating from .env.example...${NC}"
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env file. Please review your secrets.${NC}"
    else
        echo -e "${RED}❌ Neither .env nor .env.example was found.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ .env file found.${NC}"
fi

# 3. Build & Deploy Containers
echo -e "\n${YELLOW}[3/5] Building & Launching Containers...${NC}"
docker compose up -d --build

# 4. Wait for services to be healthy
echo -e "\n${YELLOW}[4/5] Waiting for Services to become Healthy...${NC}"
echo -n "Waiting for PostgreSQL and API..."
for i in {1..30}; do
    STATUS=$(docker inspect --format='{{json .State.Health.Status}}' skyflow-app-api 2>/dev/null || echo "\"starting\"")
    if [ "$STATUS" = "\"healthy\"" ]; then
        echo -e "\n${GREEN}✓ API service is HEALTHY!${NC}"
        break
    fi
    echo -n "."
    sleep 2
done

# 5. Final Health Verification
echo -e "\n${YELLOW}[5/5] Verifying API Health Endpoint...${NC}"
PORT=$(grep -E '^PORT=' .env 2>/dev/null | cut -d '=' -f 2 || echo "3000")
PORT=${PORT:-3000}

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}/api/health" || echo "failed")

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ Health check passed (HTTP 200 OK)!${NC}"
    echo -e "\n${BLUE}======================================================${NC}"
    echo -e "${GREEN}       🎉 SkyFlow Deployed Successfully!             ${NC}"
    echo -e "${BLUE}======================================================${NC}"
    echo -e "Web Application:  http://localhost:${PORT}/flight.html"
    echo -e "Auth Portal:      http://localhost:${PORT}/index.html"
    echo -e "Health Endpoint:  http://localhost:${PORT}/api/health"
    echo -e "${BLUE}======================================================${NC}"
else
    echo -e "${YELLOW}⚠️ Container is running, but health check returned: ${HTTP_CODE}${NC}"
    echo -e "Check logs with: docker compose logs -f api"
fi
