"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import DynamicCard from "@/components/shared/DynamicCard";
import IconBox from "@/components/shared/IconBox";

const ContactFormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    companyType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after some time
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        companyType: "",
        message: "",
      });
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <section
        id="contact-form"
        className="w-full max-w-[1240px] px-4 md:px-6 lg:px-0 py-20"
      >
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white">Message Sent!</h2>
          <p className="text-white/60 max-w-md">
            Thank you for reaching out. I&apos;ll get back to you as soon as
            possible.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-blue-500 font-semibold hover:underline"
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact-form"
      className="w-full max-w-[1240px] px-4 md:px-6 lg:px-0"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Contact Form */}
        <div className="flex-[2] bg-[#080808] p-6 md:p-10 rounded-[24px] border border-white/5 relative overflow-hidden">
          {/* Gradient Glow Line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: "30%",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(0, 199, 254, 0) 0%, rgba(0, 128, 255, 1) 50%, rgba(0, 199, 254, 0) 100%)",
            }}
          />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white ml-1">
                  First name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Jane"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white ml-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Smith"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white ml-1">
                How can we reach you?*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jane@framer.com"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white ml-1">
                  Where Are you from?*
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select your country...
                  </option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="PK">Pakistan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white ml-1">
                  What&apos;s the type of your company?*
                </label>
                <select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="SaaS">SaaS</option>
                  <option value="Agency">Agency</option>
                  <option value="Startup">Startup</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white ml-1">
                Message*
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Type your message..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl text-white font-bold transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
              style={{
                background:
                  "linear-gradient(to bottom right, #00C7FE 5%, #0080FF 100%)",
                boxShadow: "0 4px 20px rgba(0, 128, 255, 0.4)",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {
                isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit Now"
                ) /* No changes to submit button text */
              }
            </button>
          </form>
        </div>

        {/* Right: Info Cards */}
        <div className="flex-1 flex flex-col gap-6">
          <DynamicCard className="min-h-fit md:min-h-fit h-fit p-6 md:p-8 flex flex-col gap-6 max-w-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <IconBox icon={Mail} size="sm" />
                <span className="text-white font-bold text-lg">Email</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                24/7
              </span>
            </div>
            <p className="text-white/60 font-medium">help [at] Landin.com</p>
          </DynamicCard>

          <DynamicCard className="min-h-fit md:min-h-fit h-fit p-6 md:p-8 flex flex-col gap-6 max-w-none">
            <div className="flex items-center gap-4">
              <IconBox icon={Phone} size="sm" />
              <span className="text-white font-bold text-lg">Phone</span>
            </div>
            <p className="text-white/60 font-medium">+1 (717) 550-1675</p>
          </DynamicCard>

          <DynamicCard className="min-h-fit md:min-h-fit h-fit p-6 md:p-8 flex flex-col gap-6 max-w-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <IconBox icon={MapPin} size="sm" />
                <span className="text-white font-bold text-lg">Address</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                Remote
              </span>
            </div>
            <div className="text-white/60 font-medium leading-relaxed">
              California [CA], 90011
              <br />
              49th St. Los Angeles
              <br />
              United States
            </div>
          </DynamicCard>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
