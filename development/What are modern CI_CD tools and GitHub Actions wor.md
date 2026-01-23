<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# What are modern CI/CD tools and GitHub Actions workflows for Next.js projects in 2026? Include:

- Automated testing
- Lighthouse CI integration
- Preview deployments
- Type checking
Provide example .yml workflow files.

Excellent! I've found current information about CI/CD practices for Next.js in 2026. Let me provide you with a comprehensive guide with practical workflows.

## Modern CI/CD Tools \& Workflows for Next.js in 2026

### Key CI/CD Practices

**Current Landscape (2026):**

- **GitHub Actions** is the dominant CI/CD platform, with practitioners focusing heavily on core CI/CD automation over other areas like security analysis[^1]
- **Testing integration** has become critical—practitioners emphasize automated testing but face challenges with flakiness and execution time in UI testing frameworks (Playwright, Cypress, Selenium)[^2][^3]
- **Performance monitoring** is increasingly important but still underutilized; Lighthouse CI integration is standard practice
- **Preview deployments** are essential, with Vercel providing automatic preview URLs for every PR[^4]
- **Type checking** and linting are foundational steps in modern workflows

***

### Essential GitHub Actions Workflow for Next.js

#### **1. Core CI Workflow (Automated Testing, Type Checking, Linting)**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Run unit tests
        run: npm run test -- --coverage

      - name: Build Next.js app
        run: npm run build

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          flags: unittests
          fail_ci_if_error: true
```

**Add these scripts to your `package.json`:**

```json
{
  "scripts": {
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:e2e": "playwright test",
    "build": "next build"
  }
}
```


***

#### **2. Lighthouse CI Workflow (Performance \& SEO Audits)**

Create `.github/workflows/lighthouse-ci.yml`:

```yaml
name: Lighthouse CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js app
        run: npm run build

      - name: Start Next.js server
        run: npm start &
        env:
          PORT: 3000

      - name: Wait for server to be ready
        uses: nev7n/wait-for-response@v1
        with:
          url: 'http://localhost:3000'
          timeout: 60000
          interval: 1000

      - name: Run Lighthouse CI
        id: lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/about
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true
          runs: 3

      - name: Comment PR with Lighthouse results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const results = require('./lhci-results.json');
            
            let comment = '## 🚀 Lighthouse Report\n\n';
            results.forEach(run => {
              comment += `| Metric | Score |\n|--------|-------|\n`;
              comment += `| Performance | ${run.summary.performance} |\n`;
              comment += `| Accessibility | ${run.summary.accessibility} |\n`;
              comment += `| Best Practices | ${run.summary['best-practices']} |\n`;
              comment += `| SEO | ${run.summary.seo} |\n`;
            });

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

**Create `lighthouserc.json` in project root:**

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "staticDistDir": "./out"
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "cumulativeLayoutShift": ["error", { "maxNumericValue": 0.1 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }]
      }
    }
  }
}
```


***

#### **3. Preview Deployment + E2E Testing Workflow**

Create `.github/workflows/preview-deployment.yml` (for Vercel):

```yaml
name: Preview Deployment & E2E Tests

on:
  pull_request:
    branches: [main, develop]

jobs:
  preview-deploy:
    runs-on: ubuntu-latest
    outputs:
      deployment_url: ${{ steps.vercel.outputs.preview_url }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        id: vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}

  e2e-tests:
    runs-on: ubuntu-latest
    needs: preview-deploy
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Wait for deployment
        uses: nev7n/wait-for-response@v1
        with:
          url: ${{ needs.preview-deploy.outputs.deployment_url }}
          timeout: 60000
          interval: 1000

      - name: Run E2E tests
        env:
          BASE_URL: ${{ needs.preview-deploy.outputs.deployment_url }}
        run: npm run test:e2e

      - name: Upload Playwright results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```


***

#### **4. Comprehensive Full Pipeline (All-in-One)**

Create `.github/workflows/full-pipeline.yml`:

```yaml
name: Full CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20.x'

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    name: Lint & Type Check
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  test:
    runs-on: ubuntu-latest
    name: Unit Tests
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    runs-on: ubuntu-latest
    name: Build Next.js
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - name: Upload build
        uses: actions/upload-artifact@v4
        with:
          name: next-build
          path: .next/

  lighthouse:
    runs-on: ubuntu-latest
    name: Lighthouse Audit
    if: github.event_name == 'pull_request'
    needs: build
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - name: Start server
        run: npm start &
        env:
          PORT: 3000
      
      - name: Wait for server
        uses: nev7n/wait-for-response@v1
        with:
          url: 'http://localhost:3000'
          timeout: 30000
      
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
          configPath: './lighthouserc.json'
          uploadArtifacts: true

  security-scan:
    runs-on: ubuntu-latest
    name: Security Scan
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Run npm audit
        run: npm audit --audit-level=moderate
        continue-on-error: true
      
      - name: Run Trivy scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  deploy:
    runs-on: ubuntu-latest
    name: Deploy to Production
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    needs: [lint-and-type-check, test, build, security-scan]
    
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
          production: true
```


***

### Key Configuration Files

**`.github/workflows/settings.json` (optional, for parallel test execution):**

```json
{
  "testTimeout": 30000,
  "workers": 4,
  "retries": 2,
  "use": {
    "baseURL": "http://localhost:3000",
    "trace": "on-first-retry",
    "screenshot": "only-on-failure"
  }
}
```

**`playwright.config.ts` (E2E testing):**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```


***

### Best Practices in 2026

| Practice | Why It Matters | Implementation |
| :-- | :-- | :-- |
| **Test against Vercel deployments** | Validates exact production environment, not localhost | Use `deployment_status` event trigger |
| **Explicit deployment readiness** | Prevents false negatives from incomplete deployments | Use polling actions instead of fixed `sleep` |
| **Performance monitoring** | Catches regressions before production | Lighthouse CI with min score assertions |
| **Type safety** | Catches errors at build time | `tsc --noEmit` in every workflow |
| **Parallel execution** | Reduces total CI time significantly | Matrix strategies, sharded test runs |
| **Artifact retention** | Helps debugging failures | 30-day retention for Playwright reports |


***

### Current Trends \& Insights[^1][^2]

1. **Focus on core CI/CD** — Practitioners emphasize testing, building, and deployment over security analysis
2. **UI Testing Challenges** — Flakiness and long execution times remain top concerns with Playwright/Cypress
3. **Action Reusability** — While available, copy-pasting remains common due to complexity of managing dependencies
4. **Performance Monitoring Gap** — Despite importance, fewer teams integrate comprehensive performance tracking
5. **Vercel Integration** — Preview deployments are standard practice for PR validation

These workflows are production-ready for 2026 and incorporate the latest best practices for Next.js projects.
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30][^31][^32][^33][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.semanticscholar.org/paper/87a26e9f471a611b4a1206e6866deeb283fd0fa7

[^2]: https://arxiv.org/abs/2504.19335

[^3]: https://ieeexplore.ieee.org/document/10988972/

[^4]: https://www.getautonoma.com/blog/regression-testing-vercel-preview-deployments

[^5]: https://www.semanticscholar.org/paper/57c019b36db2c8b7d323a6f9011ecb049bc23670

[^6]: https://journals.mmupress.com/index.php/jiwe/article/view/1062

[^7]: https://www.ssrn.com/abstract=5074807

[^8]: https://journal.ipm2kpe.or.id/index.php/INTECOM/article/view/10961

[^9]: https://sol.sbc.org.br/index.php/vem/article/view/30281

[^10]: https://ieeexplore.ieee.org/document/11025655/

[^11]: https://ieeexplore.ieee.org/document/11089679/

[^12]: https://dl.acm.org/doi/pdf/10.1145/3639478.3640023

[^13]: https://www.ijfmr.com/papers/2023/6/8905.pdf

[^14]: http://arxiv.org/pdf/2310.15642.pdf

[^15]: https://arxiv.org/pdf/2305.04772.pdf

[^16]: https://jurnal.iaii.or.id/index.php/RESTI/article/view/5527

[^17]: https://arxiv.org/pdf/2310.18718.pdf

[^18]: http://arxiv.org/pdf/2305.16120.pdf

[^19]: https://arxiv.org/pdf/1805.04473.pdf

[^20]: https://www.linkedin.com/pulse/ultimate-cicd-setup-nextjs-github-actions-vercel-ananthu-krishnan-lrpvc

[^21]: https://blog.logrocket.com/lighthouse-meets-github-actions-use-lighthouse-ci/

[^22]: https://stackoverflow.com/questions/78670214/how-to-create-preview-deployment-instance-for-each-pull-request-preview-mode

[^23]: https://mxd.codes/articles/docker-ci-cd-for-nextjs-with-github-actions

[^24]: https://docs.ionos.space/blog/github-actions-lighthouse/

[^25]: https://gorillalogic.com/implementing-continuous-integration-continuous-delivery-ci-cd-with-next-js-and-google-cloud-platform/

[^26]: https://brianperry.dev/til/2021/configuring-lighthouse-ci-with-github-actions/

[^27]: https://www.reddit.com/r/nextjs/comments/1e9t20u/how_do_you_manage_and_test_new_features_on_a_live/

[^28]: https://dev.to/kaizerpwn/cicd-pipeline-for-a-nextjs-application-using-github-actions-argocd-and-microk8s-7a4

[^29]: https://shopify.dev/docs/storefronts/themes/tools/lighthouse-ci

[^30]: https://nextjs.org/docs/app/guides/testing

[^31]: https://github.com/nextjs/deploy-vercel/actions

[^32]: https://github.com/marketplace/actions/lighthouse-ci-action

[^33]: https://nextjs.org/docs/pages/guides/preview-mode

