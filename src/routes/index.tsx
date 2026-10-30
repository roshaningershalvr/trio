import { createFileRoute } from "@tanstack/react-router";
import { TrioExperience } from "@/components/trio/TrioExperience";
import { homeSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => homeSeo,
  component: TrioExperience,
});
