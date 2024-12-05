"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const faqs = [
    {
        id: 1,
        question: "Comment obtenir un devis pour l'installation d'une nouvelle chaudière ?",
        answer: "Pour obtenir un devis pour l’installation d’une nouvelle chaudière, il vous suffit de nous contacter par email ou par appel téléphonique. Nous vous fournissons un devis détaillé, que ce soit pour une chaudière au gaz ou au mazout."
    },
    {
        id: 2,
        question: "Sur quelles chaudières intervenez-vous ?",
        answer: "Nos chauffagistes interviennent sur tout type de chaudières au gaz et au mazout, quelle que soit la marque : Bosch, Bulex, Vaillant, Viessmann, etc."
    },
    {
        id: 3,
        question: "Quel est le type de chaudières que vous prenez en charge ?",
        answer: "Nos chauffagistes installent une large gamme de chaudières pour répondre à vos besoins en chauffage, y compris des chaudières à condensation ou au gaz. Nous vous conseillons également sur la meilleure marque et le type d’équipement adapté à votre habitation."
    },
    {
        id: 4,
        question: "Quel est le meilleur moment pour faire l'entretien de ma chaudière ?",
        answer: "Il est recommandé de faire l’entretien de votre chaudière au gaz tous les deux ans et de votre chaudière au mazout chaque année. Nos chauffagistes vous conseillent de planifier un RDV avant l’hiver pour vous assurer que votre système est prêt à fonctionner de manière optimale tout au long de la saison froide."
    },
    {
        id: 5,
        question: "Quand remplacer votre chaudière ?",
        answer: "La durée de vie d’une chaudière est de plus ou moins 15 ans. Nous vous conseillons donc de réfléchir à remplacer votre chaudière si elle a plus de 12 à 15 ans. Néanmoins, si vous ne possédez pas encore de chaudière à condensation actuellement, n’hésitez pas à remplacer votre système dès maintenant."
    },
];

export const Faqs = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="py-24" id="faqs">
        <div className="container">
            <div className="section-heading">
                <h2 className="section-title mt-5">FAQs</h2>
            </div>

            <div className="mt-10 flex flex-col gap-6 max-w-xl mx-auto">
                {faqs.map((faq) => (
                    <div 
                        key={faq.id}
                        className="bg-white border border-[#222222]/10 p-6 rounded-3xl shadow-[0_7px_14px_#EAEAEA]"
                    >
                        <div 
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setSelectedIndex(faq.id)}
                        >
                            <h3 className="font-bold">{faq.question}</h3>
                            <FaPlus className={twMerge(
                                    "text-[#222222] flex-shrink-0 transition duration-300", 
                                    selectedIndex === faq.id && "rotate-45"
                                )} 
                            />
                        </div>

                        <AnimatePresence>
                            {selectedIndex === faq.id && (
                                <motion.div
                                    initial={{
                                        height: 0,
                                        marginTop: 0,
                                    }}
                                    animate={{
                                        height: "auto",
                                        marginTop: 24,
                                    }}
                                    exit={{
                                        height: 0,
                                        marginTop: 0,
                                    }} 
                                    className={twMerge("mt-6 overflow-hidden")}
                                >
                                    <p className="text-gray-900">
                                        {faq.answer}
                                    </p>    
                                </motion.div>    
                            )}    
                        </AnimatePresence>
                        
                        
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}