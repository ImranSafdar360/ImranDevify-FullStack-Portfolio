import React from 'react'
import Section from '@/components/shared/Section'
import SectionHeader from '@/components/shared/SectionHeader'
import ImageCard from '@/components/shared/ImageCard'
import DynamicCard from '@/components/shared/DynamicCard'
import { Code2, Smartphone, Globe, CheckCircle2 } from 'lucide-react'
import SectionSeparator from '@/components/shared/SectionSeparator'
import SectionBadge from '@/components/shared/SectionBadge'

const services = [
  {
    title: "Full-Stack SaaS Development",
    description: "End-to-end SaaS products built with the MERN stack, focusing on scalability and high performance.",
    category: "Web Development",
    icon: <Code2 className="w-8 h-8 text-[#0080FF]" />,
    bullets: [
      "Custom Dashboard & Admin Panels",
      "Secure API Integration & Auth",
      "Real-time Data Processing"
    ]
  },
  {
    title: "Cross-Platform Mobile Apps",
    description: "High-performance iOS and Android applications developed using React Native for a seamless user experience.",
    category: "Mobile Development",
    icon: <Smartphone className="w-8 h-8 text-[#0080FF]" />,
    bullets: [
      "Native-like Performance & UX",
      "Offline-first Functionality",
      "App Store & Play Store Ready"
    ]
  },
  {
    title: "Custom Business Solutions",
    description: "Tailored digital solutions for agencies and businesses to automate workflows and enhance digital presence.",
    category: "Enterprise",
    icon: <Globe className="w-8 h-8 text-[#0080FF]" />,
    bullets: [
      "Automated Business Workflows",
      "Scalable Architecture Design",
      "Third-party Service Integration"
    ]
  }
]

const Services = () => {

  return (
    <Section className="relative flex flex-col lg:flex-row justify-center gap-[84px]">
      <div className='static lg:sticky top-40 self-start'>
        <ImageCard image="/images/profile-pic.avif" alt="Services" />
      </div>
      <div className="w-full lg:max-w-[50%] flex flex-col gap-[84px]">
        <SectionHeader
          className="gap-[8px]"
          title="Get High-Quality"
          description="I offer a wide range of services to help you achieve your goals."
          badgeText="Services"
          gradientText="Clear Services Remotely."
          isAbout={true}
        />

        <div className="flex flex-col gap-6">
          {services.map((service, index) => (
            <DynamicCard key={index} className="relative max-w-[590px] min-h-fit p-8">
              {/* Background Pattern for Active State */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                ></div>
              </div>
              <div className="flex flex-col gap-[44px]">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    {service.icon}
                  </div>
                  <SectionBadge className="text-sm" text={service.category} />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-white font-sora">
                    {service.title}
                  </h3>
                  <p className="text-md text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="w-full max-w-[50%]">
                  <SectionSeparator
                    orientation="horizontal"
                    color="FFFFFF"
                    centerOpacity={0.25}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  {service.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0080FF] shrink-0" />
                      <span className="text-white/80 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </DynamicCard>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Services