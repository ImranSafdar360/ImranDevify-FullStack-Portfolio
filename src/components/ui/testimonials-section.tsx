import { Star } from "lucide-react";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Ahmed Al-Rashid",
      company: "Horizon Travels",
      rating: 5,
      text: "Yelvo Creatives transformed our brand completely. The Shariah-compliant approach gave us confidence, and the results speak for themselves.",
      socialPlatform: "Twitter",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Fatima Hussain",
      company: "Al-Habib Traders",
      rating: 5,
      text: "Professional, creative, and ethical. They understood our vision and delivered beyond expectations. Our sales have tripled!",
      socialPlatform: "LinkedIn",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Omar Farooq",
      company: "Al-Zayaba Hajj",
      rating: 5,
      text: "Working with Yelvo was a game-changer. Their strategic approach to branding helped us compete with international agencies.",
      socialPlatform: "Instagram",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Aisha Khan",
      company: "Barakah Foods",
      rating: 5,
      text: "Finally, a creative agency that understands Islamic business values. The quality of work is world-class.",
      socialPlatform: "Instagram",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Ibrahim Malik",
      company: "Noor Academy",
      rating: 5,
      text: "From concept to execution, Yelvo delivered exceptional results. Our enrollment increased by 250% after the rebrand.",
      socialPlatform: "LinkedIn",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
    {
      name: "Mariam Siddiqui",
      company: "Halal Eats",
      rating: 5,
      text: "The best investment we made for our business. Professional, responsive, and truly dedicated to our success.",
      socialPlatform: "Twitter",
      socialLink: "https://twitter.com/yelvo_creatives",
    },
  ];

  return (
    <section className="max-w-[1280px] mx-auto flex flex-col items-center gap-[50px]">
      <div className="flex flex-col justify-center items-center gap-[8px]">
        <div className="flex justify-center items-center gap-[8px] w-fit px-[12px] py-[8px] bg-black rounded-full">
          <p className="text-[#FFFFFF] text-[14px] font-light leading-[14px]">
            Testimonials
          </p>
        </div>
        {/* Section Title */}
        <h2 className="text-center text-[40px] font-bold text-white">
          Client Feedback
        </h2>
        <p className="text-center text-[#B9B9B9] text-[18px] font-light leading-[27px]">
          Trusted by 100+ happy clients
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-full max-w-[350px] h-full min-h-[335px] p-[12px] rounded-[20px] flex flex-col gap-[14px] transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.02)",
            }}
          >
            <div
              className="flex flex-col p-[15px] gap-[10px] rounded-[22px]"
              style={{
                // backdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill="#FFDF00"
                    style={{ color: "#FFDF00" }}
                  />
                ))}
              </div>
              {/* Review Text */}
              <p className="text-[18px] leading-[24px] font-light text-[#B9B9B9]">
                {review.text}
              </p>
            </div>

            {/* Client Info */}
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-[10px]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6600 0%, #E69700 100%)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h6 className="text-[18px] font-normal leading-[24px] text-[#FFFFFF]">
                    {review.name}
                  </h6>
                  <p className="text-[14px] font-normal leading-[20px] text-[#B9B9B9]">
                    {review.company}
                  </p>
                </div>
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
          </div>
        ))}
      </div>
    </section>
  );
}
