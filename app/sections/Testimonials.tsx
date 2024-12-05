"use client";
import Image from "next/image";
import { motion } from "framer-motion";
// assets
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import avatar8 from "@/assets/avatar-8.png";
import avatar9 from "@/assets/avatar-9.png";
import React from "react";


const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet. Aut sunt nihil qui eius voluptatem non dolorum voluptatem sit ipsam dolores sit nulla repudiandae sit odit enim ut ratione labore. Et delectus tenetur aut soluta ipsam et error provident vel quam repellendus vel explicabo laboriosam qui modi laboriosam.",
    imageSrc: avatar1.src,
    name: "Nom Prenom",
    username: "@nomprenom",
  },
  {
    text: "Lorem ipsum dolor sit amet. Aut sunt nihil qui eius voluptatem non dolorum voluptatem sit ipsam dolores sit nulla repudiandae sit odit enim ut ratione labore. Et delectus tenetur aut soluta ipsam et error provident vel quam repellendus vel explicabo laboriosam qui modi laboriosam.",
    imageSrc: avatar2.src,
    name: "Nom Prenom",
    username: "@nomprenom",
  },
  {
    text: "Lorem ipsum dolor sit amet. Aut sunt nihil qui eius voluptatem non dolorum voluptatem sit ipsam dolores sit nulla repudiandae sit odit enim ut ratione labore. Et delectus tenetur aut soluta ipsam et error provident vel quam repellendus vel explicabo laboriosam qui modi laboriosam.",
    imageSrc: avatar3.src,
    name: "Nom Prenom",
    username: "@nomprenom",
  },
  {
    text: "Lorem ipsum dolor sit amet. Aut sunt nihil qui eius voluptatem non dolorum voluptatem sit ipsam dolores sit nulla repudiandae sit odit enim ut ratione labore. Et delectus tenetur aut soluta ipsam et error provident vel quam repellendus vel explicabo laboriosam qui modi laboriosam.",
    imageSrc: avatar4.src,
    name: "Nom Prenom",
    username: "@nomprenom",
  },
  {
    text: "Lorem ipsum dolor sit amet. Aut sunt nihil qui eius voluptatem non dolorum voluptatem sit ipsam dolores sit nulla repudiandae sit odit enim ut ratione labore. Et delectus tenetur aut soluta ipsam et error provident vel quam repellendus vel explicabo laboriosam qui modi laboriosam.",
    imageSrc: avatar5.src,
    name: "Nom Prenom",
    username: "@nomprenom",
  },
  {
    text: "Lorem ipsum dolor sit amet. Aut sunt nihil qui eius voluptatem non dolorum voluptatem sit ipsam dolores sit nulla repudiandae sit odit enim ut ratione labore. Et delectus tenetur aut soluta ipsam et error provident vel quam repellendus vel explicabo laboriosam qui modi laboriosam.",
    imageSrc: avatar6.src,
    name: "Nom Prenom",
    username: "@nomprenom",
  },
  {
    text: "Lorem ipsum dolor sit amet. Aut sunt nihil qui eius voluptatem non dolorum voluptatem sit ipsam dolores sit nulla repudiandae sit odit enim ut ratione labore. Et delectus tenetur aut soluta ipsam et error provident vel quam repellendus vel explicabo laboriosam qui modi laboriosam.",
    imageSrc: avatar7.src,
    name: "Nom Prenom",
    username: "@nomprenom",
  },
  {
    text: "Lorem ipsum dolor sit amet. Aut sunt nihil qui eius voluptatem non dolorum voluptatem sit ipsam dolores sit nulla repudiandae sit odit enim ut ratione labore. Et delectus tenetur aut soluta ipsam et error provident vel quam repellendus vel explicabo laboriosam qui modi laboriosam.",
    imageSrc: avatar8.src,
    name: "Nom Prenom",
    username: "@nomprenom",
  },
  {
    text: "Lorem ipsum dolor sit amet. Aut sunt nihil qui eius voluptatem non dolorum voluptatem sit ipsam dolores sit nulla repudiandae sit odit enim ut ratione labore. Et delectus tenetur aut soluta ipsam et error provident vel quam repellendus vel explicabo laboriosam qui modi laboriosam.",
    imageSrc: avatar9.src,
    name: "Nom Prenom",
    username: "@nomprenom",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: { 
  className?: string; 
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div 
      animate={{
        translateY: "-50%",
      }} 
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: 'linear',
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, imageSrc, name, username}, testimonialIndex) => (
              <div className="card" key={testimonialIndex}>
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                      <Image 
                          src={imageSrc} 
                          alt={name} 
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full" 
                      />
                      <div className="flex flex-col">
                          <div className="font-medium tracking-tight leading-5">{name}</div>
                          <div className="leading-5 tracking-tight">{username}</div>
                      </div>
                  </div>
              </div>
          ))}   
        </React.Fragment>
      ))};
           
    </motion.div>
  </div>
);

export const Testimonials = () => {
    return (
        <section className="bg-white py-24" id="testimonials">
            <div className="container">
                <div className="section-heading">
                    <h2 className="section-title mt-5">Témoignages</h2>
                </div>
                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">

                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn 
                        testimonials={secondColumn} 
                        className="hidden md:block" 
                        duration={19}
                    />
                    <TestimonialsColumn 
                        testimonials={thirdColumn} 
                        className="hidden lg:block"
                        duration={17} 
                    />
                    

                </div>
            </div>
        </section>
    )
}