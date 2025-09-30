import NavBar from "@/components/Navbar";
import Enterprise from "@/components/Enterprise";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-foreground mx-auto max-w-screen">
        <NavBar />
        <Enterprise />
        <Footer />
      </div>
    </>
  );
}
