"use client";
import { motion } from "framer-motion";
// assets
import avatar1 from "@/assets/avatar-1.png";
import React from "react";


const testimonials = [
  {
    text: "Un grand merci à l'équipe pour l'installation de notre nouvelle chaudière. Travail propre, rapide et efficace. Les techniciens sont très professionnels !",
    imageSrc: avatar1.src,
    name: "Dominique Le Mouzer",
  },
  {
    text: "Je suis ravie du dépannage de ma chaudière en plein hiver. L'équipe est intervenue très vite et a réglé le problème en un rien de temps. Je recommande fortement !",
    name: "Sophie Leclercq",
  },
  {
    text: "Ils ont installé une borne de recharge pour ma voiture électrique et tout s'est passé parfaitement. Les explications étaient claires, et le service impeccable.",
    name: "Ekim Yildiz",
  },
  {
    text: "J'avais besoin d'une mise en conformité pour mon installation électrique. Résultat : travail soigné et dans les délais. Merci encore !",
    name: "Violette Boremans",
  },
  {
    text: "Super service pour le ramonage de ma cheminée. Très sympa et efficace, je referai appel à eux sans hésiter.",
    name: "Jean-Claude Mukendi",
  },
  {
    text: "Installation de chauffage au top ! L'équipe est très compétente et à l'écoute. Je suis vraiment satisfait de leur service.",
    name: "Omar Aït Yahia",
  },
  {
    text: "Service impeccable pour l'entretien de mes radiateurs. On voit qu'ils connaissent leur métier. Je recommande vivement !",
    name: "Aïcha Bensalem",
  },
  {
    text: "Travail soigné pour la réparation de mon système de chauffage. Très bonne communication, je suis vraiment content du résultat.",
    name: "Laurent Guillon",
  },
  {
    text: "Ils ont installé un système de vidéophonie chez moi, et tout fonctionne parfaitement. Très professionnels et disponibles.",
    name: "Emma Peel",
  }
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
          {props.testimonials.map(({ text, name}, testimonialIndex) => (
              <div className="card" key={testimonialIndex}>
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                      <div className="flex flex-col">
                          <div className="font-bold tracking-tight leading-5">{name}</div>
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