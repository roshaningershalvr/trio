/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { FundingKPIs } from "./FundingKPIs";
import { FundingDonutChart } from "./FundingDonutChart";
import { BudgetUtilizationChart } from "./BudgetUtilizationChart";
import { ExpenseCategoryCards } from "./ExpenseCategoryCards";
import { ProductionTimelineChart } from "./ProductionTimelineChart";
import { OVERVIEW_METRICS } from "@/lib/funding-data";

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

export function FundingSection() {
  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeUp}
      id="funding"
      className="section-wrap relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-0 right-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-teal-500/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <SectionLabel>TRANSPARENCY REPORT</SectionLabel>
      <div className="section-intro mb-16">
        <h2 className="display-heading mb-6 tracking-tight">
          <span className="block text-primary">FUNDING &</span>
          <span className="block text-white">CONTRIBUTION</span>
        </h2>
        <div>
          <p className="text-xl text-muted-foreground leading-relaxed font-light mb-6">
            Transparent Production Finance Overview
          </p>
          <p className="inline-block text-sm text-foreground/80 leading-relaxed border-l-2 border-primary/40 pl-4 bg-primary/5 p-4 rounded-r-md backdrop-blur-sm max-w-2xl mx-auto text-left">
            TRIO would not have been possible without the incredible people who believed in this
            vision and chose to stand with us. More than funding a film, you believed in our mission
            to tell stories rooted in Scripture and use cinema for the glory of God. Every
            contribution, big or small, helped bring this story from an idea to reality. From the
            entire TRIO team, thank you for trusting us and being part of this journey.
            <br /><br />
            <span className="text-primary font-semibold">Glory to God, because He lives!</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-12 w-full">
        {/* OVERVIEW */}
        <section className="space-y-4">
          <FundingKPIs {...OVERVIEW_METRICS} />
        </section>

        {/* CONTRIBUTIONS RECEIVED */}
        <section className="space-y-6">
          <FundingDonutChart />
        </section>

        {/* BUDGET UTILIZATION */}
        <section>
          <BudgetUtilizationChart />
        </section>

        {/* EXPENSE CATEGORIES */}
        <section>
          <ExpenseCategoryCards />
        </section>

        {/* PRODUCTION TIMELINE */}
        <section>
          <ProductionTimelineChart />
        </section>

      </div>

      <div className="mt-16 text-center pt-8 border-t border-primary/20">
        <p className="text-lg md:text-xl font-display text-primary/90 mb-4 max-w-3xl mx-auto leading-relaxed">
          TRIO represents a pursuit of uncompromising faith-driven storytelling presented with
          cinematic ambition and technical excellence.
        </p>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed tracking-wide">
          The goal is not simply to create Christian content. The goal is to tell powerful stories
          of faith with the cinematic craft they deserve.
        </p>
      </div>
    </motion.section>
  );
}
