import { AkaraMotion } from "@/app/components/AkaraMotion";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#24150f] px-5 pb-16 pt-28 text-white md:px-8 md:pb-20 md:pt-32">
      <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_15%_15%,#f97316,transparent_28%),radial-gradient(circle_at_80%_20%,#16a34a,transparent_26%)]" />
      <AkaraMotion />
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="rise-in inline-flex rounded-[8px] border border-[#fbbf24]/30 bg-[#fff7ed]/10 px-3 py-2 text-sm font-black uppercase text-[#fef3c7] backdrop-blur">
          {eyebrow}
        </p>
        <h1 className="rise-in mt-5 max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="rise-in mt-5 max-w-2xl text-base font-medium leading-7 text-[#ffedd5] sm:text-lg">
          {description}
        </p>
        {children ? <div className="rise-in mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
