import SectionNumberBadge from "@/components/shared/SectionNumberBadge";
import SelectedWorkStacked from "./SelectedWorkStacked";
import SelectedWorkSticky from "./SelectedWorkSticky";

export default function SelectedWork() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container">
        <div className="mb-14 max-w-[640px] lg:mb-20">
          <SectionNumberBadge
            number="01"
            label="Selected Work"
            className="mb-6"
          />
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.04] tracking-tight text-text">
            Selected Work
          </h2>
          <p className="mt-5 max-w-[520px] font-sans text-body-lg leading-relaxed text-text-muted">
            Four products. Each one shipped to production. Each one with a real
            technical decision behind it.
          </p>
        </div>

        {/* Desktop (lg+): sticky-scroll. Mobile: stacked cards. Both render;
            Tailwind controls visibility so there's no server/client breakpoint
            divergence, and GSAP only initializes at lg+ via gsap.matchMedia. */}
        <div className="hidden lg:block">
          <SelectedWorkSticky />
        </div>
        <div className="block lg:hidden">
          <SelectedWorkStacked />
        </div>
      </div>
    </section>
  );
}
