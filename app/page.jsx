"use client";

import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Home from "@/sections/Home";
import About from "@/sections/About";
import Structure from "@/sections/Structure";
import Workshops from "@/sections/Workshops";
import Timeline from "@/sections/Timeline";
import Rules from "@/sections/Rules";
import Team from "@/sections/Team";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="font-inter">
        <Home />
        <div className="site-sections">
          <About />
          <Structure />
          <Workshops />
          <Timeline />
          <Rules />
          <Team />
        </div>
      </main>
      <Footer />
    </>
  );
}
