import { FadeIn } from "@/components/motion";

export default function PageHeader({ title }: { title: string }) {
  return (
    <header className="page-header">
      <FadeIn><h1>{title}</h1></FadeIn>
      <span aria-hidden="true" />
    </header>
  );
}
