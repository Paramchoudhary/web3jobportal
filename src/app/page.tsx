"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { FeaturesSection } from "@/components/Features";
import GlobeVideo from "@/components/ui/GlobeVideo";
import ContactForm from "@/components/ContactForm";
import { Companies } from "@/components/Companies";
import Faq from "@/components/Faq";
import JobSection from "@/components/JobSection";

const Globe = dynamic(
  () => import("@/components/ui/Globe").then((m) => m.Globe),
  {
    ssr: false,
  }
);

const HomePage = () => {
  return (
    <>
      {/* <Globe /> */}
      <GlobeVideo />
      <JobSection />
      <Companies />
      <FeaturesSection />
      <Faq />
      <ContactForm />
    </>
  );
};

export default HomePage;
