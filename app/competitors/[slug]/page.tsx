import { notFound } from "next/navigation";
import { brands } from "@/data/competitors";
import { CompetitorDetail } from "@/components/competitors/CompetitorDetail";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const b = brands.find((x) => x.slug === params.slug);
  return { title: b ? `${b.name} | Competitor Deep Dive` : "Competitor" };
}

export default function CompetitorDeepDive({ params }: { params: { slug: string } }) {
  const brand = brands.find((b) => b.slug === params.slug);
  if (!brand) notFound();
  return <CompetitorDetail brand={brand} />;
}
