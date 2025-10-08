import React, { useState } from "react";
import ContactFormModal from "./Form";
import ProviderDuo from "./Providers";
import Image from "next/image";



export default function Enterprise() {
  const [open, setOpen] = useState(false);


  const sendEmail = async () => {
    try {
      await fetch("/api/emailForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Asistencia tecnica",
          email: "benja.aguirre2599@gmail.com"
        }),
      });
      
    } catch (error) {
      
    }
  }


  return (
    <section className="grid">
      <svg
        viewBox="0 0 1230 1509"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMin"
        className="hidden lg:block absolute inset-0 h-full lg:w-full z-0 pointer-events-none select-none"
      >
        <defs>
          <linearGradient
            id="paint0_linear_1101_27"
            x1="1039.24"
            y1="-361.336"
            x2="1039.24"
            y2="1374.66"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0E0500" stopOpacity="0.1" />
            <stop offset="1" stopColor="#037050" />
          </linearGradient>
        </defs>

        <ellipse
          cx="1039.24"
          cy="506.664"
          rx="1153"
          ry="868"
          transform="rotate(-41.2191 1039.24 506.664)"
          fill="url(#paint0_linear_1101_27)"
        />
      </svg>

      <div className="bg-[#EDEDED]">
        <div className="grid grid-cols-1 lg:grid-cols-2 pb-4 lg:pb- max-w-7xl mx-auto lg:pt-16 lg:pl-4">
          {/* Texto */}
          <div className="flex flex-col lg:items-start items-center justify-center pt-16 pb-8 lg:pb-0 lg:pt-0">
            <div className="grid gap-4">
              <h1 className="title font-semibold tracking-wider">Enterprise</h1>
              <p className="subtitle">
                We help you migrate to DePIN with the
                <br /> best practices.
              </p>
              <div className="mt-4">
                <ContactFormModal
                  open={open}
                  onClose={() => setOpen(false)}
                  onSubmit={(data) => {
                    console.log("Form data", data);
                    setOpen(false);
                  }}
                />
                <button onClick={() => setOpen(true)} className="btn-primary">
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="overflow-hidden z-10">
            <ProviderDuo />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 mx-auto lg:grid-cols-2 py-16 max-w-7xl pt-16 lg:pt-32 w-full">
        <div className="flex flex-col mx-auto lg:items-start lg:justify-start font-semibold lg:w-full max-w-7xl lg:pl-4">
          <div className="space-y-0 text-3xl">
            <p>Enhance your cloud</p>
            <p>operations with</p>
            <p className="text-primary">decentralized cloud</p>
            <p className="text-primary">providers.</p>
          </div>

          <div className="mt-8 font-normal space-y-6">
            <p>CI/CD Pipelines</p>
            <p>Disaster recovery service</p>
            <p>Database</p>
            <p>Monitoring and Logging</p>
          </div>
        </div>
      </div>
    </section>
  );
}

