"use client";
import { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";

import installation from "@/assets/installation.jpg";
import repair from "@/assets/repair.jpg";
import entretien from "@/assets/entretien.png";
import { FaPlus } from "react-icons/fa";
import chauffage from "@/assets/chauffage.png";
import ramonage from "@/assets/ramonage.jpg";


interface Service {
  title: string;
  titleModal: string;
  description: string;
  imageUrl: StaticImageData;
  imageAlt: string;
  price?: string; // Nouveau champ ajouté
}

// Données des services
const servicesData: Service[] = [
  {
    title: "Installation",
    titleModal: "Installation de Chauffage",
    description:
      "Nous vous accompagnons dans l’installation de systèmes de chauffage performants et adaptés à vos besoins énergétiques. Qu'il s'agisse de chaudières à condensation, de pompes à chaleur, ou de systèmes de chauffage central, notre équipe de techniciens qualifiés assure une pose professionnelle et conforme aux normes les plus strictes. Profitez d’un confort optimal tout en maîtrisant votre consommation énergétique grâce à des solutions modernes et éco-responsables.",
    imageUrl: installation, 
    imageAlt: "Installation",
  },
  {
    title: "Réparation",
    titleModal: "Dépannage et réparation de chaudière",
    description:
      "Une panne de chauffage ? Nos experts interviennent rapidement pour diagnostiquer et réparer tous types de systèmes, qu’il s’agisse de chaudières, de radiateurs, ou d’autres équipements de chauffage. Nous vous garantissons un service réactif et efficace pour rétablir la chaleur et le confort dans votre espace, avec des solutions durables et sécurisées. Grâce à notre expertise, nous assurons des interventions de qualité pour résoudre vos problèmes de chauffage en toute sérénité.",
    imageUrl: repair,
    imageAlt: "Réparation",
  },
  {
    title: "Entretien",
    titleModal: "Entretien de chaudière",
    description:
    "Un bon entretien de votre système de chauffage est essentiel pour garantir son bon fonctionnement, sa durabilité et votre sécurité. Nos techniciens agrées se chargent de l’entretien de vos chaudières, radiateurs et autres équipements, en réalisant les vérifications, réglages et le nettoyage nécessaire. En choisissant un entretien régulier, vous optimisez les performances de votre installation, réduisez les risques de pannes, et assurez une consommation énergétique plus économique.",
    imageUrl: entretien, 
    imageAlt: "Entretien",
    price: "145 euros", // Nouveau champ ajouté
  },
  {
    title: "Ramonage",
    titleModal: "Ramonage de cheminée",
    description:
    "Le ramonage est essentiel pour assurer la sécurité et le bon fonctionnement de votre cheminée. Notre équipe propose un service professionnel pour nettoyer et entretenir vos cheminées, conduits de chaudières. En effectuant un ramonage régulier, vous réduisez les risques d'incendie, améliorez les performances de votre système et respectez les obligations légales en matière d'entretien des conduits.",
    imageUrl: ramonage,
    imageAlt: "Ramonage",
  },
];

// Modal Component
interface ModalProps {
  service: Service | null;
  onClose: () => void;
}

const Modal = ({ service, onClose }: ModalProps) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
        <div className="flex justify-end mb-4">
          <button 
            onClick={onClose} 
            className="text-2xl font-bold text-black rotate-45"
            aria-label="Fermer le modal"
          >
            <FaPlus />
          </button>
        </div>
        

        <div className="flex flex-col md:flex-row md:items-start md:space-x-6 space-y-6 md:space-y-0">
          <div className="md:w-1/2 w-full">
            <Image 
              src={service.imageUrl} 
              alt={service.imageAlt} 
              className="w-full h-auto object-cover rounded-lg " 
            />
          </div>

          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl md:text-[54px] md:leading-[60px] mb-3 font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
              {service.titleModal}
            </h2>
                  {/* Ajout du prix */}
                  {service.price && (
              <p className="text-xl font-semibold text-gray-700 mb-4">
                À partir de {service.price}
              </p>
            )}
            <p>{service.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServiceShowcase = () => {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip" id="chauffage">
      <div className="container">
        <div className="section-heading text-center">
          <Image
            src={chauffage}
            alt="Service Icon"
            className="service-icon"
            width={70}
          />
          <h2 className="section-title mt-5">
            Nos 4 services de chauffage
          </h2>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-lg h-80"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={service.imageUrl}
                alt={service.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
                <button
                  onClick={() => openModal(service)}
                  className="btn btn-primary gap-1"
                >
                  {service.title}
                  <BsArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {isModalOpen && selectedService && (
        <Modal service={selectedService} onClose={closeModal} />
      )}
    </section>
  );
};
