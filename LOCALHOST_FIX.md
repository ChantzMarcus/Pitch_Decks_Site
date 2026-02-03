# Localhost Connection Fix

## Issue
Getting `EPERM: operation not permitted` errors when trying to start Next.js dev server on ports 3000, 3001, 3002.

## Solution Applied

1. **Changed dev script** to use `127.0.0.1` instead of `localhost` or `0.0.0.0`
2. **Changed port** to 3002 (less likely to conflict)

## Updated Configuration

**package.json:**
```json
"dev": "next dev -H 127.0.0.1 -p 3002"
```

## Access Your Site

Once the server starts successfully, access it at:
- **http://127.0.0.1:3002**
- Or **http://localhost:3002** (if DNS resolves correctly)

## If Still Having Issues

### Option 1: Check macOS Firewall
1. System Settings → Network → Firewall
2. Make sure firewall isn't blocking Node.js

### Option 2: Try Different Port
Change port in `package.json` to something like 4000, 5000, or 8080

### Option 3: Check for Port Conflicts
```bash
lsof -i:3002
# Kill any processes using the port
kill -9 <PID>
```

### Option 4: Restart Terminal/IDE
Sometimes permissions get cached - restart your terminal or IDE

## Current Status

The dev server should now be running on **port 3002** at **http://127.0.0.1:3002**
