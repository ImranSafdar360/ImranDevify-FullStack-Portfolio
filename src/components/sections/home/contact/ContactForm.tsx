"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormValues = {
  fullName: string;
  email: string;
  company?: string;
  projectDetails: string;
  timeline: string;
  budget?: string;
};

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form data:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Soft Glow Background */}
      <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 -z-10 rounded-full" />

      <div className="bg-muted/40 backdrop-blur-sm border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Tell Me About Your Project
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed italic">
                Share a few details and I’ll get back to you with next steps,
                clarity, or honest feedback — even if we don’t end up working
                together.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Imran Safdar"
                      className={cn(
                        "rounded-[12px] bg-background/50 h-12 border-white/10 focus-visible:ring-primary/30",
                        errors.fullName && "border-destructive",
                      )}
                      {...register("fullName", {
                        required: "Name is required",
                      })}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="imran@example.com"
                      className={cn(
                        "rounded-[12px] bg-background/50 h-12 border-white/10 focus-visible:ring-primary/30",
                        errors.email && "border-destructive",
                      )}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company / Product{" "}
                    <span className="opacity-50 text-xs font-normal">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="company"
                    placeholder="Tech Startup"
                    className="rounded-[12px] bg-background/50 h-12 border-white/10 focus-visible:ring-primary/30"
                    {...register("company")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-sm font-medium">
                    Project timeline
                  </Label>
                  <select
                    id="timeline"
                    className={cn(
                      "w-full rounded-[12px] bg-background/50 h-12 border border-white/10 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em] bg-[right_1rem_center] bg-no-repeat",
                      errors.timeline && "border-destructive",
                    )}
                    {...register("timeline", {
                      required: "Please select a timeline",
                    })}
                  >
                    <option value="" disabled>
                      Select a timeline
                    </option>
                    <option value="ASAP" className="bg-background">
                      ASAP
                    </option>
                    <option value="2–4 weeks" className="bg-background">
                      2–4 weeks
                    </option>
                    <option value="1–3 months" className="bg-background">
                      1–3 months
                    </option>
                    <option value="Flexible" className="bg-background">
                      Flexible
                    </option>
                  </select>
                  {errors.timeline && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.timeline.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sm font-medium">
                    Budget range{" "}
                    <span className="opacity-50 text-xs font-normal">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="budget"
                    placeholder="$5k - $10k"
                    className="rounded-[12px] bg-background/50 h-12 border-white/10 focus-visible:ring-primary/30"
                    {...register("budget")}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="projectDetails"
                    className="text-sm font-medium"
                  >
                    What are you building?
                  </Label>
                  <Textarea
                    id="projectDetails"
                    placeholder="I need help with..."
                    className={cn(
                      "rounded-[12px] bg-background/50 min-h-[120px] border-white/10 focus-visible:ring-primary/30 py-3",
                      errors.projectDetails && "border-destructive",
                    )}
                    {...register("projectDetails", {
                      required: "Please share a bit more about your project",
                      minLength: {
                        value: 10,
                        message: "Please be a bit more descriptive",
                      },
                    })}
                  />
                  {errors.projectDetails && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.projectDetails.message}
                    </p>
                  )}
                </div>

                <div className="pt-4 space-y-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-full h-14 text-lg font-bold group bg-primary hover:bg-primary/90 transition-all font-sans"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  <div className="text-center text-xs text-muted-foreground italic font-medium">
                    No spam. No pressure. Just a real conversation.
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Message Sent!</h2>
              <p className="text-muted-foreground text-lg max-w-sm mx-auto italic leading-relaxed">
                Thanks for reaching out! I&apos;ve received your details and
                will get back to you within 24 hours.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSuccess(false)}
                className="rounded-full px-8 py-6 font-bold font-sans"
              >
                Send another message
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
