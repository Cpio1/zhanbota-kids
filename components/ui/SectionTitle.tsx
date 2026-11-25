import { WavyLine } from "@/components/decor/Decor";

/** Компактный заголовок раздела: «кикер», заголовок, волнистая линия. */
export function SectionTitle({
  kicker,
  title,
  color = "#b8770f",
  wave = "#f5b041",
  align = "left",
  id,
}: {
  kicker: string;
  title: string;
  color?: string;
  wave?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="kicker-zh" style={{ color }}>
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: wave }} aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className="h-section mt-1.5 text-ink text-balance">
        {title}
      </h2>
      <WavyLine className={`mt-2 h-3 w-24 ${align === "center" ? "mx-auto" : ""}`} color={wave} />
    </div>
  );
}
