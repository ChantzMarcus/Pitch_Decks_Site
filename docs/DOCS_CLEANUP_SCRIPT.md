# Documentation Cleanup Script

**Purpose**: Organize markdown files into logical structure

---

## 🎯 **MANUAL STEPS** (Safer than automated script)

### Step 1: Create Structure
```bash
cd /Users/chantzmarcus/Pitch_Decks_Site
mkdir -p docs/{guides,status,planning,deployment,features,archive}
```

### Step 2: Move Files (Do in batches)

#### Guides:
```bash
mv FEATURE_INTEGRATION_CHECKLIST.md docs/guides/
mv TESTING_GUIDE.md docs/guides/
mv TEAM_SHARING_CHECKLIST.md docs/guides/
```

#### Status:
```bash
mv FEATURES_RESTORED*.md docs/status/
mv ALL_DEMOTED_FEATURES.md docs/status/
mv MISSING_FEATURES_AUDIT.md docs/status/
mv PRELOADER_STATUS.md docs/status/
mv SCROLL_ANIMATIONS_STATUS.md docs/status/
mv VIDEO_CARDS_STATUS.md docs/status/
mv GSAP_AND_APPLE_FEATURES_RESTORED.md docs/status/
mv ICON_SYSTEM_REVIEW.md docs/status/
mv FINAL_RESTORATION_ASSESSMENT.md docs/status/
mv RESTORATION_RECOMMENDATION.md docs/status/
mv IMPLEMENTATION_COMPLETE.md docs/status/
```

#### Planning:
```bash
mv RECOMMENDATIONS.md docs/planning/
mv ENHANCEMENT_OPPORTUNITIES.md docs/planning/
mv PREMIUM_ENHANCEMENT_PLAN.md docs/planning/
mv ROI_ANALYSIS.md docs/planning/
```

#### Deployment:
```bash
mv DEPLOYMENT_CHECKLIST.md docs/deployment/
mv DEPLOYMENT.md docs/deployment/
mv QUICK_START_DEPLOYMENT.md docs/deployment/
mv VERIFY_DEPLOYMENT.md docs/deployment/
mv DNS_SETUP_GUIDE.md docs/deployment/
mv GODADDY_DNS_SETUP.md docs/deployment/
mv FIX_GODADDY_DNS.md docs/deployment/
mv NEON_SETUP.md docs/deployment/
mv LAUNCH_GUIDE.md docs/deployment/
```

#### Features:
```bash
mv ARCHIVED_COMPONENTS_EXPLAINED.md docs/features/
mv WHY_FEATURES_WERE_DEMOTED.md docs/features/
mv COMPLETE_SUMMARY.md docs/features/
```

### Step 3: Consolidate Duplicates

**Merge these into one file**:
- `FEATURES_RESTORED.md`
- `FEATURES_RESTORED_COMPLETE.md`
- `FEATURES_RESTORED_FINAL.md`
→ `docs/status/FEATURES_RESTORATION_HISTORY.md`

### Step 4: Create Index

Create `docs/README.md` with links to all organized docs.

---

## ⚠️ **IMPORTANT**

- ✅ Test after each batch
- ✅ Update links as you go
- ✅ Keep README.md in root
- ✅ Don't delete files, just move

---

**See**: `docs/DOCUMENTATION_ORGANIZATION_PLAN.md` for full details
