"use client";
import Image from "next/image";
import { motion } from "framer-motion";
// assets
import vaillant from "@/assets/vaillant.png";
import bulex from "@/assets/blx.png";
import buderus from "@/assets/buderus.png";
import bosch from "@/assets/bosch.png";
import junkers from "@/assets/junkers.png";
import viessmann from "@/assets/viessmann.png";
import chaffoteaux from "@/assets/chaffoteaux.png";




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
                        src={vaillant} 
                        alt="vaillant"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={bulex} 
                        alt="bulex"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={bosch} 
                        alt="ariston"
                        className="logo-ticker-image" 
                    />
                    
                    <Image 
                        src={buderus} 
                        alt="buderus"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={junkers} 
                        alt="junkers"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={viessmann} 
                        alt="viessmann"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={chaffoteaux} 
                        alt="chaffoteaux"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={vaillant} 
                        alt="vaillant"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={bulex} 
                        alt="bulex"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={bosch} 
                        alt="bosch"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={buderus} 
                        alt="buderus"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={junkers} 
                        alt="junkers"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={viessmann} 
                        alt="viessmann"
                        className="logo-ticker-image" 
                    />
                    <Image 
                        src={chaffoteaux} 
                        alt="chaffoteaux"
                        className="logo-ticker-image" 
                    />
                    
                </motion.div>
            </div>
        </div>
    </div>
  )
}

