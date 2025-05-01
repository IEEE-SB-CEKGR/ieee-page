# Use the official Bun image as base
FROM oven/bun:1 as base

# Set working directory
WORKDIR /app

# Install dependencies stage
FROM base AS dependencies
COPY package.json ./
# Install dependencies
RUN bun install

# Build stage
FROM dependencies AS build
# Copy source code
COPY . .
# Add next.config.js with standalone output
RUN echo "/** @type {import('next').NextConfig} */\nconst nextConfig = { output: 'standalone' };\nmodule.exports = nextConfig;" > next.config.js
# Build the application
RUN bun run build

# Production stage
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy build output from build stage
COPY --from=build --chown=nextjs:bunjs /app/public ./public

# Copy the standalone directory (this is the critical part)
COPY --from=build --chown=nextjs:bunjs /app/.next/standalone ./
COPY --from=build --chown=nextjs:bunjs /app/.next/static ./.next/static

# Set proper permissions for the Next.js cache
RUN mkdir -p .next/cache
RUN chmod 1777 .next/cache

# Expose the port the app runs on
EXPOSE 3000

# Set the hostname for the container
ENV HOSTNAME="0.0.0.0"

# Use the standalone server
CMD ["bun", "server.js"]