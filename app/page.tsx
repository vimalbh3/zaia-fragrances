import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CollectionSection from "@/components/CollectionSection";
import FindYourTone from "@/components/FindYourTone";
import Philosophy from "@/components/Philosophy";
import BenefitsStrip from "@/components/BenefitsStrip";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ScentQuiz from "@/components/ScentQuiz";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <CollectionSection />
        <FindYourTone />
        <Philosophy />
        <BenefitsStrip />
        <Newsletter />
      </main>
      <Footer />
      <ScentQuiz />
    </>
  );
}
