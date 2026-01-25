<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

## Overview

For a modern React/Next.js app in 2026 that needs to display pitch deck slides with full‑screen lightbox, keyboard + touch navigation, zoom, and lazy loading, the most compelling options are:

- **Yet Another React Lightbox (YARL)** – modern, React‑first, very performant, plugin‑based, excellent keyboard/touch/zoom support, and easy Next.js integration.[^1][^2][^3]
- **PhotoSwipe (via `react-photoswipe-gallery`)** – battle‑tested core, superb mobile/touch and zoom performance, great keyboard support, and small React wrapper.[^4][^5][^6][^7][^8][^9]
- **lightGallery (React)** – extremely feature‑rich, strong accessibility story, but heavier and more complex.[^10][^11][^12][^13]
- **React Image Gallery** – robust carousel/inline gallery with full‑screen and lazy loading, but **no first‑class zoom**; better as a slider than a lightbox.[^14][^15][^16][^17][^18][^13]

For pitch deck slides (dozens of static images, need crisp zoom and A11y), a **YARL or PhotoSwipe‑based lightbox** is generally preferable over React Image Gallery or lightGallery, unless you specifically want lightGallery’s plugin ecosystem.

***

## High‑Level Comparison

### Shortlist and metrics

Approximate GitHub stars are for the main JS repo; wrapper stars are given where relevant. Star counts are from GitHub topic/overview pages as of 2025.[^12][^19][^20][^8][^21][^2][^3][^13]


| Library (React usage) | Core GitHub repo / stars | React wrapper / stars | Typical JS size signal* | NPM packages | Notes |
| :-- | :-- | :-- | :-- | :-- | :-- |
| **PhotoSwipe v5** (via `react-photoswipe-gallery`) | `dimsemenov/PhotoSwipe` (~25k★)[^19][^20] | `dromru/react-photoswipe-gallery` (~570★)[^22][^8] | Unpkg `dist/` ~988 kB uncompressed for all builds[^23]; wrapper itself ~9.3 kB min / 3.4 kB gzip[^9] | `photoswipe`, `react-photoswipe-gallery` | Extremely optimized lightbox; great gestures \& zoom; highly configurable. |
| **lightGallery v2** (React) | `sachinchoolur/lightGallery` (~6.9k★)[^12][^13] | React component is part of same package | Unpkg stats not as clear; overall dist is significantly larger than PhotoSwipe/YARL; plugin‑driven[^11][^12] | `lightgallery` (with `lightgallery/react` entry)[^10] | Very feature‑rich (video, thumbnails, etc.), good A11y, heavier footprint. |
| **React Image Gallery** | `xiaolin/react-image-gallery` (~3.9k★)[^13] | Same repo; React‑only | Build output in `build/` (ESM + UMD); size is moderate; services like Bundlephobia are intermittently unavailable; no precise gz number[^24] | `react-image-gallery`[^14] | Great carousel with full‑screen \& lazyLoad; no built‑in zoom. |
| **Yet Another React Lightbox (YARL)** | `igordanchenko/yet-another-react-lightbox` (~1.2k★)[^2][^3] | Same repo; React‑only | Unpkg package shows ~214 kB of JS/CSS assets total (uncompressed), with plugin‑based optionality[^25]; highly optimized and tree‑shakable[^1][^2] | `yet-another-react-lightbox`[^1][^2] | React‑first, plugin‑based; excellent UX, zoom, fullscreen, preloading. |
| **react-spring-lightbox** | `tim-soft/react-spring-lightbox` (~250★)[^26][^21] | Same repo | Not as heavily optimized as YARL/PhotoSwipe, but relatively small; depends on `react-spring`[^27][^28][^29] | `react-spring-lightbox`[^27][^21] | Slick animations via `react-spring`; good gestures; fewer built‑ins than YARL. |

\* *“Typical JS size signal” is derived from public CDN directory listings (uncompressed) and, where available, Bundlephobia for specific versions. Exact min+gzip sizes for some cores (PhotoSwipe, lightGallery, React Image Gallery, YARL) are not consistently available from automated tooling; treat these as relative indicators, not precise byte counts.*[^9][^23][^25]

***

## Feature‑by‑Feature Matrix vs Your Requirements

**Legend:** ✔ = native support; (✔) = simple to add / partial; ✖ = not built‑in


| Library | Full‑screen lightbox | Keyboard nav | Touch / swipe | Zoom | Lazy loading (slides) | Accessibility highlights |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **PhotoSwipe v5 + `react-photoswipe-gallery`** | ✔ overlay lightbox with fullscreen UI[^5] | ✔ arrows + Esc with options `arrowKeys`, `escKey`[^6][^7] | ✔ swipe, drag, pinch‑to‑zoom[^7] | ✔ smooth zoom \& pan[^7] | (✔) preloading configuration (`preload`, etc.); host page controls initial image loading[^6][^30] | Good keyboard model; guidance to keep captions available in DOM for screen readers[^31] |
| **lightGallery React** | ✔ fullscreen plugin / maximize icon[^10][^11] | ✔ keyboard navigation by default[^10][^11] | ✔ drag, swipe, pinch gestures built‑in[^10][^11] | ✔ via zoom plugin[^10][^11] | (✔) smart preloading and dynamic mode; plus you can lazily mount gallery[^10] | Uses `role="dialog"`, `aria-modal`, focus trapping and Esc handling[^11]; advertises “Accessibility support” on npm[^10] |
| **React Image Gallery** | ✔ fullscreen via `showFullscreenButton` + `fullScreen()/exitFullScreen()` methods[^32][^17][^18] | ✔ arrow keys \& Enter/Space for navigation; installs keydown listeners and ARIA on bullets/thumbnails[^16][^17] | ✔ swipe and drag gestures, including vertical/horizontal swiping logic[^16] | ✖ no built‑in zoom; you can fake via custom `renderItem` but not native pinch zoom[^14][^16] | ✔ `lazyLoad` prop delays image loading[^15] | Uses buttons with `aria-label`, `aria-pressed` for bullets/thumbnails; slides are focusable `role="button"`; `aria-live="polite"` on container[^16][^17] |
| **YARL** | ✔ fullscreen plugin adds full‑screen mode[^1] | ✔ keyboard navigation across slides; custom shortcuts extensible via plugin/hooks[^33][^1] | ✔ supports keyboard, mouse, touchpad, and touchscreen navigation[^1] | ✔ zoom plugin with controlled zoom levels; high‑quality zooming[^1][^34] | (✔) preloads a bounded number of images and never shows partially downloaded images, which functions like lazy loading for large sets[^1] | Designed with good semantics; works with alt text, captions plugin, and regular React focus handling[^1][^35] |
| **react-spring-lightbox** | ✔ full‑screen overlay, configurable UI[^27][^28] | ✔ documented keyboard controls for prev/next/close[^27][^28] | ✔ touch gestures with “native‑feeling” scroll/zoom via react‑spring[^27][^28][^26] | ✔ zoom in/out and panning supported[^27][^28] | (✔) you control which slides are passed and when; can combine with Next `<Image loading="lazy" />` | A11y depends more on how you wire buttons and alt text; less out‑of‑the‑box guidance than YARL/lightGallery |


***

## Library‑by‑Library Analysis

### 1. PhotoSwipe v5 (with `react-photoswipe-gallery`)

**When to use:**
You want maximum control, proven performance on mobile, and best‑in‑class zooming/gesture behavior, while keeping bundle size under tight control.

**Core \& React wrapper**

- **Core:** `photoswipe` (v5+).[^20][^36]

```
- **React wrapper:** `react-photoswipe-gallery` is a thin, typed React wrapper that exposes a `<Gallery>` and `<Item>` API and hooks like `useGallery`.[^4]
```

- Wrapper’s bundle is very small (≈9.3 kB minified / 3.4 kB gzipped as of 4.0.0) – you still pay for the PhotoSwipe core, but it remains competitive.[^9]

**Performance**

- Designed for **mobile‑first performance**: smooth swipe, pinch‑zoom, and animations on touch devices.[^7][^37][^38]
- Dist bundle on unpkg (`dist/` directory) is ~988 kB uncompressed for all builds, which includes ESM, UMD, CSS, and Lightbox helpers. This is not min+gzip, but is a reasonable upper‑bound signal; with modern bundlers and tree‑shaking you only ship the ESM core and CSS you actually use, usually far below that in practice.[^23]
- Supports **incremental loading \& preloading windows** through options (`preload` etc.), so you’re not forced to load the entire gallery up front.[^6][^30]

**Accessibility**

- Built‑in support for **keyboard arrow keys and Esc** (`arrowKeys`, `escKey`).[^6][^7]
- Long‑standing discussion and improvements around accessibility; some edge cases with screen readers on iOS were investigated and addressed over time.[^39]
- Docs explicitly recommend that captions remain available in the DOM for screen‑reader users and when JS/lightbox is disabled, not only inside the overlay.[^31]

**How it fits your requirements**

- **Full‑screen lightbox:** yes, configured via default UI and CSS.
- **Keyboard navigation:** yes, and configurable; arrows + Esc by default.[^6]
- **Touch/swipe gestures:** yes, extremely smooth swipe/pinch/pan.[^37][^7]
- **Zoom:** yes, a core feature with comfortable min/max zoom and pan inertia.[^7]
- **Lazy loading:** you typically render *thumbnails* with Next `<Image loading="lazy" />` and let PhotoSwipe request original image URLs only when the lightbox opens and as the user navigates. Options like `preload` define how far ahead/behind to prefetch.[^30][^37][^6]

**React/Next.js integration**

- `react-photoswipe-gallery` is ESM‑first, works well with React 18+ and Next 13/14/15.[^4]
- For Next.js, a common pattern is:
    - Use `next/image` for your slide thumbnails (with `loading="lazy"`, `placeholder="blur"`, etc.).
    - Provide `original`, `width`, `height`, `alt` to `<Item>`; PhotoSwipe uses those metadata to avoid layout shifts.[^4]
    - Optionally lazy‑load the lightbox JS with dynamic import (`pswpModule: () => import('photoswipe')`) to defer cost until the user first opens a slide.[^5]

***

### 2. lightGallery (React)

**When to use:**
You need a **batteries‑included gallery** – thumbnails, video, autoplay, full‑screen, zoom, social share, etc. – and you can accept a heavier dependency for that convenience.

**Core \& React wrapper**

- **Core library:** `lightgallery` (TypeScript, modular, no external dependencies apart from its CSS).[^11][^12]
- GitHub topic listing shows ~6.9k stars for `sachinchoolur/lightGallery` and ~5.3k for the older `lightgallery.js` repo.[^13][^12]
- React component is provided under the same package, typically imported as `import LightGallery from 'lightgallery/react';`.[^10]

**Performance**

- Modular plugin design, but in practice many projects enable several plugins (thumbnail, zoom, fullscreen, pager), making the effective bundle **heavier than PhotoSwipe or YARL**.[^12][^10]
- Used in performance‑sensitive contexts; blogs and optimization posts often recommend **lazy‑loading the library only when a gallery is actually opened** to avoid impacting initial LCP.[^40]

**Accessibility**

- The v2 TypeScript implementation shows careful use of A11y primitives:
    - Overlay container created as `role="dialog"` with `aria-modal="true"` and `tabindex="-1"` to trap focus.[^11]
    - Global keyboard listeners for Esc, arrow navigation, and window resize; explicit focus trapping logic.[^11]
- NPM description highlights **“Accessibility support”** as a feature.[^10]

**How it fits your requirements**

- **Full‑screen:** yes, via fullscreen/maximize button plugin.[^10][^11]
- **Keyboard navigation:** yes; arrows, Esc, etc.
- **Touch/swipe:** yes; supports drag, swipe, pinch gestures on touch devices.[^11][^10]
- **Zoom:** yes; zoom plugin (mouse wheel, pinch, and UI controls).
- **Lazy loading:**
    - LightGallery itself handles smart preloading of nearby slides.[^10]
    - For true page‑level lazy loading, you should dynamically import LightGallery and/or render it only after user interaction (e.g., clicking a slide thumbnail).

**React/Next.js notes**

- If you import `lightgallery/react` directly in a Next.js page that server‑renders, some configurations can touch `document` during initialization. It is safest to:
    - Either wrap in `"use client"` and use a dynamic import with `ssr: false` for the gallery component, or
    - Mount LightGallery only on the client (e.g., via dynamic import or inside a client‑only component).
- Great choice if you also want to support **video slides in the same viewer** as your pitch deck images.

***

### 3. React Image Gallery

**When to use:**
You need a **carousel/slider with thumbnails and optional fullscreen**, but you do not strictly require zoom.

**Core**

- React‑only component, published as `react-image-gallery`.[^14]
- GitHub topic listing shows ~3.9k stars.[^13]

**Features \& performance**

- Implements a responsive carousel **with thumbnails**, bullets, and optional fullscreen controls.[^16][^17][^18][^14]
- Provides functions via refs: `fullScreen()`, `exitFullScreen()`, `slideToIndex()`, `getCurrentIndex()` etc.[^32][^17]
- Implements **touch gestures** (swipe horizontal/vertical) using internal swiping logic; no extra swipe library is needed in latest versions.[^16]
- Supports **lazy loading** via `lazyLoad` prop – slides are only loaded when near the viewport.[^15]

**Accessibility**

- Adds ARIA attributes and roles:
    - Bullets and thumbnails are `<button>` elements with `aria-label="Go to Slide X"` and `aria-pressed` for current slide.[^16]
    - Slides are focusable elements with `role="button"`; key handlers respond to Enter/Space.[^16]
    - Gallery root uses `aria-live="polite"` to announce slide changes.[^17]
- Keyboard listeners are bound to window or gallery container to catch arrow key events and move between slides.[^16]

**Fit against requirements**

- **Full‑screen:** ✔ via built‑in fullscreen button \& methods.[^18][^32][^17]
- **Keyboard navigation:** ✔ arrow keys + some focusable controls.
- **Touch/swipe:** ✔ horizontal swipe for next/prev.[^16]
- **Zoom:** ✖ not natively; you can provide a custom `renderItem` that includes a zoomable element, but pinch‑zoom and smooth pan are not built‑in.[^14][^16]
- **Lazy loading:** ✔ `lazyLoad` prop covers slide images (thumbnails may still all load, depending on implementation).[^41][^15]

Given your explicit requirement for **zoom**, React Image Gallery is better used as an **inline slider** for a smaller deck or landing page, with a separate dedicated lightbox (e.g., YARL or PhotoSwipe) for detailed viewing.

***

### 4. Yet Another React Lightbox (YARL)

**When to use:**
You want a **React‑native, Next‑friendly, highly performant lightbox** with first‑class zoom \& fullscreen, strong keyboard/touch support, and good plugin‑based extensibility.

**Core**

- Single package: `yet-another-react-lightbox`.[^2][^1]
- BestOfJS and GitHub show it as an actively maintained “Modern React lightbox component” with ~1.2k stars and ongoing releases.[^3][^42][^2]

**Performance \& bundle profile**

- Designed for **React 16.8+ up to React 19**.[^24][^1]
- Emphasizes:
    - Only preloading a **limited window of images** to avoid memory bloat and network spikes.[^1]
    - Never showing partially downloaded images (improving perceived quality).[^1]
    - Optional features via **plugins** – Fullscreen, Zoom, Thumbnails, Slideshow, Video, etc., so you only pay for what you use.[^1]
- Unpkg lists around ~214 kB of JS/CSS assets across the package uncompressed, but in practice:
    - You import the ESM entry and only the plugins you need.
    - Modern bundlers can tree‑shake unused modules.[^25][^1]

**Accessibility**

- Documentation promotes **keyboard, mouse, touchpad, and touchscreen navigation** out of the box.[^1]
- Plugin system provides captions, counters, thumbnails that use reasonably semantic markup; users commonly integrate alt text and captions from their image data.[^34][^35][^1]
- Works well with Next’s `<Image>` via custom render functions, so you can keep all your alt text and semantics consistent.[^1]

**Fit against requirements**

- **Full‑screen:** ✔ via Fullscreen plugin (toggle button + keyboard shortcuts).[^1]
- **Keyboard navigation:** ✔ next/previous/close; can be extended with custom keyboard shortcuts through plugins/hooks.[^33][^1]
- **Touch/swipe:** ✔ supports touch gestures with good UX across devices.[^1]
- **Zoom:** ✔ via Zoom plugin with customizable `maxZoomPixelRatio`, double‑click zoom, wheel/pinch zoom, etc.[^34][^1]
- **Lazy loading:**
    - At the lightbox level, YARL preloads a fixed number of neighboring slides and avoids half‑loaded images.[^1]
    - At the page level, you typically render deck thumbnails with `<Image loading="lazy" />` and only open the lightbox for the full‑resolution image when needed.

**React/Next.js integration**

- Pure React; no jQuery or DOM manipulation outside React.[^1]
- Examples show integration with 3rd‑party image components like **Next.js Image** and Gatsby Image through custom `render.slide` functions.[^1]
- Safe to use in **Next.js App Router**; you can:
    - Wrap the component in `"use client"` at the top of the file.
    - Keep it SSR‑compatible since it doesn’t require `window` at import time.
- Very well‑suited to **pitch decks**: zoom in on text, keyboard through slides, and handle both desktop and mobile presentations gracefully.

***

### 5. react-spring-lightbox (briefly)

**When to use:**
You prioritize **animation quality and physics‑based transitions**, and are already using `react-spring`.

- Package: `react-spring-lightbox`.[^27][^21]
- Promoted as a “flexible image gallery lightbox with native‑feeling touch gestures and buttery smooth animations, built with react‑spring.”[^28][^26][^21][^27]
- Supports full‑screen overlay, gestures, zoom, and keyboard navigation, but leaves more UI concerns to you.
- Because it depends on `react-spring`, if you’re not already using that elsewhere, the incremental bundle cost is higher compared with YARL or PhotoSwipe.

For pure **pitch deck viewing**, YARL or PhotoSwipe usually deliver a better feature/weight balance.

***

## Recommendations for Pitch Deck Slides in React/Next.js

### Primary recommendation: YARL for a React‑native experience

Use **Yet Another React Lightbox** as your main lightbox, paired with a simple grid or `react-photo-album` for the slide thumbnails.

**Why:**

- First‑class React \& Next.js support (SSR‑friendly, no DOM hacks).[^1]
- Plugin‑based **Fullscreen** + **Zoom** + **Thumbnails** meet all your feature requirements with minimal configuration.[^35][^1]
- Carefully designed **preloading window** means it handles decks of 30–100 slides without excessive memory/CPU usage.[^1]
- Easy to wire **keyboard shortcuts** (←/→, Esc, custom combos), plus good touch/pointer UX.[^33][^1]

**Implementation sketch:**

- Use Next `<Image>` for thumbnails:

```tsx
// Thumbnails (page)
<Image
  src={slide.thumbSrc}
  alt={slide.alt}
  width={320}
  height={180}
  loading="lazy"
  onClick={() => setIndex(i)}
/>
```

- Pass a `slides` array to YARL with high‑res images:

```tsx
<Lightbox
  open={index >= 0}
  close={() => setIndex(-1)}
  index={index}
  slides={slides.map(s => ({
    src: s.fullSrc,
    alt: s.alt,
    width: s.width,
    height: s.height,
    description: s.caption,
  }))}
  plugins={[Fullscreen, Zoom, Thumbnails]}
/>
```

This setup gives you:

- Lazy thumbnails on the page,
- Crisp full‑res slides in the lightbox,
- Zoom to read small text on slides,
- Keyboard + touch navigation out of the box.

***

### Alternative: PhotoSwipe + `react-photoswipe-gallery` for maximum control

If you want more control over **animations, preloading policy, and custom UI**, or if you already know PhotoSwipe, choose:

- `photoswipe` + `react-photoswipe-gallery`.[^5][^7][^6][^4]

**Pros:**

- Very mature, huge install base, excellent on mobile.[^20][^37][^7]
- Small React wrapper; you can lazy‑load the core module (`pswpModule: () => import('photoswipe')`) only when needed.[^5][^9]
- More flexible for complex layouts, mixed galleries, or advanced caption logic.

**Cons:**

- Slightly more verbose setup in React than YARL (more reliance on imperative calls and config objects).
- Styling and customizing UI controls requires editing PhotoSwipe UI CSS and options.

***

### When to still use lightGallery or React Image Gallery

- **lightGallery React** is ideal if:
    - You also need **video** or **YouTube/Vimeo** in the same lightbox, or
    - You want a rich gallery with tons of built‑in effects and don’t mind a heavier dependency.[^12][^11][^10]
- **React Image Gallery** is ideal if:
    - You just need an **inline slider/carousel with thumbnails and fullscreen**, where zoom is not critical, or
    - You’re embedding a small number of slides directly in content and prefer a single, battle‑tested React dependency with lazy loading and keyboard/touch support.[^15][^17][^14][^16]

In both cases, if you later decide you need serious zoom and more accessible full‑screen modal semantics, you can layer **YARL or PhotoSwipe** on top for the “detail view.”

***

## Practical Tips for Performance \& Accessibility in Next.js

Regardless of the library, for pitch deck slides:

1. **Use Next `<Image>` for thumbnails** with `loading="lazy"` and `placeholder="blur"` to keep your initial payload small, especially on mobile.
2. **Defer loading the lightbox JS** until the user first interacts:
    - For PhotoSwipe, use `pswpModule: () => import('photoswipe')` in the React wrapper options.[^5]
    - For lightGallery/YARL, use `next/dynamic` with `ssr: false` if you hit any SSR issues, or mount the component only after `useEffect` fires.
3. **Preserve semantics and captions outside the lightbox**, especially for PhotoSwipe and lightGallery:
    - Keep slide titles/descriptions in the page DOM so screen readers can access them even if JS fails.[^31][^11]
4. **Test keyboard flows thoroughly**:
    - Enter/Space to open from thumbnails.
    - Left/Right for navigation; Esc to close.
    - Ensure focus returns to the originating thumbnail after closing (YARL and lightGallery handle this more cleanly; verify PhotoSwipe integration code).

***

### Bottom line

For a **Next.js pitch deck viewer in 2026** that optimizes both performance and accessibility:

- **Default choice:** **Yet Another React Lightbox (`yet-another-react-lightbox`)** with Fullscreen + Zoom plugins.
- **Power‑user alternative:** **PhotoSwipe (`photoswipe`) with `react-photoswipe-gallery`**, if you want maximum control and are comfortable tuning its options.
- Keep **lightGallery** and **React Image Gallery** in your toolbox for more complex media galleries or simple carousels, but for your specific feature list (especially zoom + performance), YARL or PhotoSwipe will generally give a better outcome.
<span style="display:none">[^100][^101][^102][^103][^104][^105][^106][^107][^108][^109][^110][^111][^112][^113][^114][^115][^116][^117][^118][^119][^120][^121][^122][^123][^124][^43][^44][^45][^46][^47][^48][^49][^50][^51][^52][^53][^54][^55][^56][^57][^58][^59][^60][^61][^62][^63][^64][^65][^66][^67][^68][^69][^70][^71][^72][^73][^74][^75][^76][^77][^78][^79][^80][^81][^82][^83][^84][^85][^86][^87][^88][^89][^90][^91][^92][^93][^94][^95][^96][^97][^98][^99]</span>

<div align="center">⁂</div>

[^1]: https://yet-another-react-lightbox.com

[^2]: https://bestofjs.org/projects/yet-another-react-lightbox

[^3]: https://github.com/igordanchenko/yet-another-react-lightbox/discussions

[^4]: https://www.npmjs.com/package/react-photoswipe-gallery?activeTab=versions

[^5]: https://photoswipe.com/methods/

[^6]: http://g-mops.net/epica_g-danchi/epica_photoswipe/photoswipe_lib/documentation/options.html

[^7]: https://www.misin.msu.edu/0/js/PhotoSwipe-4.1.0/website/

[^8]: https://github.com/topics/photoswipe?l=typescript

[^9]: https://bundlephobia.com/result?p=react-photoswipe-gallery%404.0.0

[^10]: https://www.npmjs.com/package/lightgallery

[^11]: https://github.com/sachinchoolur/lightGallery/blob/master/src/lightgallery.ts

[^12]: https://awesomehub.js.org/list/react/components/photo-and-image

[^13]: https://github.com/topics/image-gallery?o=desc\&s=stars

[^14]: https://www.npmjs.com/package/react-image-gallery

[^15]: https://stackoverflow.com/questions/68710329/how-to-use-lazy-loading-in-react-image-gallery

[^16]: https://github.com/xiaolin/react-image-gallery/blob/master/src/components/ImageGallery.jsx

[^17]: https://app.unpkg.com/react-image-gallery@0.8.16/files/src/ImageGallery.jsx

[^18]: https://linxtion.com/demo/react-image-gallery/

[^19]: https://js.libhunt.com/photoswipe-alternatives

[^20]: https://bestofjs.org/projects?sort=total\&page=9

[^21]: https://github.com/topics/react-spring

[^22]: https://github.com/akhmadullin

[^23]: https://arxiv.org/pdf/2212.04388.pdf

[^24]: https://github.com/xiaolin/react-image-gallery/blob/master/package.json

[^25]: https://app.unpkg.com/yet-another-react-lightbox@3.21.7

[^26]: https://github.com/nikitavoloboev/github-stars/blob/master/5.md

[^27]: https://timellenberger.com/libraries/react-spring-lightbox

[^28]: https://github.com/tim-soft/react-spring-lightbox/blob/master/README.md

[^29]: https://github.com/tim-soft/react-spring-lightbox/blob/master/.browserslistrc

[^30]: https://github.com/dimsemenov/PhotoSwipe/issues/931

[^31]: https://photoswipe.com/caption/

[^32]: https://stackoverflow.com/questions/76217008/click-on-image-on-react-image-gallery-and-go-fullscreen

[^33]: https://github.com/igordanchenko/yet-another-react-lightbox/discussions/200

[^34]: https://stackoverflow.com/questions/76619693/display-yet-another-react-lightbox-slide-images-a-little-zoomed-by-default

[^35]: https://yet-another-react-lightbox.com/plugins/thumbnails

[^36]: https://www.unpkg.com/browse/photoswipe@5.3.7/package.json

[^37]: https://npm-compare.com/glightbox,lightbox2,lightgallery.js,magnific-popup,photoswipe,viewerjs

[^38]: https://npm-compare.com/glightbox,lightbox2,lightgallery,magnific-popup,photoswipe,viewerjs

[^39]: https://github.com/dimsemenov/PhotoSwipe/issues/1077

[^40]: https://brihoum.hashnode.dev/how-i-optimized-my-angular-website

[^41]: https://github.com/xiaolin/react-image-gallery/issues/88

[^42]: https://newreleases.io/project/github/igordanchenko/yet-another-react-lightbox/release/v3.21.8

[^43]: https://arxiv.org/abs/2210.02392

[^44]: http://arxiv.org/pdf/2107.03761.pdf

[^45]: https://arxiv.org/html/2409.03205v1

[^46]: https://arxiv.org/pdf/2412.13459.pdf

[^47]: https://zenodo.org/record/851546/files/article.pdf

[^48]: https://arxiv.org/html/2312.11729v1

[^49]: https://onlinelibrary.wiley.com/doi/10.1002/ece3.11603

[^50]: https://arxiv.org/pdf/2301.04563.pdf

[^51]: https://blog.csdn.net/my565548320/article/details/140093704

[^52]: https://pulkitxm.com/blogs/image-gallery-with-photoswipe

[^53]: https://npm-compare.com/ja-JP/react-image-lightbox,react-images,react-photo-gallery,yet-another-react-lightbox

[^54]: https://blog.logrocket.com/comparing-the-top-3-react-lightbox-libraries/

[^55]: https://github.com/igordanchenko/yet-another-react-lightbox

[^56]: https://codesandbox.io/examples/package/react-spring-lightbox

[^57]: https://madewithreactjs.com/react-photoswipe-gallery

[^58]: https://github.com/igordanchenko/yet-another-react-lightbox-lite

[^59]: https://github.com/tim-soft/react-spring-lightbox

[^60]: https://github.com/dromru/react-photoswipe-gallery

[^61]: https://github.com/ItzCrazyKns/Perplexica/blob/master/package.json

[^62]: https://github.com/tim-soft/react-spring-lightbox/issues

[^63]: https://codesandbox.io/examples/package/react-photoswipe-gallery

[^64]: https://arxiv.org/html/2411.17696

[^65]: http://arxiv.org/pdf/2405.07868.pdf

[^66]: https://arxiv.org/html/2403.10615v1

[^67]: https://arxiv.org/html/2502.08590v2

[^68]: https://arxiv.org/html/2502.21120

[^69]: https://arxiv.org/html/2412.11224v1

[^70]: https://arxiv.org/html/2504.00400v1

[^71]: https://arxiv.org/abs/2303.13852

[^72]: https://github.com/ischenkodv/lightgallery

[^73]: https://photoswipe.com

[^74]: https://react-photo-album.com

[^75]: https://www.lightgalleryjs.com

[^76]: https://photoswipe.com/react-image-gallery/

[^77]: https://www.lightgalleryjs.com/demos/react-image-gallery/

[^78]: https://www.lightgalleryjs.com/blog/top-6-javascript-lightbox-galleries./

[^79]: https://photoswipe.com/getting-started

[^80]: https://stackoverflow.com/questions/77046426/how-to-add-custom-icons-to-react-image-gallery

[^81]: https://www.lightgalleryjs.com/demos/iframe/

[^82]: https://discuss.pixls.us/t/new-website-gallery-storage-module-to-replace-photoswipe-written-in-lua/53354

[^83]: https://github.com/topics/react-image-gallery?o=asc\&s=stars

[^84]: https://sachinchoolur.github.io/lightgallery.js/

[^85]: https://github.com/dimsemenov/PhotoSwipe

[^86]: https://github.com/xiaolin/react-image-gallery

[^87]: https://arxiv.org/html/2504.03884v1

[^88]: http://arxiv.org/pdf/2309.03524.pdf

[^89]: https://arxiv.org/pdf/2202.08409.pdf

[^90]: https://arxiv.org/pdf/2308.08667.pdf

[^91]: https://arxiv.org/pdf/2308.12545.pdf

[^92]: https://arxiv.org/pdf/2203.13737.pdf

[^93]: https://www.npmjs.com/package/yet-another-react-lightbox

[^94]: https://bundlephobia.com/package/yet-another-react-lightbox

[^95]: https://bundlephobia.com/package/@canner/react-image-gallery

[^96]: https://app.unpkg.com/yet-another-react-lightbox@3.25.0/files/README.md

[^97]: https://bundlephobia.com/package/yet-another-react-lightbox-lite

[^98]: https://bundlephobia.com/package/react-image-gallery

[^99]: https://yet-another-react-lightbox.com/documentation

[^100]: https://bundlephobia.com/package/react-gallery-swiper

[^101]: https://www.npmjs.com/search?q=lightbox+react

[^102]: https://velog.io/@ldhoon/1.커머스서비스만들기-상세페이지이미지구현

[^103]: https://archiveprogram.github.com/assets/img/archive-repos.txt

[^104]: https://yet-another-react-lightbox.com/examples

[^105]: https://dev.to/ziadalzarka/optimize-react-apps-pagespeed-insights-score-40o4

[^106]: https://www.npmjs.com/search?q=lightbox

[^107]: http://arxiv.org/pdf/2408.17044.pdf

[^108]: https://arxiv.org/pdf/2306.00245.pdf

[^109]: https://arxiv.org/html/2406.06527v1

[^110]: https://arxiv.org/pdf/2010.10180.pdf

[^111]: http://arxiv.org/pdf/2406.07520.pdf

[^112]: https://arxiv.org/html/2401.05334v1

[^113]: https://arxiv.org/html/2312.11587v1

[^114]: http://arxiv.org/pdf/2107.07259.pdf

[^115]: https://codesandbox.io/examples/package/yet-another-react-lightbox

[^116]: https://neptunian.github.io/react-photo-gallery/

[^117]: https://newreleases.io/project/github/igordanchenko/yet-another-react-lightbox/release/v3.21.7

[^118]: https://improve-prism-code-blocks--ajeetchaulagain.netlify.app/blog/react-image-gallery/

[^119]: https://app.unpkg.com/react-spring-lightbox@1.6.0/files/package.json

[^120]: https://newreleases.io/project/github/igordanchenko/yet-another-react-lightbox/release/v3.27.0

[^121]: https://github.com/igordanchenko/yet-another-react-lightbox/blob/main/LICENSE

[^122]: https://unpkg.com/yet-another-react-lightbox@3.23.2/

[^123]: https://github.com/tim-soft/react-spring-lightbox/pulls

[^124]: https://www.tandfonline.com/doi/pdf/10.1080/15502724.2023.2296863?needAccess=true

