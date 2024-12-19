"use client";
import {motion} from "framer-motion";
// icons
import { BsArrowRight } from "react-icons/bs";
// Assets
import boiler from "@/assets/boiler.png";
import { useRef } from "react";

const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
};

export const Hero = () => {

    const heroRef = useRef(null);


  return (
    <section ref={heroRef} className="pt-8 pb-20 md:pt-5 md:pb-10" id="hero">
      <div className="container">
        <div className="md:flex items-center">
            <div className="md:w-[478px]">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
                    Besoin d’une intervention en chauffage ou électricité ?
                </h1>
                <p className="text-xl text-[#010D3E] tracking-tight mt-6">
                    Relax… faites confiance à ThermoTech. Nous vous envoyons rapidement nos professionels
                    qualifiés, sympathiques et à un prix honnête.
                </p>
                <div className="flex flex-col gap-2 items-start mt-[30px] md:flex-row md:gap-1">
                    <button
                        className="btn btn-primary"
                        onClick={() => scrollToSection("contact")}
                    >
                        Demander une intervention
                    </button>
                    <button
                        className="btn btn-text gap-1"
                        onClick={() => scrollToSection("chauffage")}
                    >
                        <span>Nos services</span>
                        <BsArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative ">
                <motion.img
                    src={boiler.src} 
                    alt="cog image" 
                    className="md:absolute md:h-full md:w-auto md:max-w-none md:right-0 lg:right-0"
                    animate={{
                        translateY: [-30, 30]
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 3,
                        ease: "easeInOut",
                    }}
                />
                 
            </div>
        </div>
        
      </div>
    </section>
  );
};
