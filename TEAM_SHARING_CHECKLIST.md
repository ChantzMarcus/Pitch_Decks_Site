# Feature Integration Checklist - Team Sharing Version

**Share this with your team** - Use for all new features to prevent feature loss.

---

## ✅ **MANDATORY CHECKLIST**

**Before marking any feature "complete", verify ALL items:**

### 1. Component Integration ⭐ CRITICAL
- [ ] Component imported in target page/component
- [ ] Component rendered and visible in UI
- [ ] Component receives correct props
- [ ] Component state management works

### 2. User Can Actually Use It
- [ ] User can see the feature
- [ ] User can interact with the feature
- [ ] User can complete intended actions
- [ ] No console errors

### 3. Testing
- [ ] Tested in development
- [ ] Tested in production/staging
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] No TypeScript errors
- [ ] No linter warnings

### 4. Performance
- [ ] Page load time acceptable
- [ ] Animations smooth (60fps)
- [ ] No performance regressions

### 5. Documentation
- [ ] Component documented in code
- [ ] Added to feature list/docs
- [ ] Usage examples provided

---

## 🚨 **COMMON MISTAKES**

These cause features to get lost:

1. ❌ Component created but never imported
2. ❌ Component imported but never rendered
3. ❌ Component rendered but not visible
4. ❌ Component works but not tested
5. ❌ Component works but not documented

---

## ✅ **QUICK VERIFICATION**

Before marking "done", run:
```bash
# Check if imported
grep -r "YourComponent" src/

# Check if rendered
grep -r "<YourComponent" src/

# Check for errors
npm run type-check && npm run lint
```

---

## 📋 **COPY THIS FOR EACH FEATURE**

When starting a new feature:
1. Copy this checklist
2. Check off items as you complete them
3. Don't mark "done" until ALL checked
4. Include in PR description

---

**Remember**: A feature is NOT complete until it's imported, rendered, visible, usable, tested, and documented!

---

**Full version**: See `docs/FEATURE_INTEGRATION_CHECKLIST.md`
