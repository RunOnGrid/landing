import React, { useState } from "react";
import Image from "next/image";

/** ---- Datos del acordeón ---- */
const features = [
  {
    title: "CI/CD Pipelines",
    image:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/dab356e5-a20e-4c89-1587-3c4273228a00/public",
    content:
      "Automate deployments linking your repo and running pipelines on GitHub Actions, GitLab, CircleCI, or Jenkins. Push code → ship reliably with repeatable workflows.",
  },
  {
    title: "Disaster Recovery Service",
    image:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9255916e-eca5-45be-ca8c-3cbb73c47900/public",
    content:
      "Replicate workloads and data across decentralized providers. Failover policies, periodic snapshots, and restore runbooks to minimize downtime.",
  },
  {
    title: "Database",
    image:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/612a2de8-f6ca-4a6c-1091-24aac1bccf00/public",
    content:
      "Provision distributed databases with low-latency replicas and backups. Parameter presets for performance, security hardening, and cost control.",
  },
  {
    title: "Monitoring and Logging",
    image:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/85270954-60be-4d9c-1fba-e819065f7e00/public",
    content:
      "End-to-end visibility of services: metrics, traces, and logs in one place. Alerting policies and dashboards to quickly detect and resolve incidents.",
  },
] as const;

export const ServicesSelect = () => {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number>(0); // primer ítem abierto

  const active = features[openIndex] ?? features[0];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-32 py-16 px-4 lg:px-0 max-w-7xl w-full items-start lg:pt-32 mx-auto">
        {/* Columna izquierda: Acordeón */}
        <div className="flex flex-col lg:mx-auto lg:items-start lg:justify-start max-w-xl font-semibold lg:pl-4 mx-auto w-full">
          <div className="space-y-0 text-3xl mb-6">
            <p>Enhance your cloud</p>
            <p>operations with</p>
            <p className="text-primary">decentralized cloud</p>
            <p className="text-primary">providers.</p>
          </div>

          <div className="w-full divide-y divide-white/10 border-y border-white/10 ">
            {features.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between text-left text-lg font-medium"
                    aria-expanded={isOpen}
                    aria-controls={`feat-${idx}`}
                  >
                    <span>{item.title}</span>
                    <svg
                      className={`h-5 w-5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div>
                      <p
                        id={`feat-${idx}`}
                        className="mt-2 text-sm font-normal text-gray-600 dark:text-gray-300 pr-4 lg:pr-8"
                      >
                        {item.content}
                      </p>

                      {/* En mobile la imagen va debajo del texto */}
                      <div className="lg:hidden flex mt-8 rounded-xl p-0">
                        <Image
                          alt={`${item.title} illustration`}
                          src={item.image}
                          className="mx-auto"
                          height={250}
                          width={300}
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Columna derecha (solo lg+): Imagen del item activo */}
        <div className="hidden lg:flex w-full h-full items-end justify-start">
          <div className="w-full max-w-md rounded-2xl overflow-hidden">
            {/* Cambiamos la key para forzar fade-in cuando cambia el item */}
            <div
              key={openIndex}
              className="transition-opacity duration-300 opacity-100"
            >
              <Image
                alt={`${active.title} illustration`}
                src={active.image}
                width={720}
                height={560}
                className="w-96"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-center lg:mt-4">
        <button
          onClick={() => setOpen(true)}
          className="btn-primary px-6 py-3 text-sm rounded-full"
        >
          Contact Us
        </button>
      </div>
    </>
  );
};

export default ServicesSelect;
