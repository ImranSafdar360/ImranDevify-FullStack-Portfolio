import SelectedWorkStacked from "./SelectedWorkStacked";
import SelectedWorkSticky from "./SelectedWorkSticky";

export default function SelectedWork() {
  return (
    <section id="work" className="py-16 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-14 max-w-[720px]">
          <p className="mb-4 font-mono text-meta uppercase text-text-subtle">
            Selected Work
          </p>
          <h2 className="mb-4 font-serif text-[36px] text-text md:text-display-2">
            Selected Work
          </h2>
          <p className="max-w-[540px] font-sans text-body-lg text-text-muted">
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
