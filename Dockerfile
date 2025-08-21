# 1단계: React 앱 빌드
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2단계: Nginx로 빌드된 정적 파일 서빙
FROM nginx:alpine

# 빌드 결과물을 Nginx 기본 디렉터리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 컨테이너 외부에 오픈할 포트
EXPOSE 80

# Nginx 데몬 포그라운드 실행
CMD ["nginx", "-g", "daemon off;"]
