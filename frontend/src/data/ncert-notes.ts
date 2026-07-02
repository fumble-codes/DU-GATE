export interface NcertNoteSection {
  heading: string;
  paragraphs?: string[];
  formulas?: string[];
  items?: string[];
}

export interface NcertNote {
  id: string;
  subject: string;
  chapter: string;
  chapterName: string;
  title: string;
  kicker: string;
  wordCount: number;
  readTime: number;
  preview: string;
  content: {
    sections: NcertNoteSection[];
  };
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
}

export const NCERT_NOTES: NcertNote[] = [
  {
    id: "ncert-acc-ch1-01",
    subject: "Accountancy",
    chapter: "ch1-partnership",
    chapterName: "Chapter 1: Accounting for Partnership — Basic Concepts",
    title: "Nature of Partnership & Partnership Deed",
    kicker: "Chapter 1: Partnership — Basic Concepts",
    wordCount: 2400,
    readTime: 16,
    preview:
      "Understanding the fundamental nature of partnership as a business structure. Covers essential features, partnership deed, legal provisions, and the special aspects of maintaining partnership accounts.",
    content: {
      sections: [
        {
          heading: "DEFINITION & NATURE",
          paragraphs: [
            "Partnership is the relation between persons who have agreed to share the profits of a business carried on by all or any of them acting for all.",
            "As per Section 4 of the Indian Partnership Act 1932, partnership involves two or more persons coming together to establish a business and share its profits and losses.",
          ],
        },
        {
          heading: "ESSENTIAL FEATURES",
          items: [
            "Two or More Persons — Minimum 2, Maximum 50 partners (as per Companies Act 2013)",
            "Agreement — Can be oral or written; written agreement is preferred to avoid disputes",
            "Carrying on a Business — Must be engaged in some legal business activity. Mere co-ownership of property does NOT constitute partnership",
            "Mutual Agency — Each partner is entitled to participate in business management. Every partner can bind other partners by his acts. Without mutual agency, there is NO partnership",
            "Sharing of Profit and Loss — Agreement must include sharing of profits AND losses. Even though the Act mentions 'profits,' sharing of losses is implied",
            "Liability of Partners — Each partner is liable JOINTLY with all other partners and also SEVERALLY liable. Liability is UNLIMITED — private assets can be used to pay firm's debts",
          ],
        },
        {
          heading: "PARTNERSHIP DEED",
          paragraphs: [
            "A written document containing the terms and conditions agreed upon by the partners.",
            "Not legally mandatory, but strongly recommended. Should be properly drafted as per Stamp Act provisions and preferably registered with Registrar of Firms.",
          ],
          items: [
            "Names and addresses of firm, business, and all partners",
            "Amount of capital to be contributed by each partner",
            "Profit and loss sharing ratio",
            "Rate of interest on capital, drawings, and partner's loan",
            "Salaries and commission payable to partners",
            "Rules for admission, retirement, and death of partners",
            "Method of settling disputes and dissolution terms",
          ],
        },
        {
          heading: "LEGAL PROVISIONS (WHEN DEED IS SILENT)",
          paragraphs: [
            "When partnership deed is SILENT on any matter, the following provisions of Indian Partnership Act 1932 apply automatically:",
          ],
          items: [
            "Profit Sharing Ratio — Profits and losses are shared EQUALLY by all partners, irrespective of capital contribution",
            "Interest on Capital — NO partner is entitled to claim interest on capital by right. Only allowed if expressly agreed in deed",
            "Interest on Drawings — NO interest is charged on drawings if deed is silent",
            "Interest on Loan — Partner gets interest @ 6% p.a. by right on any loan advanced to the firm for business",
            "Remuneration — NO partner is entitled to salary or commission unless deed specifically provides for it",
          ],
        },
        {
          heading: "SPECIAL ASPECTS OF PARTNERSHIP ACCOUNTS",
          items: [
            "Maintenance of Partners' Capital Accounts — Two methods: Fixed and Fluctuating",
            "Distribution of Profit and Loss — Through Profit and Loss Appropriation Account",
            "Adjustments for Wrong Appropriation — Past errors correction",
            "Reconstitution of Firm — Admission, retirement, or death of partners",
            "Dissolution of Firm — Final settlement of accounts",
          ],
        },
        {
          heading: "FIXED vs FLUCTUATING CAPITAL METHOD",
          paragraphs: [
            "Fixed Capital Method: Capital amount remains FIXED unless additional capital is introduced or withdrawn. Two separate accounts maintained — Capital Account (for capital transactions only) and Current Account (for all other adjustments like salary, commission, interest, drawings, share of profit/loss).",
            "Fluctuating Capital Method: Only ONE account per partner where ALL adjustments are recorded directly. Capital balance fluctuates from year to year. This is the DEFAULT method if no instructions are given.",
          ],
          items: [
            "Fixed Capital: Capital account always shows CREDIT balance. Current account may show debit OR credit balance",
            "Fluctuating Capital: Single account, balance can be debit or credit. Simpler but less transparent",
          ],
          formulas: [
            "Fixed Capital: Closing Capital = Opening Capital + Fresh Capital - Withdrawals",
            "Fluctuating Capital: Closing Balance = Opening Balance + Salary + Commission + Interest on Capital + Share of Profit - Drawings - Interest on Drawings - Share of Loss",
          ],
        },
        {
          heading: "INTEREST ON CAPITAL",
          paragraphs: [
            "Interest on capital is allowed ONLY when expressly agreed in partnership deed. It is calculated on the opening balance of capital for the full year, with adjustments for additional capital (from date of introduction) and withdrawals.",
          ],
          formulas: [
            "Simple Interest = Capital × Rate/100",
            "Partial Year: Capital × Rate/100 × Months/12",
            "For varying capitals: Calculate separately for each period and sum",
          ],
          items: [
            "Only allowed when firm has profit",
            "If profit < total interest due: distribute available profit in the ratio of interest on capital",
            "No interest on capital in a loss year",
          ],
        },
        {
          heading: "INTEREST ON DRAWINGS",
          paragraphs: [
            "Interest on drawings is charged ONLY when partnership deed provides for it. It discourages excessive withdrawals and compensates the firm for funds taken out.",
          ],
          formulas: [
            "Fixed amount monthly (beginning): Total × Rate/100 × 6.5/12",
            "Fixed amount monthly (ending): Total × Rate/100 × 5.5/12",
            "Fixed amount monthly (middle): Total × Rate/100 × 6/12",
            "Product Method: Interest = Sum of Products × Rate/100 × 1/12",
          ],
        },
        {
          heading: "GUARANTEE OF PROFIT",
          paragraphs: [
            "Sometimes a partner (usually a new partner) is given a guarantee of minimum profit share by existing partners. If the partner's actual share is less than the guaranteed amount, the deficiency is made good by the guaranteeing partners in their profit sharing ratio.",
          ],
        },
        {
          heading: "PAST ADJUSTMENTS",
          paragraphs: [
            "After final accounts are prepared and profit distributed, errors in interest on capital, drawings, salary, or commission may be discovered. Correction is done either through a Profit and Loss Adjustment Account or by direct adjustment in capital accounts.",
          ],
        },
      ],
    },
    tags: ["important", "definition", "formula"],
    difficulty: "medium",
  },
  {
    id: "ncert-acc-ch1-02",
    subject: "Accountancy",
    chapter: "ch1-partnership",
    chapterName: "Chapter 1: Accounting for Partnership — Basic Concepts",
    title: "Profit Distribution & Appropriation Account",
    kicker: "Chapter 1: Partnership — Basic Concepts",
    wordCount: 1800,
    readTime: 12,
    preview:
      "Detailed walkthrough of the Profit and Loss Appropriation Account — how net profit is distributed among partners after adjusting for interest, salary, commission, and other entitlements.",
    content: {
      sections: [
        {
          heading: "PROFIT & LOSS APPROPRIATION ACCOUNT",
          paragraphs: [
            "Before distributing profit to partners, certain adjustments are made: interest on capital, interest on drawings, partner's salary, partner's commission, and other entitlements as per the deed.",
            "The Profit and Loss Appropriation Account shows how the firm's profit is distributed among partners after making all adjustments.",
          ],
          items: [
            "Debit Side (uses/deductions from profit): Interest on Capital, Salary to Partners, Commission to Partners, Share of Loss",
            "Credit Side (sources of profit): Net Profit from P&L Account, Interest on Drawings, Share of Profit distributed",
          ],
        },
        {
          heading: "DISTRIBUTION RULES",
          items: [
            "When Firm Has Loss: No interest on capital, salary, or commission is allowed to partners",
            "Remaining profit after adjustments is distributed in the agreed profit sharing ratio",
            "If deed is silent on ratio, profit is shared EQUALLY among all partners",
          ],
        },
      ],
    },
    tags: ["procedure", "important"],
    difficulty: "medium",
  },
];
