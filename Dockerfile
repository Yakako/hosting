# Stage 1: Build Vite app
FROM node:lts-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx as non-root
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup -s /sbin/nologin

# Copy build output
COPY --from=build /app/dist .

# Copy env.sh and entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Fix permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx
RUN mkdir -p /var/run/nginx /var/log/nginx /tmp && \
    chown -R appuser:appgroup /var/run/nginx /var/log/nginx /tmp

USER appuser
EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]