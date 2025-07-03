**Objective:**

Refactor the website's grid system by unifying the current, redundant `.content-grid` and `.card-grid` components into a single, reusable `.grid` component. This will simplify the HTML, make the CSS more maintainable (DRY), and standardize the responsive grid behavior across the site.

**Current State:**

The codebase has two separate BEM components for creating grid layouts: `.content-grid` (used for the "Pragmatic Core Elements" section) and `.card-grid` (used for the "Who We Work With" section). This creates unnecessary code duplication in `main.css` and semantic inconsistency in `index.html`.

**Desired State:**

A single, robust `.grid` component will be used for all grid layouts. This component will have modifiers for column counts (e.g., `.grid--2-col`). All base and responsive styling will be consolidated into this single component.

**Detailed Plan of Action:**

You are to perform the following steps in sequence:

**Part 1: CSS Refactor (File: `public/assets/styles/main.css`)**

1.  **Remove Old Grid Components:** Delete all CSS rules associated with `.content-grid`, `.content-grid__item`, `.content-grid__title`, `.content-grid__content`, and `.card-grid`. This includes their base styles and any responsive styles inside media queries.

2.  **Create New Unified Grid System:** Add the following new CSS. This should be placed logically within the stylesheet, for example, under a new "Grid System" heading in the "REUSABLE COMPONENTS" section.

    ```css
    /* ============================================= */
    /* COMPONENT: GRID SYSTEM               */
    /* ============================================= */

    .grid {
        display: grid;
        gap: 32px; /* Default gap */
        margin: 40px auto;
    }
    
    .grid--2-col { grid-template-columns: repeat(2, 1fr); }
    .grid--3-col { grid-template-columns: repeat(3, 1fr); }
    .grid--4-col { grid-template-columns: repeat(4, 1fr); }

    .grid__item {
        /* This can be a placeholder for future item-specific styles, if any. */
        /* For now, it mainly serves as a semantic BEM element. */
    }

    .grid__icon {
        width: 120px;
        height: 120px;
        margin: 0 auto 24px;
    }

    .grid__icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
    .grid__title {
        font-size: 24px;
        font-weight: 700;
        color: var(--primary-navy);
        text-align: center;
        margin-bottom: 16px;
    }
    
    .grid__content {
        font-size: 16px;
        line-height: 1.6;
        color: var(--text-secondary);
        text-align: center;
    }
    ```

3.  **Add Consolidated Responsive Styles:** Add the following responsive logic inside the appropriate media queries.

    *   **Inside `@media (max-width: 768px)`:**
        ```css
        /* --- Responsive Grids (Tablet) --- */
        .grid { gap: 24px; }
        .grid--4-col { grid-template-columns: repeat(2, 1fr); }
        .grid--3-col { grid-template-columns: repeat(2, 1fr); }
        .grid--2-col { grid-template-columns: 1fr; }

        /* Centering logic for the last item in a 3-column grid */
        .grid--3-col > *:nth-child(odd):last-child {
            grid-column: span 2;
            justify-self: center;
            max-width: 50%;
        }
        ```

    *   **Inside `@media (max-width: 480px)`:**
        ```css
        /* --- Responsive Grids (Mobile) --- */
        .grid--3-col,
        .grid--4-col {
            grid-template-columns: 1fr;
        }
        ```

**Part 2: HTML Update (File: `public/index.html`)**

1.  **Refactor "Pragmatic Core Elements" Section:**
    *   Find the `<div class="content-grid content-grid--3-col">`.
    *   Replace its classes with `grid grid--3-col`.
    *   For each of its three child `divs`, replace the class `content-grid__item` with `grid__item`.
    *   Inside each `grid__item`, replace `.content-grid__icon` with `.grid__icon`, `.content-grid__title` with `.grid__title`, and `.content-grid__content` with `.grid__content`.

2.  **Refactor "Who We Work With" Section:**
    *   Find the `<div class="card-grid card-grid--2-col">`.
    *   Replace its classes with `grid grid--2-col`.
    *   The children of this div are `.card` elements, which are correct and do not need to be changed.

After completing these steps, the refactor will be complete. 