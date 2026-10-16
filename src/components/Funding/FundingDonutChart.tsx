import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CONTRIBUTORS } from "@/lib/funding-data";
import { motion } from "framer-motion";

export function FundingDonutChart() {
  const specifiedContributions = CONTRIBUTORS.filter((c) => c.amount !== null) as {
    name: string;
    amount: number;
  }[];
  const unspecifiedContributions = CONTRIBUTORS.filter((c) => c.amount === null);

  const total = specifiedContributions.reduce((sum, c) => sum + c.amount, 0);

  // Group smaller contributions into "Others" for cleaner visualization if needed, but the prompt says
  // "For smaller contributions, avoid cluttering the chart with overlapping labels. Use an external legend."

  // Custom cool cinematic colors
  const COLORS = [
    "#3b82f6", // Blue
    "#8b5cf6", // Violet
    "#06b6d4", // Cyan
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#ec4899", // Pink
    "#6366f1", // Indigo
    "#14b8a6", // Teal
    "#84cc16", // Lime
    "#64748b", // Slate
  ];

  return (
    <div className="w-full glass-soft p-4 md:p-8 rounded-xl border border-primary/10">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h3 className="text-xl md:text-2xl font-display tracking-widest mb-4 uppercase text-primary/90">
          Our Contributions Received
        </h3>
        <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide">
          This journey was made possible through the generous support of individuals who believed in
          our vision and trusted us to bring it to life for the glory of God.
        </p>
      </div>

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-center lg:gap-12">
        {/* Chart — fixed square, centred on mobile */}
        <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] flex-shrink-0 mx-auto lg:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={specifiedContributions}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="75%"
                paddingAngle={2}
                dataKey="amount"
                stroke="none"
              >
                {specifiedContributions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `₹${new Intl.NumberFormat("en-IN").format(value)}`}
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Central Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-muted-foreground text-xs tracking-widest mb-1">TOTAL</span>
            <span className="text-2xl md:text-3xl font-display font-bold">
              ₹{new Intl.NumberFormat("en-IN").format(total)}
            </span>
          </div>
        </div>

        {/* Legend — full width on mobile, constrained on desktop */}
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto lg:mx-0">
          <h4 className="text-sm tracking-[0.2em] text-muted-foreground border-b border-primary/20 pb-2 mb-2">
            CONTRIBUTIONS RECEIVED
          </h4>
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {specifiedContributions.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span
                    className="text-foreground/90 font-medium truncate w-[130px]"
                    title={entry.name}
                  >
                    {entry.name}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground w-12 text-right text-xs">
                    {((entry.amount / total) * 100).toFixed(1)}%
                  </span>
                  <span className="font-mono text-primary/80">
                    ₹{new Intl.NumberFormat("en-IN").format(entry.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {unspecifiedContributions.length > 0 && (
            <div className="mt-4 p-4 rounded-md bg-white/5 border border-white/10 text-xs text-muted-foreground tracking-wide leading-relaxed">
              <span className="text-orange-400 font-semibold mb-1 block">NOTE:</span>
              {unspecifiedContributions.map((c) => c.name).join(", ")} &mdash; contribution amount
              not specified in source records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
