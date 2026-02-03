# Feature Integration Checklist

**MANDATORY**: Complete this checklist before marking any feature as "complete" or "done".

This checklist prevents features from being lost or demoted by ensuring they're properly integrated into the site.

---

## ✅ **Pre-Integration Checklist**

Before starting development:

- [ ] Feature purpose is clearly defined
- [ ] Use case is documented
- [ ] Design mockups/specs reviewed
- [ ] Technical approach approved
- [ ] Dependencies identified

---

## ✅ **Development Checklist**

During development:

- [ ] Component created in appropriate location
- [ ] TypeScript types defined
- [ ] Props interface documented
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Accessibility (a11y) considered

---

## ✅ **Integration Checklist** ⭐ **MOST IMPORTANT**

**Before marking feature "complete", verify ALL of these:**

### 1. Component Integration
- [ ] Component imported in target page/component
- [ ] Component rendered and visible in UI
- [ ] Component receives correct props
- [ ] Component state management works
- [ ] Component cleanup on unmount

### 2. User Interaction
- [ ] User can see the feature
- [ ] User can interact with the feature
- [ ] User can complete intended actions
- [ ] User feedback/errors are clear
- [ ] User can navigate away properly

### 3. Testing
- [ ] Tested in development environment
- [ ] Tested in production/staging
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No linter warnings
- [ ] Tested on mobile devices
- [ ] Tested on desktop
- [ ] Tested in different browsers

### 4. Performance
- [ ] Page load time acceptable
- [ ] No performance regressions
- [ ] Images/videos optimized
- [ ] Animations smooth (60fps)
- [ ] Bundle size impact acceptable

### 5. Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] ARIA labels present
- [ ] Focus management correct
- [ ] Color contrast sufficient
- [ ] Text readable at all sizes

### 6. Responsive Design
- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Touch interactions work
- [ ] Layout doesn't break

### 7. Documentation
- [ ] Component documented in code
- [ ] Usage examples provided
- [ ] Props documented
- [ ] Added to feature list/docs
- [ ] User-facing docs updated (if needed)

### 8. Integration Points
- [ ] Connected to data sources
- [ ] API calls work correctly
- [ ] State management integrated
- [ ] Routing works (if applicable)
- [ ] Analytics tracking added (if needed)

---

## ✅ **Post-Integration Checklist**

After integration:

- [ ] Feature tested by team/stakeholders
- [ ] User feedback collected
- [ ] Performance monitored
- [ ] Errors tracked
- [ ] Usage analytics reviewed
- [ ] Documentation updated

---

## 🚨 **Common Failure Points**

These are the most common reasons features get lost:

1. ❌ **Component created but never imported** → Always check imports
2. ❌ **Component imported but never rendered** → Always check JSX
3. ❌ **Component rendered but not visible** → Always check CSS/styling
4. ❌ **Component works but not documented** → Always document usage
5. ❌ **Component works but not tested** → Always test in production

---

## 📋 **Quick Verification Script**

Run these checks before marking complete:

```bash
# 1. Check if component is imported
grep -r "YourComponent" src/

# 2. Check if component is rendered
grep -r "<YourComponent" src/

# 3. Check for TypeScript errors
npm run type-check

# 4. Check for linter errors
npm run lint

# 5. Check bundle size impact
npm run build
```

---

## 🎯 **Integration Examples**

### ✅ Good Integration:
```tsx
// 1. Imported
import MyFeature from '@/components/MyFeature';

// 2. Used in component
export default function Page() {
  return (
    <div>
      <MyFeature data={data} />
    </div>
  );
}
```

### ❌ Bad Integration (Will Get Lost):
```tsx
// Component exists but never imported/used
// This is how features get lost!
```

---

## 📝 **Checklist Usage**

### For Developers:
1. Copy this checklist for each feature
2. Check off items as you complete them
3. Don't mark feature "done" until ALL items checked
4. Share checklist in PR description

### For Code Reviews:
1. Verify checklist is completed
2. Test the feature yourself
3. Check integration points
4. Verify documentation

### For Project Managers:
1. Don't mark feature "complete" until checklist done
2. Verify testing completed
3. Check user-facing documentation
4. Confirm feature is visible/usable

---

## 🔄 **Monthly Review**

Review this checklist monthly:
- [ ] Are all features properly integrated?
- [ ] Are there unused components?
- [ ] Are features documented?
- [ ] Are features tested?

---

**Last Updated**: February 2, 2026  
**Status**: Active - Use for all new features
