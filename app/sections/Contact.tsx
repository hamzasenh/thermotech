"use client";
import img from "@/assets/entretien.webp";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Contact = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white  to-[#D2DCFF] overflow-x-clip" id="contact">
        <div className="container">
            <div className="relative">
            
                <h2 className="section-title mt-5">Contactez-nous</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {/* Card for Phone Contact */}
                    <div className="relative group cta-card">
                        <Image
                            src={img}
                            alt="Contactez-nous par téléphone"
                            fill
                            className="cta-image object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-end text-white bg-[#183EC2] bg-opacity-40 p-4">
                            <h3 className="section-h3 mb-2">Contactez-nous par téléphone</h3>
                            <p className="text-sm text-center mb-4 ">Appelez-nous pour obtenir une assistance immédiate.</p>
                            <a
                                href="tel:+32489745620"
                                className="btn btn-primary gap-2"
                            >
                                <FaPhoneAlt /> 048957893
                            </a>
                        </div>
                    </div>

                    {/* Card for Email Contact */}
                    <div className="relative group cta-card">
                        <Image
                            src={img}
                            alt="Contactez-nous par email"
                            fill
                            className="cta-image object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-end text-white bg-[#183EC2] bg-opacity-30 p-4">
                            <h3 className="section-h3 mb-2">Contactez-nous par e-mail</h3>
                            <p className="text-sm text-center mb-4">Envoyez-nous un e-mail et nous vous répondrons rapidement.</p>
                            <a
                                className="btn btn-primary gap-2"
                                href="mailto:hamzasenhaji0@gmail.com"
                            >
                                Écrivez-nous
                                <BsArrowRight className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
