import HomeShell from "@/components/homeShell";
import { getProjectIds } from "@/lib/sanity";

export async function generateStaticParams() {
  const ids = await getProjectIds();
  return ids.map((item) => ({ id: item.id })).filter((item) => Boolean(item.id));
}

export default function ProjectPage({ params }) {
  return <HomeShell initialProjectId={params.id} />;
}