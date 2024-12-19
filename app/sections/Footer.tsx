import logo from "@/assets/logo.png";
import Image from "next/image";
import { FaTiktok } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-[#001E80] text-white text-sm py-10 text-center">
        <div className="container">

            {/* Logo */}
            <div className="inline-flex flex-col items-center">
              <Image src={logo} alt="logo" height={50} width={50} />
              <div className="md:flex flex-col mt-2">
                  <div className="text-white font-extrabold text-[24px] md:text-[32px]  mt-2">
                      <p>ThermoTech</p>
                      <p className="text-[16px] md:text-[20px] font-light uppercase tracking-[6px] md:tracking-[10px] ml-2 md:ml-3 mt-0.5 md:mt-2">Solutions</p>
                  </div>
    
              </div>
            </div>
            

            <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
                <a href="#">Accueil</a>
                <a href="#chauffage">Chauffage</a>
                <a href="#elec">Électricité</a>
                <a href="#testimonials">Temoignages</a>
                <a href="#faqs">FAQs</a>
                <a href="#contact">Contact</a>
            </nav>
            <div className=" flex justify-center gap-6 mt-6">
                <GrInstagram />
                <FaTiktok />          
            </div>
            <p className="mt-6">
                &copy; 2024 ThermoTech. 
            </p>
        </div>
    </footer>
  )
}

export default Footer
