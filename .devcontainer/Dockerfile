FROM node:20

# gitmoji-cli 설치를 위한 기본 패키지
RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*

# gitmoji-cli 설치
RUN npm install -g gitmoji-cli

# 작업 디렉토리
WORKDIR /workspace

EXPOSE 3000
