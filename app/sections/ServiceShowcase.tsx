"use client";
import { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { BsArrowRight } from "react-icons/bs";

// Importation des images (ces variables sont des objets StaticImageData)
import installation from "@/assets/installation.webp";
import repair from "@/assets/repair.webp";
import entretien from "@/assets/entretien.webp";
import { FaPlus } from "react-icons/fa";

// Définir le type `Service` pour refléter correctement l'utilisation des images importées
interface Service {
  title: string;
  titleModal: string;
  description: string;
  imageUrl: StaticImageData;  // StaticImageData est le type approprié ici
  imageAlt: string;
}

// Données des services
const servicesData: Service[] = [
  {
    title: "Installation",
    titleModal: "Installation de chaudière",
    description:
      "Besoin d’une nouvelle chaudière ? Faites confiance à Techno Tech et profitez d’un service professionnel pour l’installation de votre future chaudière par un de nos techniciens.",
    imageUrl: installation,  // L'importation ici est un objet StaticImageData
    imageAlt: "Installation",
  },
  {
    title: "Réparation",
    titleModal: "Dépannage et réparation de chaudière",
    description:
      "Votre chaudière est en panne? Techno Tech est là pour vous aider! Nous vous envoyons rapidement un chauffagiste agréé pour le dépannage de votre chaudière au gaz. Que vous ayez une installation récente ou plus ancienne, nous sommes votre partenaire de confiance en chauffage.",
    imageUrl: repair,  // L'importation ici est un objet StaticImageData
    imageAlt: "Réparation",
  },
  {
    title: "Entretien",
    titleModal: "Entretien de chaudière",
    description:
      "Il est temps de faire l‘entretien de votre chaudière ? Ne laissez pas le froid vous surprendre. Confiez l’entretien de votre chaudière à nos techniciens agréés. Avec Techno Tech, vous bénéficiez d’un service rapide et professionnel!",
    imageUrl: entretien,  // L'importation ici est un objet StaticImageData
    imageAlt: "Entretien",
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
        

        {/* Conteneur Flex pour image à gauche et texte à droite */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6 space-y-6 md:space-y-0">
          {/* Image avec largeur fixe et hauteur automatique */}
          <div className="md:w-1/2 w-full">
            <Image 
              src={service.imageUrl} 
              alt={service.imageAlt} 
              className="w-full h-auto object-cover rounded-lg " 
            />
          </div>

          {/* Texte (titre et description) à droite de l'image */}
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

// Main component with modal opening functionality
export const ServiceShowcase = () => {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);  // Fix ici : state peut être Service ou null

  const openModal = (service: Service) => {
    setSelectedService(service);  // Pas d'erreur ici, car selectedService peut être un Service ou null
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip" id="services">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title mt-5">
            Nos 3 services de chauffage
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {servicesData.map((service, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg h-100">
              <Image
                src={service.imageUrl}
                alt={service.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedService && (
        <Modal service={selectedService} onClose={closeModal} />
      )}
    </section>
  );
};
