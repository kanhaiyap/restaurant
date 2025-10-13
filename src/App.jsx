import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import MenuSection from "./sections/MenuSection";
import ReservationSection from "./sections/ReservationSection";
import FeaturesNeon from "./sections/FeaturesNeon";
import StatsSection from "./sections/StatsSection";
import TechMarquee from "./sections/TechMarquee";
import ContactSection from "./sections/ContactSection";
import SpecialsSection from "./sections/SpecialsSection";
import { CartProvider } from "./context/CartContext"
import CartButton from "./components/CartButton"

export default function App() {
  return (
    <>
    
      <HeroSection />
      <TechMarquee />
      <AboutSection />
      <FeaturesNeon />
      <StatsSection />
      <SpecialsSection />
      <MenuSection />
      <ReservationSection />
      <ContactSection />
      <CartButton />
      



    </>
  );
}
