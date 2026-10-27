import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CONTRIBUTORS } from "@/lib/funding-data";

export function FundingDonutChart() {
  const specifiedContributions = CONTRIBUTORS.filter((c) => c.amount !== null) as {
    name: string;
    amount: number;
  }[];

  const total = specifiedContributions.reduce((sum, c) => sum + c.amount, 0);

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
    "#f97316", // Orange
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
                formatter={(value: number) => [
                  `₹${new Intl.NumberFormat("en-IN").format(value)}`, "Contribution",
                ]}
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

        <ul
          aria-label="Contribution amounts by chart color"
          className="grid grid-cols-2 gap-x-8 gap-y-3 w-full max-w-xs mx-auto lg:mx-0 list-none p-0"
        >
          {specifiedContributions.map((entry, index) => (
            <li key={entry.name} className="flex items-center gap-3 text-sm">
              <span
                aria-hidden="true"
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="font-mono text-foreground/90">
                ₹{new Intl.NumberFormat("en-IN").format(entry.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
