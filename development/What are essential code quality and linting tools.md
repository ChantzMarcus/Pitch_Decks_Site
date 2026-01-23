<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# What are essential code quality and linting tools for Next.js TypeScript projects in 2026? Include:

- ESLint configurations
- Prettier setups
- Husky pre-commit hooks
- TypeScript strict mode configurations
Provide example configuration files.

Great! I have current information about Next.js 15 and modern tooling setup. Let me provide comprehensive guidance with example configuration files.

## Essential Code Quality \& Linting Tools for Next.js TypeScript (2026)

Code quality in modern Next.js projects relies on a comprehensive toolchain. Here's the current state-of-the-art setup for 2026:

***

### **1. ESLint Configuration**

Next.js 15+ uses the **flat config format** (`eslint.config.mjs`). The official Next.js package (`eslint-config-next`) provides Next.js-specific and React rules.[^1]

**Key configurations:**

- **Base config**: Next.js, React, and React Hooks rules
- **Core Web Vitals**: Upgrades rules impacting performance to errors
- **TypeScript support**: Adds `typescript-eslint` rules[^2][^1]

**Example `eslint.config.mjs`:**

```javascript
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  // Ignore files and directories
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'next-env.d.ts',
    'node_modules/**',
    '.env*',
  ]),
  
  // Core Web Vitals configuration
  ...nextVitals,
  
  // TypeScript-specific rules
  ...nextTs,
  
  // Prettier integration (must be last)
  prettier,
  
  // Custom rule overrides
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-types': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },
]);
```

**Installation:**

```bash
pnpm add -D eslint eslint-config-next eslint-config-prettier \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser
```


***

### **2. TypeScript Strict Mode Configuration**

Enable strict type checking in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    
    // Strict type checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    
    // Path aliases for cleaner imports
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./src/components/*"],
      "@/app/*": ["./src/app/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"],
    },
    
    "incremental": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", ".next"],
}
```


***

### **3. Prettier Setup**

Create `.prettierrc.json` for consistent code formatting:

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "proseWrap": "preserve",
  "endOfLine": "lf"
}
```

Create `.prettierignore` to exclude files:

```
node_modules
.next
build
dist
.git
*.md
*.mdx
public
coverage
.env*
```

**Script in `package.json`:**

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "quality": "npm run typecheck && npm run format:check && npm run lint"
  }
}
```


***

### **4. Husky Pre-commit Hooks**

Set up Husky to run linting and formatting before commits:[^3][^4]

**Install Husky:**

```bash
pnpm add -D husky lint-staged
npx husky install
```

**Create `.husky/pre-commit`:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

**Create `.lintstagedrc.json`:**

```json
{
  "*.{ts,tsx}": [
    "eslint --fix --max-warnings 0",
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}
```

**Add to `package.json`:**

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```


***

### **5. Complete `package.json` Scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "quality": "npm run typecheck && npm run format:check && npm run lint",
    "prepare": "husky install"
  },
  "devDependencies": {
    "@next/eslint-plugin-next": "^15.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0",
    "eslint-config-prettier": "^9.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.5.0"
  }
}
```


***

### **Key Recommendations for 2026**

| Aspect | Best Practice |
| :-- | :-- |
| **Config Format** | Use ESLint flat config (`eslint.config.mjs`) [^1] |
| **TypeScript Parsing** | Use `typescript-eslint` for advanced rules [^2] |
| **Type Checking** | Enable `strict: true` in `tsconfig.json` |
| **Pre-commit Hooks** | Use Husky + lint-staged for consistency [^4] |
| **Formatting** | Prettier after ESLint in config (no conflicts) [^5] |
| **Git Hooks** | Automate linting before commits prevent issues [^3] |


***

### **Installation Order**

1. **Install tools:** `pnpm add -D eslint prettier typescript husky lint-staged @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-next eslint-config-prettier`
2. **Create configuration files** (eslint.config.mjs, tsconfig.json, .prettierrc.json)
3. **Initialize Husky:** `npx husky install`
4. **Add pre-commit hook:** Create `.husky/pre-commit` and `.lintstagedrc.json`
5. **Test:** Run `npm run quality` before first commit

This setup ensures type-safe code, consistent formatting, and automatic quality checks.[^4][^1][^2]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://nextjs.org/docs/app/api-reference/config/eslint

[^2]: https://www.freecodecamp.org/news/how-to-set-up-eslint-prettier-stylelint-and-lint-staged-in-nextjs/

[^3]: https://www.youtube.com/watch?v=Bmffw9Xt5D0

[^4]: https://www.mindbowser.com/standardize-nextjs-precommit-hooks-guide/

[^5]: https://stackoverflow.com/questions/78831913/how-to-configure-eslint-and-prettier-for-correct-error-reporting-in-typescript-a

[^6]: https://arxiv.org/pdf/2108.08027.pdf

[^7]: https://arxiv.org/pdf/2302.12163.pdf

[^8]: https://arxiv.org/pdf/2403.14940.pdf

[^9]: https://arxiv.org/pdf/2101.04622.pdf

[^10]: https://arxiv.org/pdf/2205.06349v1.pdf

[^11]: http://arxiv.org/pdf/2409.00921.pdf

[^12]: http://arxiv.org/pdf/2108.07075.pdf

[^13]: http://arxiv.org/pdf/2411.08833.pdf

[^14]: https://typescript-eslint.io/getting-started/

[^15]: https://www.reddit.com/r/programming/comments/1apl5o0/implement_git_hooks_using_husky_with_commitlint/

[^16]: https://www.youtube.com/watch?v=eieTlMwCwWU

[^17]: https://dev.to/vikasparmar/prettier-configuration-for-reactnextjs-projects-2025-4oh5

[^18]: https://stackoverflow.com/questions/63943401/husky-pre-commit-hook-failed-add-no-verify-to-bypass

[^19]: https://nextjs.org/docs/15/app/api-reference/config/eslint

[^20]: https://github.com/aridanpantoja/eslint-prettier-nextjs

[^21]: https://gist.github.com/XronTrix10/587a2b28953ea262799258139859af16

[^22]: https://www.reddit.com/r/nextjs/comments/1aearr2/good_enough_default_lint_prettier_config/

[^23]: https://dev.to/rio14/level-up-your-git-workflow-with-husky-in-nextjs-595a

