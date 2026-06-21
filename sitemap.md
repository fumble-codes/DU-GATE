```markdown
# CUETPioneer — Site Map & Content Inventory
''' DO NOT TREAT THIS AS MUST DO BECAUSE THIS IS JUST A DEMO SITEMAP A LOT OF LAYOUT ERRORS AND UX FLOW MIGHT BE BAD WHICH MUST BE IMPROVED"
## Navigation Structure

### Sidebar (Primary Navigation)
- Dashboard (home icon)
- Mocks (test icon)
- PYQs (folder icon)
- Chapter Practice (book icon)
- NCERT Notes (notebook icon)
- Flashcards (cards icon)
- Analysis (chart icon)
- Library (folder-open icon)
- Subjects (grid icon)
- Pricing (zap icon)
- Profile Menu

---

## Pages & Content Sections

### 1. LOGIN / SIGNUP OVERLAY
```
├── Login Form
│   ├── Username input field
│   ├── Password input field
│   ├── Login button
│   └── "Don't have an account?" link
│
└── Signup Form
    ├── Username input field
    ├── Password input field
    ├── Signup button
    └── "Already registered?" link
```

---

### 2. DASHBOARD (Home Page)
```
├── Welcome Hero Section
│   ├── Title: "Your prep, simplified."
│   ├── Subtitle: "Smart tests, notes, flashcards, and analysis"
│   ├── Primary CTA: "⚡ Start Mock Test"
│   └── Secondary CTA: "Chapter Practice"
│
├── Metrics Row
│   ├── Total Mocks Attempted
│   ├── Chapters Mastered
│   ├── Questions Solved
│   └── Current Streak
│
├── Recent Test Cards Grid
│   ├── Mock Name / Date
│   ├── Score (X/50)
│   ├── Percentage
│   └── Status badge (Completed)
│
├── Feature Highlights Section
│   ├── NTA CBT Interface card
│   ├── Real 2025 Papers card
│   ├── Chapter-wise Mocks card
│   ├── Flashcard Decks card
│   ├── College Predictor card
│   └── Smart Analysis card
│
└── Marketing Hero
    ├── Heading: "Take a mock today"
    ├── Description text
    ├── Primary CTA: "Take a Mock →"
    ├── Secondary CTA: "Start Practising →" / "View Plans"
    └── Stats cards (right side)
        ├── 21K+ Students
        ├── 2,100+ Questions
        ├── 4 Subjects
        └── Real PYQs
```

---

### 3. MOCKS (Mock Tests)
```
├── Page Header
│   ├── Kicker: "Test series · Accountancy"
│   ├── Title: "Mock Tests."
│   └── Subtitle: "50 questions · 60 minutes · 250 marks. NTA CBT interface. +5 correct, −1 wrong."
│
├── Mock List
│   └── Each Mock Row Contains:
│       ├── Mock number / order
│       ├── Mock name (e.g., "Mock 1")
│       ├── Questions count
│       ├── Time limit
│       ├── Marks value
│       ├── Your score (if attempted)
│       ├── Status indicator
│       └── "Start test" CTA button
│
└── Empty State (if no mocks attempted)
    ├── Icon
    ├── Title: "No mocks yet"
    └── Description: "Attempt your first mock to track progress"
```

---

### 4. PYQ BANK (Previous Year Questions)
```
├── Page Header
│   ├── Kicker: "Previous year questions"
│   ├── Title: "PYQ Bank."
│   └── Subtitle: "Official CUET papers 2022–2025. Know exactly what NTA repeats."
│
├── Filter Controls
│   ├── Year tabs (2025, 2024, 2023, 2022)
│   └── Subject tabs (Accountancy, Business Studies, Economics)
│
└── PYQ Papers List (by year)
    └── Each PYQ Row Contains:
        ├── Year tag (2025, 2024, etc.)
        ├── Subject name
        ├── Set number (Set 1, Set 2)
        ├── Question count
        ├── Time limit
        ├── Marks value
        ├── Status badge ("New", completed badge, etc.)
        └── "Attempt" CTA button

### 2025 Papers
- Accountancy — Set 1 (50Q, 60min, 250 marks)
- Business Studies — Set 1 (50Q)
- Economics — Set 1 (50Q)

### 2024 Papers
- Accountancy — Set 1
- Business Studies — Set 1
- Economics — Set 2

### 2023 Papers
- Accountancy
- Economics

### 2022 Papers
- Accountancy
- Business Studies
```

---

### 5. CHAPTER PRACTICE
```
├── Page Header
│   ├── Kicker: "Chapter-wise practice"
│   ├── Title: "Go deep, chapter by chapter."
│   └── Subtitle: "Targeted questions for every chapter. Progress tracked automatically."
│
├── Subject Filter Strip
│   ├── "All subjects" (active)
│   ├── "Accountancy"
│   ├── "Business Studies"
│   ├── "Economics"
│   └── "English"
│
└── Chapter Grid (2-column layout)
    └── Each Chapter Card Contains:
        ├── Chapter ID (ch1-partnership, ch3-retirement, etc.)
        ├── Chapter name
        ├── Question count
        ├── Difficulty indicator
        ├── Progress bar (% completed)
        ├── Percentage completed
        └── Clickable to launch chapter mock

### Accountancy Chapters
- ch1-partnership: Partnership Formation & Management
- ch2-admission: Admission of New Partner
- ch3-retirement: Retirement & Death of a Partner (50 Questions)
- ch4-dissolution: Dissolution of Partnership Firm (50 Questions)
- ch5-sharecapital: Share Capital
- ch6-debentures: Debentures
- ch7-finstatements: Financial Statements
- ch8-analysis: Financial Analysis
- ch9-ratios: Ratio Analysis
- ch10-cashflow: Cash Flow Statement

### Business Studies Chapters
- bst1: Topic 1
- bst2: Topic 2
- bst3: Topic 3

### Economics Chapters
- (Multiple chapters)

### English Chapters
- (Multiple chapters)
```

---

### 6. NCERT NOTES
```
├── Page Header
│   ├── Kicker: "Study material"
│   ├── Title: "NCERT Notes."
│   └── Subtitle: "Concise, exam-mapped notes for every chapter. Built for fast revision."
│
├── Subject Filter Strip
│   ├── "All" (active)
│   ├── "Accountancy"
│   ├── "Business Studies"
│   ├── "Economics"
│   └── "English"
│
└── Notes Grid
    └── Each Note Card Contains:
        ├── Kicker / Category label
        ├── Note title
        ├── Chapter name
        ├── Meta info (word count, read time)
        └── Clickable to open note detail overlay
```

---

### 7. FLASHCARDS
```
├── Page Header
│   ├── Kicker: "Flashcards"
│   ├── Title: "Study. Recall. Repeat."
│   └── Subtitle: "English vocab PYQs 2022–2025 · Accountancy (11 chapters) · Business Studies (3 chapters). More coming soon."
│
├── Mode Tabs (Switch between decks)
│   ├── English Vocab (active)
│   ├── Accountancy
│   └── Business Studies
│
├── Year Tabs (Filter by exam year)
│   ├── 2025 (highlighted)
│   ├── 2024
│   ├── 2023
│   ├── 2022
│   └── All years
│
├── Deck List (for selected mode & year)
│   └── Each Deck Card Contains:
│       ├── Deck name
│       ├── Card count
│       ├── Words / definitions count
│       ├── Progress bar
│       └── "Study deck" CTA
│
└── Flashcard Study View (when deck opened)
    ├── Question side
    │   ├── Flash-outer container (dark background)
    │   ├── Question text (large, centered)
    │   └── "Click to reveal answer" hint
    │
    ├── Answer side (on click)
    │   ├── Answer text
    │   ├── Definition / explanation
    │   └── Example usage
    │
    ├── Navigation Controls
    │   ├── Rating buttons (Hard, OK, Easy)
    │   ├── Prev / Next buttons
    │   └── Difficulty indicators
    │
    ├── Deck Status (top-right)
    │   ├── Current card number
    │   ├── Total cards
    │   └── Progress percentage
    │
    └── Completion State
        ├── Heading: "Deck complete"
        ├── Card count reviewed
        ├── "Restart deck" button
        └── "← All decks" button
```

---

### 8. ANALYSIS (My Analysis)
```
├── Page Header
│   ├── Kicker: "Performance"
│   ├── Title: "Analyse your prep."
│   └── Subtitle: "Accuracy by chapter, trending, strong & weak topics at a glance."
│
├── Filter Controls
│   ├── "ALL" (active)
│   ├── "MOCKS"
│   └── "CHAPTERS"
│
├── Key Metrics
│   ├── Overall Accuracy %
│   ├── Total Questions Attempted
│   ├── Mocks Completed
│   └── Chapters Mastered
│
├── Heatmap (Activity calendar)
│   └── Grid of 7 columns (days) × multiple weeks
│       └── Each cell: intensity-coded activity (light to dark gold)
│
├── Subject-wise Tracking
│   └── Each Subject Row Shows:
│       ├── Subject name
│       ├── Accuracy bar (progress bar with fill)
│       ├── Percentage value
│       └── Difficulty level indicator
│
└── Chapter-wise Breakdown
    └── Each Chapter Row Shows:
        ├── Chapter name
        ├── Questions solved
        ├── Accuracy bar
        ├── Percentage
        └── Trend indicator
```

---

### 9. LIBRARY (My Question Bank)
```
├── Page Header
│   ├── Kicker: "Your question bank"
│   ├── Title: "Library."
│   └── Subtitle: "Questions you've saved and errors from all tests. Auto-updated as you practise."
│
├── Library Tabs
│   ├── "SAVED" tab (active)
│   │   └── Count of saved questions
│   │
│   └── "ERRORS" tab
│       └── Count of incorrect answers
│
├── Search / Filter Section
│   ├── Search input: "Search saved questions…"
│   ├── Subject filter dropdown
│   └── Difficulty filter buttons
│
└── Question Cards Grid
    └── Each Saved Question Card Contains:
        ├── Source label (Chapter / PYQ name)
        ├── Question text
        ├── 4 Answer options
        │   └── Correct option: green highlight + "✓" mark
        │   └── Wrong options: neutral styling
        │
        ├── Explanation section (collapsible)
        │   ├── "EXPLANATION" label
        │   └── Full explanation text
        │
        ├── Tags
        │   ├── "Wrong" (red tag, if error)
        │   └── "Saved" (gold tag)
        │
        └── Actions
            ├── "Remove from library" link
            └── Save/unsave toggle
```

---

### 10. ALL SUBJECTS
```
├── Page Header
│   ├── Kicker: "Your 4 subjects"
│   ├── Title: "All subjects. Chapter by chapter."
│   └── Subtitle: "Every CUET topic covered across Accountancy, Business Studies, Economics and English."
│
└── Subject Cards Grid (3-column)
    └── Each Subject Card Contains:
        ├── Emoji icon
        ├── Subject name
        ├── Chapter count
        ├── Status tag (badge color-coded)
        ├── Progress indicator
        └── Accent line (colored bottom border)

### Subject Cards
1. Accountancy
   - Chapters: 10
   - Questions: 500+
   - Tag: ACCOUNTANCY

2. Business Studies
   - Chapters: 12
   - Questions: 450+
   - Tag: BUSINESS

3. Economics
   - Chapters: 8
   - Questions: 400+
   - Tag: ECONOMICS

4. English
   - Chapters: 5 (vocab focus)
   - Questions: 2000+ (vocab words)
   - Tag: LANGUAGE
```

---

### 11. PRICING
```
├── Page Header
│   ├── Kicker: "Plans & pricing"
│   ├── Title: "Simple pricing. No hidden charges."
│   └── Subtitle: "One-time payment, valid till CUET 2026. No subscriptions."
│
└── Plan Cards Grid (3-column)
    ├── Free Plan Card
    │   ├── Plan name: "Free"
    │   ├── Price: Free
    │   ├── Tagline: "Get started"
    │   ├── Features list (with checkmarks)
    │   │   ├── 1 Mock Test
    │   │   ├── 3 Chapters (practice)
    │   │   ├── Flashcard access (limited)
    │   │   └── Analysis (basic)
    │   └── "Start Free" button
    │
    ├── Commerce Pro Card (FEATURED)
    │   ├── Badge: "Most popular"
    │   ├── Plan name: "Commerce Pro"
    │   ├── Price: ₹999
    │   ├── Validity: Till CUET 2026
    │   ├── Features list (highlighted)
    │   │   ├── All 21 Mock Tests
    │   │   ├── All chapters (Accountancy, Business Studies, Economics)
    │   │   ├── Complete flashcard access
    │   │   ├── Full analysis & progress tracking
    │   │   ├── Priority support
    │   │   └── Offline content access
    │   └── "Get Commerce Pro →" button (primary color)
    │
    └── Full Pack Card
        ├── Plan name: "Full Pack"
        ├── Price: ₹1,499
        ├── Validity: Till CUET 2026
        ├── Features list
        │   ├── Everything in Commerce Pro
        │   ├── English (vocab + grammar)
        │   ├── Bonus: College Predictor
        │   ├── Exclusive webinars
        │   └── Lifetime updates
        └── "Get Full Pack" button
```

---

### 12. COLLEGE PREDICTOR
```
├── Page Header
│   ├── Kicker: "Exclusive tool · 2025 CSAS data"
│   ├── Title: "College Predictor."
│   └── Subtitle: "Real 2025 CSAS Round 1 cutoffs — B.Com (Hons) & B.Com (Pass). Enter scores, pick your programme and category, see exactly where you stand."
│
├── Program Selection
│   ├── "B.Com (Hons)" tab (active)
│   └── "B.Com (Pass)" tab
│
├── Category Selection (Radio buttons)
│   ├── General (UR)
│   ├── OBC-NCL
│   ├── SC
│   ├── ST
│   ├── EWS
│   └── PwBD
│
├── Score Sliders
│   ├── Accountancy slider (0-250)
│   │   ├── Input range
│   │   └── Value display
│   │
│   ├── Economics slider (0-250)
│   │   ├── Input range
│   │   └── Value display
│   │
│   ├── Business Studies slider (0-250)
│   │   ├── Input range
│   │   └── Value display
│   │
│   └── English slider (0-250)
│       ├── Input range
│       └── Value display
│
├── Total Score Display
│   ├── Combined score calculation
│   └── Percentage
│
├── College List (Results)
│   └── Each College Row Shows:
│       ├── College name
│       ├── Cutoff marks (2025)
│       ├── Status badge
│       │   ├── "Safe" (green)
│       │   ├── "Close" (gold)
│       │   └── "Risk" (red)
│       └── Margin / comparison
│
└── Cutoff Explorer Table
    ├── Section: "2025 CSAS Cutoff Explorer"
    ├── Category tabs (UR, OBC, SC, ST, EWS, PwBD)
    └── College Cutoff Table
        ├── College name
        ├── B.Com (Hons) cutoff
        ├── B.Com (Pass) cutoff
        └── Seats available
```

---

### 13. EXAM OVERLAY (Test Taking Interface)
```
├── Left Panel (Test Content)
│   ├── Top Bar
│   │   ├── Logo: "CUETPioneer"
│   │   ├── Mock name (e.g., "Mock Test 1")
│   │   ├── Spacer
│   │   └── Timer box
│   │       ├── Label: "TIME"
│   │       └── Time remaining (HH:MM)
│   │
│   ├── Section Bar
│   │   ├── Section tabs (e.g., "Section A", "Section B")
│   │   ├── Info label (questions in section)
│   │   └── Active indicator
│   │
│   ├── Question Body
│   │   ├── Question header
│   │   │   ├── Question number
│   │   │   ├── Question type badge (MCQ)
│   │   │   └── Marks badge
│   │   │
│   │   ├── Question text (main content)
│   │   │
│   │   ├── Options container
│   │   │   └── Each Option Contains:
│   │   │       ├── Option letter (A, B, C, D)
│   │   │       ├── Option text
│   │   │       ├── Selectable state
│   │   │       └── Correct/Wrong state (after submit)
│   │   │
│   │   └── Explanation box (after submission)
│   │       ├── "EXPLANATION" label
│   │       └── Full explanation text
│   │
│   └── Navigation Footer
│       ├── Question counter (X of 50)
│       ├── "← Prev" button
│       ├── "Mark for Review" button
│       ├── Save question toggle icon
│       ├── "Next →" button
│       └── "Submit Test" button (final)
│
└── Right Panel (Question Navigator)
    ├── Header
    │   ├── Title: "Test Navigator"
    │   └── Instruction label
    │
    ├── Legend
    │   ├── Green dot: Answered
    │   ├── Empty box: Skipped
    │   ├── Gold dot: Marked for review
    │   └── Orange dot: Current question
    │
    ├── Question Grid (5 columns)
    │   └── Each Cell (Question Button):
    │       ├── Question number
    │       ├── Status indicator (color-coded)
    │       └── Clickable to jump to question
    │
    └── Footer
        ├── "Submit Test" CTA
        └── Stats summary
```

---

### 14. TEST RESULT / REVIEW SCREEN
```
├── Hero Section (Dark background)
│   ├── Kicker: "Test complete"
│   ├── Title: "You scored"
│   ├── Large score display (X/50)
│   ├── Percentage display (X%)
│   └── Verdict text (e.g., "Good attempt!")
│
├── Performance Metrics Grid (4 columns)
│   ├── Correct Answers
│   │   ├── Count (e.g., 38)
│   │   └── Points earned
│   │
│   ├── Wrong Answers
│   │   ├── Count
│   │   └── Points deducted
│   │
│   ├── Skipped
│   │   ├── Count
│   │   └── No marks
│   │
│   └── Accuracy %
│       ├── Percentage
│       └── Benchmark comparison
│
├── Subject-wise Breakdown
│   └── Each Subject Row:
│       ├── Subject name
│       ├── Accuracy bar chart
│       ├── Percentage
│       └── Questions count
│
├── Leaderboard Section
│   ├── Title: "Leaderboard"
│   ├── "LIVE" badge
│   └── Ranking table
│       ├── Rank
│       ├── User avatar
│       ├── User name
│       ├── City (optional)
│       ├── Score
│       ├── Percentile
│       └── Highlight row (your score)
│
└── Actions
    ├── "Review Solutions" button
    ├── "Try another mock" button
    ├── "← Back to dashboard" button
    └── Share results option
```

---

## Data Objects (JavaScript)

### CHAPTER_MOCKS Object
```
{
  "ch1-partnership": { name: "...", questions: [...] },
  "ch2-admission": { ... },
  "ch3-retirement": { ... } (50 questions),
  "ch4-dissolution": { ... } (50 questions),
  "ch5-sharecapital": { ... },
  "ch6-debentures": { ... },
  "ch7-finstatements": { ... },
  "ch8-analysis": { ... },
  "ch9-ratios": { ... },
  "ch10-cashflow": { ... },
  "bst1": { ... },
  "bst2": { ... },
  "bst3": { ... }
}
```

### PYQ_MOCKS Object
```
{
  "acc-2025-04-06-shift1": { questions: [...] },
  "acc-2025-03-06-shift1": { ... },
  "acc-2025-02-06-shift1": { ... },
  ... (21 total 2025 papers)
}
```

### Question Object Schema
```
{
  t: "Question text",
  o: ["Option A", "Option B", "Option C", "Option D"],
  a: 1,  // Answer index (0-3)
  e: "Detailed explanation"
}
```

---

## Storage (localStorage)

- `cuetpioneer_users`: User account database
- `cuetpioneer_session`: Active login session
- `saved_questions`: Bookmarked questions
- `test_results`: Attempt history
- `progress`: Chapter-wise progress

---

## Forms & Input Fields

### Login Form
- Username input
- Password input
- Submit button
- Tab switcher

### Signup Form
- Username input
- Password input
- Submit button
- Tab switcher

### Predictor Form
- Score sliders (4)
- Program selector (radio)
- Category selector (radio)
- Calculate button

### Search Form
- Search input (library)
- Subject filter
- Difficulty filter

---

## Interactive Elements

### Buttons
- Primary (filled, accent color)
- Secondary (outlined)
- Tertiary (text only)
- Small (compact)
- Disabled states

### Tabs
- Year tabs
- Subject tabs
- Mode tabs
- Program tabs
- Category tabs

### Badges & Chips
- Status badges (New, Completed, etc.)
- Difficulty chips (Easy, Medium, Hard)
- Category chips
- Tag chips

### Progress Indicators
- Progress bars (horizontal)
- Heatmap cells (activity)
- Question status buttons (grid)
- Accuracy percentages

---

## Overlays & Modals

- Exam interface (full-screen)
- Note detail (modal)
- Confirmation (modal)
- Profile popup (dropdown)
- Search results (inline)

```