#!/bin/bash

# Start sitemap watcher in background
echo "🚀 Starting sitemap auto-generator..."
tsx scripts/watch-sitemap.ts &
WATCHER_PID=$!

# Start the dev server
echo "🚀 Starting development server..."
NODE_ENV=development tsx server/index.ts &
DEV_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down..."
    kill $WATCHER_PID 2>/dev/null
    kill $DEV_PID 2>/dev/null
    exit 0
}

# Trap exit signals
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
