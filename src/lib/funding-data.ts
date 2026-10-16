export const OVERVIEW_METRICS = {
  totalFunding: 36200,
  totalSpent: 36200,
  productionCost: 24400,
  postProductionCost: 11800,
  accountsClosed: "6th August 2026",
};

export const CONTRIBUTORS = [
  { name: "Contributor 1", amount: 10000 },
  { name: "Contributor 2", amount: 6000 },
  { name: "Contributor 3", amount: 5000 },
  { name: "Contributor 4", amount: 5000 },
  { name: "Contributor 5", amount: 2000 },
  { name: "Contributor 6", amount: 2000 },
  { name: "Contributor 7", amount: 1200 },
  { name: "Contributor 8", amount: 1000 },
  { name: "Contributor 9", amount: 1000 },
  { name: "Contributor 10", amount: 1000 },
  { name: "Contributor 11", amount: 1000 },
  { name: "Contributor 12", amount: 1000 },
];

export const TRANSACTIONS = [
  // PRODUCTION
  { date: "Wednesday, May 20, 2026", category: "EQUIPMENT ADVANCE", amount: 500, notes: "Day 1" },
  { date: "Friday, May 22, 2026", category: "EQUIPMENT ADVANCE", amount: 500, notes: "Day 2 & 3" },
  { date: "", category: "PRODUCTION & SET WORKS", amount: 1150, notes: "" },
  { date: "Wednesday, May 27, 2026", category: "PRODUCTION & SET WORKS", amount: 870, notes: "Foundation" },
  { date: "Wednesday, May 27, 2026", category: "PRODUCTION & SET WORKS", amount: 105, notes: "To Arupadai veedu" },
  { date: "Friday, May 29, 2026", category: "PRODUCTION & SET WORKS", amount: 500, notes: "Printouts" },
  { date: "Saturday, May 30, 2026", category: "EQUIPMENT RENT", amount: 1850, notes: "Day 1 - May 30" },
  { date: "Saturday, May 30, 2026", category: "PRODUCTION & SET WORKS", amount: 250, notes: "Morning snacks" },
  { date: "Tuesday, June 2, 2026", category: "EQUIPMENT RENT", amount: 2100, notes: "Day 2 - June 2" },
  {
    date: "Wednesday, June 3, 2026",
    category: "PRODUCTION & SET WORKS",
    amount: 1400,
    notes: "Miscellaneous of Day 2",
  },
  { date: "Friday, June 5, 2026", category: "EQUIPMENT RENT", amount: 2600, notes: "Day 3 - June 5" },
  { date: "Friday, June 5, 2026", category: "EQUIPMENT ADVANCE", amount: 1000, notes: "Day 4 & 5" },
  { date: "Friday, June 5, 2026", category: "PRODUCTION & SET WORKS", amount: 1200, notes: "Miscellaneous of Day 3" },
  { date: "Monday, June 8, 2026", category: "EQUIPMENT RENT", amount: 2100, notes: "Day 4 - June 8" },
  { date: "Wednesday, June 10, 2026", category: "EQUIPMENT RENT", amount: 2100, notes: "Day 5 - June 10" },
  { date: "Monday, July 20, 2026", category: "PRODUCTION & SET WORKS", amount: 400, notes: "Miscellaneous of Day 6" },
  { date: "Monday, July 20, 2026", category: "EQUIPMENT RENT", amount: 2100, notes: "Day 6 - July 20" },
  { date: "Monday, July 20, 2026", category: "EQUIPMENT ADVANCE", amount: 500, notes: "Day 6" },
  { date: "Friday, July 31, 2026", category: "EQUIPMENT ADVANCE", amount: 500, notes: "Day 7" },
  { date: "Friday, July 31, 2026", category: "EQUIPMENT RENT", amount: 2100, notes: "Day 7 - July 31" },
  { date: "Friday, July 31, 2026", category: "PRODUCTION & SET WORKS", amount: 360, notes: "Final lunch" },
  { date: "Friday, July 31, 2026", category: "PRODUCTION & SET WORKS", amount: 215, notes: "To Maduravayol" },

  // POST PRODUCTION & PUBLICITY
  {
    date: "Tuesday, September 1, 2026",
    category: "POST PRODUCTION & PUBLICITY",
    amount: 5900,
    notes: "VFX AI models",
  },
  {
    date: "Tuesday, September 1, 2026",
    category: "POST PRODUCTION & PUBLICITY",
    amount: 968,
    notes: "Generative AI models & Voice studio",
  },
  {
    date: "Tuesday, September 1, 2026",
    category: "POST PRODUCTION & PUBLICITY",
    amount: 499,
    notes: "Media assets",
  },
  {
    date: "Tuesday, September 1, 2026",
    category: "POST PRODUCTION & PUBLICITY",
    amount: 500,
    notes: "Music production tools",
  },
];

export const CATEGORIES = Array.from(new Set(TRANSACTIONS.map((t) => t.category)));
