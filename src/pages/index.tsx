import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import BestFeatures from "@/components/BestFeatures";
import DeployChoice from "@/components/DeployChoice";
import InfoLanding from "@/components/InfoLanding";
import NavBar from "@/components/Navbar";
import Enterprise from "@/components/Enterprise";

export default function OldComponents() {
  return (
    <>
      <div className="container-home">
        <NavBar
        logo="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d4e80dd3-61e5-4b44-2495-c2594875dc00/public"
        button="Enterprise"        
        />

        <div className="mx-auto">
          <Banner
            title="Just focus on building."
            subtitle="Grid is the database development platform. Scale your postgre and redis with just a few clicks."
            subtitle2="Deploy, scale."  
          />
          <BestFeatures />
          <DeployChoice />
          <InfoLanding />
        </div>
        <Footer 
        logo="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ca632650-5de1-46bd-88f4-03c847c04200/public"
        />
      </div>
    </>
  );
}
