"use client";
import Image from "next/image";
// Assets
import environnement from "@/assets/enviro.png";
import wallonie from "@/assets/wallo.png";
import React from "react";


export const Agregation = () => {
    return (
        <section className="bg-white py-24">
            <div className="container ">
                <div className="section-heading">
                    <h2 className="section-title-h3 mt-5">Agrée par Bruxelles Environnement et l&apos;Awac</h2>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                      <Image
                        src={environnement}
                        alt="Collaboration A"
                        objectFit="contain"
                        className="logo-agregation"
                      />
                    <Image
                      src={wallonie}
                      alt="Collaboration B"
                      objectFit="contain"
                      className="logo-agregation"
                    />
                </div>
            
            </div>
        </section>
    )
}