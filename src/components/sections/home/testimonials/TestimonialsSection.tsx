import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { Star } from "lucide-react";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import AnimatedButton from "@/components/shared/AnimatedButton";
import SectionSeparator from "@/components/shared/SectionSeparator";
import DynamicCard from "@/components/shared/DynamicCard";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Ahmed Al-Rashid",
      image:
        "https://img.freepik.com/free-photo/close-up-beautiful-girl-portrait-with-purple-hair_23-2150799937.jpg",
      company: "Horizon Travels",
      rating: 5,
      text: "Yelvo Creatives transformed our brand completely. The Shariah-compliant approach gave us confidence, and the results speak for themselves.",
      socialPlatform: "Twitter",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Fatima Hussain",
      image:
        "https://img.freepik.com/premium-photo/man-wearing-glasses-blue-shirt-with-white-shirt-that-says-he-is-wearing-blue-shirt_1289061-1605.jpg?w=1480",
      company: "Al-Habib Traders",
      rating: 5,
      text: "Professional, creative, and ethical. They understood our vision and delivered beyond expectations. Our sales have tripled!",
      socialPlatform: "LinkedIn",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Omar Farooq",
      image:
        "https://img.freepik.com/free-photo/front-view-man-posing-outdoors_23-2151038658.jpg?t=st=1771102312~exp=1771105912~hmac=476e6836417da781c2a27b8ee73a7152d54c2002b30be252c578edb1a8f9c620&w=1480",
      company: "Al-Zayaba Hajj",
      rating: 5,
      text: "Working with Yelvo was a game-changer. Their strategic approach to branding helped us compete with international agencies.",
      socialPlatform: "Instagram",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Aisha Khan",
      image:
        "https://img.freepik.com/free-photo/monochrome-portrait-man-showing-vulnerability-self-acceptance_23-2151237407.jpg",
      company: "Barakah Foods",
      rating: 5,
      text: "Finally, a creative agency that understands Islamic business values. The quality of work is world-class.",
      socialPlatform: "Instagram",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Ibrahim Malik",
      image:
        "https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134201.jpg",
      company: "Noor Academy",
      rating: 5,
      text: "From concept to execution, Yelvo delivered exceptional results. Our enrollment increased by 250% after the rebrand.",
      socialPlatform: "LinkedIn",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Mariam Siddiqui",
      image:
        "https://img.freepik.com/free-photo/young-businesswoman-smiling-camera_197531-11176.jpg?t=st=1771102312~exp=1771105912~hmac=476e6836417da781c2a27b8ee73a7152d54c2002b30be252c578edb1a8f9c620&w=1480",
      company: "Halal Eats",
      rating: 5,
      text: "The best investment we made for our business. Professional, responsive, and truly dedicated to our success.",
      socialPlatform: "Twitter",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
  ];

  return (
    <Section
      id="testimonials"
      className="max-w-[1280px] mx-auto relative flex flex-col justify-center items-center gap-[44px] overflow-hidden"
    >
      <Image
        src="/images/left-vector.svg"
        alt="Left Vector"
        width={560}
        height={235}
        className="absolute -left-20 top-20 z-10"
      />
      <Image
        src="/images/right-vector.svg"
        alt="Right Vector"
        width={560}
        height={235}
        className="absolute -right-20 top-20 z-10"
      />
      <SectionHeader
        className="max-w-[60%] items-center gap-[0px] z-20"
        title="Client "
        description="Trusted by 100+ happy clients for their exceptional work."
        badgeText="Feedback"
        gradientText="Testimonials"
      />
      <AnimatedButton onClick={() => {}}>Become one of them</AnimatedButton>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-20 mt-[44px]">
        {reviews.map((review, index) => (
          <DynamicCard key={index}>
            <div className="flex flex-col gap-[24px]">
              <div className="w-full flex justify-between items-center">
                <div className="relative w-[40px] h-[40px] flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex items-center gap-[10px]">
                  <Link
                    href={review.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {review.socialPlatform === "Twitter" ? (
                      <BsTwitterX size={30} color="#FFFFFF" />
                    ) : review.socialPlatform === "LinkedIn" ? (
                      <FaLinkedin size={30} color="#FFFFFF" />
                    ) : review.socialPlatform === "Instagram" ? (
                      <FaInstagram size={30} color="#FFFFFF" />
                    ) : null}
                  </Link>
                </div>
              </div>
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill="#FFFFFF"
                    style={{ color: "#FFFFFF" }}
                  />
                ))}
              </div>
              {/* Review Text */}
              <p className="text-[18px] leading-[24px] font-normal text-white/70">
                {review.text}
              </p>
            </div>

            <div className="w-full max-w-[220px]">
              <SectionSeparator
                orientation="horizontal"
                color="FFFFFF"
                centerOpacity={0.25}
                className="my-[12px]"
              />
            </div>

            {/* Client Info */}
            <div className="w-full flex flex-col">
              <h6 className="text-[18px] font-normal leading-[24px] text-[#FFFFFF]">
                {review.name}
              </h6>
              <p className="text-[14px] font-normal leading-[20px] text-[#B9B9B9]">
                {review.company}
              </p>
            </div>
          </DynamicCard>
        ))}
      </div>
    </Section>
  );
}
