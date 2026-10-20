import { useMemo } from "react";
import { TRANSACTIONS, CATEGORIES } from "@/lib/funding-data";

export function ExpenseCategoryCards() {
  const categoryData = useMemo(() => {
    return CATEGORIES.map((category) => {
      const txs = TRANSACTIONS.filter((t) => t.category === category);
      const total = txs.reduce((sum, t) => sum + t.amount, 0);
      return {
        category,
        total,
        count: txs.length,
      };
    }).sort((a, b) => b.total - a.total);
  }, []);

  const formatCurrency = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(val)}`;

  return (
    <div className="w-full glass-soft p-4 md:p-8 rounded-xl border border-primary/10">
      <h3 className="text-xl md:text-2xl font-display tracking-widest text-center mb-8 uppercase text-primary/90">
        Where Was The Money Spent?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryData.map((data) => (
          <div
            key={data.category}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-lg bg-white/5 border border-primary/10 gap-3"
          >
            <span className="font-medium tracking-wide sm:tracking-wider uppercase text-xs sm:text-sm text-left whitespace-nowrap min-w-0">
              {data.category}
            </span>
            <span className="font-mono text-base sm:text-lg shrink-0">{formatCurrency(data.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
