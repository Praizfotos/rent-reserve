import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import RentReserveSection from "@/components/sections/RentReserveSection";
import FundGraduallySection from "@/components/sections/FundGraduallySection";
import RemindersSection from "@/components/sections/RemindersSection";
import EarlySettlementSection from "@/components/sections/EarlySettlementSection";
import BatchPaymentSection from "@/components/sections/BatchPaymentSection";
import LandlordSection from "@/components/sections/LandlordSection";
import AuthorizationSection from "@/components/sections/AuthorizationSection";
import StellarSection from "@/components/sections/StellarSection";
import EditorialQuote from "@/components/sections/EditorialQuote";
import LifecycleSection from "@/components/sections/LifecycleSection";
import FeatureRowsSection from "@/components/sections/FeatureRowsSection";
import SecuritySection from "@/components/sections/SecuritySection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <RentReserveSection />
        <FundGraduallySection />
        <RemindersSection />
        <EarlySettlementSection />
        <BatchPaymentSection />
        <LandlordSection />
        <AuthorizationSection />
        <StellarSection />
        <EditorialQuote />
        <LifecycleSection />
        <FeatureRowsSection />
        <SecuritySection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
