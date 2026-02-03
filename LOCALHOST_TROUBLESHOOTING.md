# Localhost Troubleshooting Guide

## Most Common Issue: Stale Lock File

If you see this error:
```
⨯ Unable to acquire lock at .next/dev/lock, is another instance of next dev running?
```

**Quick fix:**
```bash
# Kill any running Next.js processes
pkill -f "next dev"

# Remove the lock file
rm -rf .next/dev/lock

# Start fresh
npm run dev
```

---

## Check for Running Processes

```bash
# See if Next.js is already running
ps aux | grep -i "next dev" | grep -v grep

# If you see a process, kill it with:
# kill <PID>
# Or kill all:
pkill -f "next dev"
```

---

## Port Already in Use

If you see:
```
Error: listen EADDRINUSE: address already in use :::8080
```

**Find what's using the port:**
```bash
lsof -i :8080
```

**Kill the process:**
```bash
kill -9 <PID>
```

---

## Current Configuration

Your `package.json` dev script:
```json
"dev": "next dev -H 127.0.0.1 -p 8080"
```

Access at: **http://127.0.0.1:8080**

---

## Still Having Issues?

1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Restart your terminal
