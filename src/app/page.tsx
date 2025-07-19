import React from "react";
import Hero from "@/components/Home/Hero";
import Work from "@/components/Home/work";
import TimeLine from "@/components/Home/timeline";
import Platform from "@/components/Home/platform";
import Portfolio from "@/components/Home/portfolio";
import Upgrade from "@/components/Home/upgrade";
import Perks from "@/components/Home/perks";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Safe Haven Locator - Help Lost Children & People Find Home",
  description:
    "A compassionate platform to help lost children, elderly people, and anyone who doesn't know their address find their way home safely. Emergency location sharing for family reunification.",
};

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full">
      <Hero />
      <Work />
      <TimeLine />
      <Platform />
      {/* <Portfolio /> */}
      {/* <Upgrade /> */}
      <Perks />
    </main>
  );
}
