import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { OVERVIEW_METRICS } from "@/lib/funding-data";
import { AlertCircle } from "lucide-react";

export function BudgetUtilizationChart() {
  const { totalFunding, productionCost, postProductionCost, remainingBalance } = OVERVIEW_METRICS;

  const data = [
    { name: "Production", value: productionCost, color: "#ef4444" },
    { name: "Post Production", value: postProductionCost, color: "#a855f7" },
    { name: "Remaining", value: remainingBalance, color: "#10b981" },
  ];

  return (
    <div className="w-full glass-soft p-8 rounded-xl border border-primary/10 flex flex-col items-center">
      <h3 className="text-xl md:text-2xl font-display tracking-widest text-center mb-8 uppercase text-primary/90">
        How Was The Budget Utilized?
      </h3>

      <div className="w-full max-w-[600px] flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        {/* Visual Chart */}
        <div className="w-[200px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `₹${new Intl.NumberFormat("en-IN").format(value)}`}
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown Values */}
        <div className="flex flex-col gap-6 flex-1 w-full">
          <div className="border-l-2 border-primary pl-4">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">TOTAL CONTRIBUTION</p>
            <p className="text-2xl font-display">
              ₹{new Intl.NumberFormat("en-IN").format(totalFunding)}
            </p>
          </div>
          <div className="border-l-2 border-red-500 pl-4">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">PRODUCTION</p>
            <p className="text-2xl font-display text-red-500">
              ₹{new Intl.NumberFormat("en-IN").format(productionCost)}
            </p>
          </div>
          <div className="border-l-2 border-purple-500 pl-4">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">POST PRODUCTION</p>
            <p className="text-2xl font-display text-purple-500">
              ₹{new Intl.NumberFormat("en-IN").format(postProductionCost)}
            </p>
          </div>
          <div className="border-l-2 border-emerald-500 pl-4">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">REMAINING</p>
            <p className="text-2xl font-display text-emerald-500">
              ₹{new Intl.NumberFormat("en-IN").format(remainingBalance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
