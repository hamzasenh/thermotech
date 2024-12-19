"use client";
import { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";

import installation from "@/assets/installation_elec.jpg";
import repair from "@/assets/depannage_elec.webp";
import conformite from "@/assets/conformite.jpg";
import borne from "@/assets/borne.jpg";
import parlophone from "@/assets/parlophone.jpeg";
import videophone from "@/assets/videophone.jpg";
import { FaPlus } from "react-icons/fa";
import elec from "@/assets/elec.png";

interface Service {
  title: string;
  titleModal: string;
  description: string;
  imageUrl: StaticImageData;
  imageAlt: string;
}

// Données des services
const servicesData: Service[] = [
  {
    title: "Installation",
    titleModal: "Installation de l'électricité",
    description:
      "Nous réalisons des installations électriques sûres et conformes aux normes, adaptées aux besoins de votre logement ou de votre entreprise. Que ce soit pour une construction neuve, une rénovation ou un projet spécifique, notre équipe vous accompagne de la planification à la mise en service de votre installation. Profitez d’un réseau électrique fiable et optimisé pour garantir votre confort et votre sécurité au quotidien.",
    imageUrl: installation, 
    imageAlt: "Installation",
  },
  {
    title: "Dépannage",
    titleModal: "Dépannage électrique",
    description:
      "En cas de panne ou de dysfonctionnement électrique, notre équipe intervient rapidement pour diagnostiquer et résoudre le problème. Nous mettons notre expertise au service de dépannages efficaces, couvrant tous types de systèmes électriques. Qu’il s’agisse de pannes mineures ou de coupures de courant, nous sommes disponibles pour rétablir la sécurité et la fonctionnalité de votre réseau électrique.",
    imageUrl: repair,
    imageAlt: "Réparation",
  },
  {
    title: "Mise en conformité",
    titleModal: "Mise en conformité",
    description:
      "Assurez-vous que votre installation électrique respecte les dernières normes de sécurité grâce à notre service de mise en conformité. Nos experts vérifient l’ensemble de votre réseau, identifient les points à corriger et effectuent les travaux nécessaires.",
    imageUrl: conformite, 
    imageAlt: "conformite",
  },
  {
    title: "Borne de recharge",
    titleModal: "Installation de Bornes de Recharge",
    description:
      "Pour faciliter la recharge de vos véhicules électriques, nous proposons des solutions d’installation de bornes de recharge adaptées à vos besoins. Que ce soit pour une installation domestique, en entreprise, ou dans un parking, nous assurons une pose professionnelle et une intégration optimale de vos bornes. Profitez d’une solution de recharge rapide, efficace et sécurisée.",
    imageUrl: borne, 
    imageAlt: "borne electrique",
  },
  {
    title: "Parlophonie",
    titleModal: "Installation de parlophonie",
    description:
      "Améliorez l’accès et la communication dans votre bâtiment avec nos systèmes de parlophonie. Nous installons des solutions de parlophonie modernes et performantes, idéales pour les habitations, immeubles et entreprises. Ces systèmes de communication offrent un accès sécurisé et pratique pour vos visiteurs, tout en garantissant votre tranquillité.",
    imageUrl: parlophone, 
    imageAlt: "parlophone",
  },
  {
    title: "Vidéophonie",
    titleModal: "Installation de Vidéophonie",
    description:
      "Avec nos systèmes de vidéophonie, bénéficiez d’une surveillance visuelle et d’un contrôle d’accès renforcé pour votre bâtiment. Nous proposons l’installation de solutions de vidéophonie performantes et adaptées, vous permettant de voir et d’identifier vos visiteurs avant d’ouvrir. Ce service vous apporte une sécurité accrue pour vos locaux et une tranquillité d’esprit précieuse.",
    imageUrl: videophone, 
    imageAlt: "videophone",
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
            <p>{service.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServiceElecShowcase = () => {
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
    <section ref={sectionRef} className="bg-gradient-to-b from-[#D2DCFF] to-[#FFFFFF] py-24 overflow-x-clip" id="elec" >
      <div className="container">
        <div className="section-heading text-center">
          <Image
              src={elec} 
              alt="Service Icon" 
              className="service-icon"
              width={70} 
          />
          <h2 className="section-title mt-5">
            Nos services en électricité
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
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
