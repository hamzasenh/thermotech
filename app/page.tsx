import { Contact } from "./sections/Contact";
import { Faqs } from "./sections/Faqs";
import Footer from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { LogoTicker } from "./sections/LogoTicker";
import { ServiceShowcase } from "./sections/ServiceShowcase";
import { Testimonials } from "./sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LogoTicker />
      <ServiceShowcase />
      <Testimonials />
      <Faqs />
      <Contact />
      <Footer />
    </>
    
  );
}
