import NavBar from "@/components/Navbar";
import Enterprise from "@/components/Enterprise";
import Footer from "@/components/Footer";
import SolutionsPicker from "@/components/SolutionsShowcase";
import WhyChooseGrid from "@/components/WhyChooseUs";
import TrustedPartners from "@/components/TrustedPartners";
import ServicesSelect from "@/components/ServicesSelect";

export default function Home() {
  return (
    <>
      <div className="bg-foreground mx-auto max-w-screen">
        <NavBar
          logo="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/dbd067e8-885c-4520-1470-390da8ea6800/public"
          button="Contact us"
        />
        <Enterprise />
        <ServicesSelect />
        <SolutionsPicker />
        <WhyChooseGrid />
        <TrustedPartners />
        <Footer logo="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/101231d5-aba3-4fb5-4146-7f27d34c6000/public" />
      </div>
    </>
  );
}
