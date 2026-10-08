import { useEffect } from "react";
import { Hero } from "../components/Hero";
import { Trust } from "../components/Trust";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { WhyUs } from "../components/WhyUs";
import { Workshop } from "../components/Workshop";
import { Testimonials } from "../components/Testimonials";
import { Stats } from "../components/Stats";
import { Support } from "../components/Support";
import { CTA } from "../components/CTA";

export function Home() {
  useEffect(() => {
    document.title =
      "AppleDock — Apple Device Repair & Service in Thane | iPhone, MacBook, iPad";
  }, []);

  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <Process />
      <WhyUs />
      <Workshop />
      <Testimonials />
      <Stats />
      <Support />
      <CTA />
    </>
  );
}
