import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer:
        "I specialize in full-stack development using modern technologies like React.js, Next.js, Node.js, and TypeScript. For styling and animations, I use Tailwind CSS, GSAP, and Framer Motion to create high-performance, visually stunning interfaces.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines depend on the scope and complexity. A landing page usually takes 1-2 weeks, while a complex full-stack web application can take 4-8 weeks. I focus on delivering quality and efficiency.",
    },
    {
      question: "Do you offer maintenance and support after delivery?",
      answer:
        "Yes, I provide ongoing support to ensure your application remains secure and up-to-date. This includes bug fixes, performance monitoring, and implementing new features as your project grows.",
    },
    {
      question: "Can you help with UI/UX design as well as development?",
      answer:
        "Definitely! I bridge the gap between design and code. I can create pixel-perfect UIs directly in the codebase or work from your existing Figma designs to ensure a seamless user experience.",
    },
    {
      question: "How do you handle project communication?",
      answer:
        "I believe in transparency and regular updates. I use tools like Slack, WhatsApp, and video calls to keep you informed at every stage of the development process, ensuring the final product meets your vision.",
    },
    {
      question: "Can you work on existing codebases?",
      answer:
        "Yes, I am experienced in jumpstarting development on existing projects. Whether it's refactoring code, fixing bugs, or scaling your current application, I can integrate quickly and deliver improvements.",
    },
  ];

  return (
    <Section className="max-w-[1080px] mx-auto relative flex flex-col justify-center items-center gap-[84px]">
      <SectionHeader 
      className="max-w-[60%] items-center gap-[8px]"
      title="Have Questions?" 
      description="We've heard it all. Here's everything you need to know before working with us." 
      badgeText="FAQs" 
      gradientText="We've Got Answers." 
      />

      {/* FAQ Accordion */}
      <Accordion
        defaultValue="item-0"
        type="single"
        collapsible
        className="w-full flex flex-col gap-4"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="p-px rounded-[12px] bg-linear-to-r from-[#080808] via-[#666666] to-[#080808] border-none"
          >
            <div className="w-full h-full rounded-[19px] bg-[#080808] px-6 transition-all duration-300">
              <AccordionTrigger
                className="hover:no-underline py-6 cursor-pointer"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                <span className="flex items-center gap-3 font-sora font-semibold">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "#00C7FE" }}
                  />
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent
                className="pb-6 text-white/70"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  paddingLeft: "1.75rem",
                }}
              >
                {faq.answer}
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
