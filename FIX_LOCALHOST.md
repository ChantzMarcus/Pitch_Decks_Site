# Fix Localhost Dev Server Issues

## Problem
- Port 3000 is blocked by process 97133 (can't kill it)
- macOS EPERM errors preventing port binding
- Dev server won't start

## Solutions (Try in Order)

### Solution 1: Kill the Stuck Process Manually

1. **Open Activity Monitor** (Applications → Utilities → Activity Monitor)
2. Search for process ID `97133` or search for "node"
3. Find the process using port 3000
4. Select it and click "Force Quit"
5. Try running `npm run dev` again

### Solution 2: Use a Different Port

Edit `package.json` and change the dev script:

```json
"dev": "next dev -p 3001"
```

Then run:
```bash
npm run dev
```

Access at: `http://localhost:3001`

### Solution 3: Fix macOS Permissions

1. **System Settings** → **Privacy & Security**
2. Scroll to **Full Disk Access**
3. Click the **+** button
4. Add **Terminal** (or **Cursor** if available)
5. Make sure it's checked/enabled
6. Restart Terminal/Cursor
7. Try `npm run dev` again

### Solution 4: Use Terminal Directly (Not Through Cursor)

Sometimes Cursor's sandboxed environment causes issues:

1. Open **Terminal.app** directly (not through Cursor)
2. Navigate to project:
   ```bash
   cd /Users/chantzmarcus/Pitch_Decks_Site
   ```
3. Run:
   ```bash
   npm run dev
   ```

### Solution 5: Restart Your Mac

If nothing else works, restart your Mac to clear stuck processes and reset network permissions.

## Quick Test

After trying any solution, test if it works:

```bash
curl http://localhost:3000
# or
curl http://localhost:3001  # if using different port
```

You should see HTML output if the server is running.

## Alternative: Work on Vercel Deployment

If localhost continues to have issues:

1. Push your changes: `git push origin main`
2. Vercel will auto-deploy
3. Test on the Vercel URL instead
