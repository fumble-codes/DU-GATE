# UI Design System & Component Specification

This document defines the layout, typography, spacing, and structural rules for the web platform dashboard. The design relies on a minimalist, high-density "Bento-grid" framework engineered to present complex data sets clearly and reduce cognitive load.

---

## 1. Color Tokens & Theme Configuration (Flexible)

The system uses design tokens for colors. To completely change the visual theme or brand identity, rewrite the hex codes in this section. The layout components reference these variables dynamically.

### Active Theme: Minimal Vibrant (Default)

| Token Name | Default Value | Role / Application |
| :--- | :--- | :--- |
| `--color-canvas-bg` | `#F3F4F9` | Main application backdrop body |
| `--color-surface-card`| `#FFFFFF` | Individual data modules, grids, list items |
| `--color-text-primary`| `#111317` | High-contrast headings, main labels, heavy buttons |
| `--color-text-muted`  | `#5F697A` | Secondary descriptions, timestamps, subtitles |
| `--color-brand-accent`| `#A19FF6` | Selected navigation states, primary focus metrics |
| `--color-status-success`| `#34C759` | High-performance indicators, completion states |
| `--color-status-alert`  | `#FF5E5E` | Deadlines, high-priority warnings, drops in metrics |

> 💡 **Theming Rule:** When swapping color palettes, maintain the exact contrast ratios. `--color-canvas-bg` must always stay highly distinct from `--color-surface-card` to preserve the grid structure.

---

## 2. Typography & Hierarchy

The interface relies strictly on variable font-weight and sizing scales to establish depth. 
* **Target Font Families:** `Inter` , `Plus Jakarta Sans`.

### Scale Matrix

[42px]  ■■■■■■■■■■■■■■■■ Bold (Hero Data Metrics / Analytics)
[20px]  ■■■■■■■■■■■ Semi-Bold (Section & Global Module Headers)
[14px]  ■■■■■■■■ Semi-Bold (List Component Titles / Input Labels)
[12px]  ■■■■■ Medium (Body Text / Secondary Metadata Elements)

* **Hero Stat Displays:** `36px` - `42px` | **Bold** | Tracking numbers, large metrics.
* **Module Headers:** `18px` - `20px` | **Semi-Bold** | Standard card and list section headers.
* **Card Core Titles:** `14px` | **Semi-Bold** | Individual item titles inside grid structures.
* **Metadata / Copy:** `12px` | **Medium** | Text color assigned strictly to `--color-text-muted`.

---

## 3. Layout Grid & Spacing Tokens

The interface enforces rigid padding rules to handle high data density without feeling crowded.

### Spacing Scale
* **Global Sidebar Width:** `240px` (Fixed layout)
* **Main Container Padding:** `32px` on all outer viewport bounds.
* **Component Grid Gutter Gap:** `20px` to `24px` uniform spacing between cards.

### Internal Card Padding Rules
* **Analytics Overview Cards (KPIs):** `20px` uniform padding (`top`/`bottom`/`left`/`right`).
* **Data List / Interaction Cards:** `20px` `top`/`bottom` paired with `24px` `left`/`right`.

---

## 4. Corner Radii (Radium System)

No sharp corners are permitted. Curves scale based on component size hierarchy.

+-------------------------------------------------------+
|  Outer Window Frame (24px)                             |
|   +-----------------------------------------------+   |
|   |  Content / Dashboard Cards (16px)             |   |
|   |   +---------------------------------------+   |   |
|   |   | Inline Filters / Pill Inputs (12px)   |   |   |
|   |   +---------------------------------------+   |   |
|   +-----------------------------------------------+   |
+-------------------------------------------------------+

* **Global Application Frame:** `24px`
* **Data Containers & Action Modules:** `16px`
* **Filter Tabs & Control Inputs:** `12px`
* **Primary CTA / Submission Controls:** Full Pill Layout (`999px`)

---

## 5. Iconography Specification

* **Stroke Weight:** `1.5px` to `2px` linear vector style.
* **Treatment:** Minimal outlines only. Solid color fills are strictly restricted to state-level alert notifications.
* **Sizing Boundary Boxes:**
    * `20px × 20px`: Structural layout navigation elements.
    * `16px × 16px`: Micro contextual card indicators.

---

## 6. Structural Component Blueprint

Maintain this hierarchical element blueprint across views:

```markdown
└── App Layout Container
    ├── Sidebar Panel (Width: 240px | Surface: --color-surface-card)
    │   └── Active Item State (Background: Tinted variant of --color-brand-accent)
    └── Content Viewport (Background: --color-canvas-bg | Padding: 32px)
        ├── Top-Bar Metric Row (Grid Layout | Gap: 20px)
        │   └── Summary Card Components (Surface: --color-surface-card | Radius: 16px)
        ├── Sub-Action Control Row (Flexbox Navigation Layout)
        │   ├── Filter Segment Tabs (Radius: 12px)
        │   └── Action Input Trigger (Background: --color-text-primary | Radius: 999px)
        └── Core Display Grid (Multi-Column Bento Format | Gap: 24px)
            └── Focus Interface Card (Surface: --color-surface-card | Radius: 16px)
                ├── Header (Title Text | State Dot Indicator using --color-status-success)
                ├── Metric Engine Area (Visual tracking bars using --color-brand-accent)
                └── Action Footer (Metadata Layout | Engagement Vector Icon ↗)