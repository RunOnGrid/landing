import NavBar from "@/components/Navbar";
import Enterprise from "@/components/Enterprise";
import Footer from "@/components/Footer";
import SolutionsPicker from "@/components/SolutionsShowcase";
import WhyChooseGrid from "@/components/WhyChooseUs";
import TrustedPartners from "@/components/TrustedPartners";

export default function Home() {
  return (
    <>
      <div className="bg-foreground mx-auto max-w-screen">
        <NavBar />
        <Enterprise />
        <SolutionsPicker />
        <WhyChooseGrid />
        <TrustedPartners />
        <Footer />
      </div>
    </>
  );
}
