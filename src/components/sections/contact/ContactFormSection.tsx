"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import DynamicCard from "@/components/shared/DynamicCard";
import IconBox from "@/components/shared/IconBox";

const ContactFormSection = () => {
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

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white ml-1">
                  First name*
                </label>
                <input
                  type="text"
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
                placeholder="jane@framer.com"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white ml-1">
                  Where Are you from?*
                </label>
                <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white/50 focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer">
                  <option>Select your country...</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white ml-1">
                  What&apos;s the type of your company?*
                </label>
                <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white/50 focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer">
                  <option>Select Category</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white ml-1">
                Message*
              </label>
              <textarea
                rows={5}
                placeholder="Type your message..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white font-bold transition-all duration-300 transform active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(to bottom right, #00C7FE 5%, #0080FF 100%)",
                boxShadow: "0 4px 20px rgba(0, 128, 255, 0.4)",
              }}
            >
              Submit Now
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
