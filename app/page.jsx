"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import Home from "@/sections/Home";
import About from "@/sections/About";
import Structure from "@/sections/Structure";
import Timeline from "@/sections/Timeline";
import Rules from "@/sections/Rules";
import Partners from "@/sections/Partners";
import Team from "@/sections/Team";
import Footer from "@/components/Footer";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("loaderDone")) {
        setLoading(false);
      }
    } catch {
      // sessionStorage may be unavailable in some browsers/contexts
    }
  }, []);

  const handleDone = useCallback(() => {
    try {
      sessionStorage.setItem("loaderDone", "1");
    } catch {
      // sessionStorage may be unavailable in some browsers/contexts
    }
    setLoading(false);
  }, []);

  if (loading) return <Loader onDone={handleDone} />;

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="font-inter">
        <Home />
        <div className="site-sections">
          <About />
          <Structure />
          <Timeline />
          <Rules />
          <Partners />
          <Team />
        </div>
      </main>
      <Footer />
    </>
  );
}
