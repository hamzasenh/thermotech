"use client";
import Image from "next/image";
import { motion } from "framer-motion";
// assets
import acme from "@/assets/logo-acme.png";
import quantum from "@/assets/logo-quantum.png";
import echo from "@/assets/logo-echo.png";
import celestia from "@/assets/logo-celestial.png"; 
import pulse from "@/assets/logo-pulse.png";
import apex from "@/assets/logo-apex.png";




export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
        <div className="container">
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
                <motion.div 
                    className="flex gap-14 flex-none pr-14"
                    animate={{
                        translateX: '-50%',
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                    }}
                >
                    <Image 
                        src={acme} 
                        alt="acme"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={quantum} 
                        alt="quantum"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={echo} 
                        alt="echo"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={celestia} 
                        alt="celestia"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={pulse} 
                        alt="pulse"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={apex} 
                        alt="apex"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={acme} 
                        alt="acme"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={quantum} 
                        alt="quantum"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={echo} 
                        alt="echo"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={celestia} 
                        alt="celestia"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={pulse} 
                        alt="pulse"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={apex} 
                        alt="apex"
                        className="logo-ticker-image" 
                    />
                </motion.div>
            </div>
        </div>
    </div>
  )
}

