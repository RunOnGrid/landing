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
      <div className="container-homePrincipal">
        <NavBar />

        <Banner
          title="Just focus on building."
          subtitle="Grid simplifies the deployment of your applications to a decentralized cloud, allowing you to get started with just a few clicks."
          subtitle2="Build, connect, deploy."
        />

        <BestFeatures />
        <DeployChoice />
        <InfoLanding />
        <Footer />
      </div>
    </>
  );
}
