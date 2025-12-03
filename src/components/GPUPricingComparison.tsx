"use client";

import { useEffect, useRef, useState } from "react";

function useReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -20% 0px", threshold: 0.1 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return { ref, visible };
}

const MarginVariable = 1.5;

type GridPricing = {
    monthly: string | number;
    perInstance: string;
    avgStartupUse: string;
};

type ProviderPricing = {
    monthly: string;
    config: string;
    perInstance: string;
};

type DatabasePricing = {
    grid: GridPricing;
    aws: ProviderPricing;
    gcp: ProviderPricing;
    digitalOcean: ProviderPricing;
};

type DatabaseType = {
    name: string;
    pricing: DatabasePricing;
};

export default function GPUPricingComparison() {
    const titleRef = useReveal<HTMLHeadingElement>();
    const subtitleRef = useReveal<HTMLParagraphElement>();
    const tableRef = useReveal<HTMLDivElement>();

    const providers = [
        { 
            name: "Grid", 
            logo: "/favicon-new.png", 
            isHighlighted: true 
        },
        { 
            name: "AWS", 
            logo: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/6c0b7663-6409-4cfe-422d-7cb639625c00/public" 
        },
        { 
            name: "Google Cloud", 
            logo: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/45e56571-79de-4e74-b5d6-8d9395a92100/public" 
        },
        { 
            name: "DigitalOcean", 
            logo: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/3e5c77b6-ef02-4b15-502c-85e937f38400/public" 
        },
    ];

    const databases: DatabaseType[] = [
        {
            name: "PostgreSQL",
            pricing: {
                grid: {
                    monthly: 8*MarginVariable,
                    perInstance: "Per instance computation",
                    avgStartupUse: "Average use of startup",
                },
                aws: {
                    monthly: "$110",
                    config: "db.m6g.large (2 vCPUs, 8 GiB RAM), 100 GB GP3",
                    perInstance: "2 vCPUs dedicated",
                },
                gcp: {
                    monthly: "$130",
                    config: "N2-Standard-2 (2 vCPUs, 8 GB RAM), 100 GB SSD",
                    perInstance: "2 vCPUs dedicated",
                },
                digitalOcean: {
                    monthly: "$150",
                    config: "2 vCPUs Dedicadas, 8 GB RAM, 100 GB SSD",
                    perInstance: "2 vCPUs dedicated",
                },
            },
        },
        {
            name: "Valkey",
            pricing: {
                grid: {
                    monthly: 5.42*MarginVariable,
                    perInstance: "Per instance computation",
                    avgStartupUse: "Average use of startup",
                },
                aws: {
                    monthly: "$130",
                    config: "cache.r6g.large (2 vCPUs, 13.07 GiB RAM)",
                    perInstance: "2 vCPUs dedicated",
                },
                gcp: {
                    monthly: "$100",
                    config: "4 GB RAM, CPU dedicada",
                    perInstance: "CPU dedicada",
                },
                digitalOcean: {
                    monthly: "$60",
                    config: "2 vCPUs Dedicadas, 4 GB RAM",
                    perInstance: "2 vCPUs dedicated",
                },
            },
        },
    ];

    return (
        <section className="text-white w-[90%] mx-auto py-24 lg:py-32">
            {/* Title */}
            <h2
                ref={titleRef.ref}
                className={[
                    "font-semibold text-center mb-4",
                    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                    "px-4 sm:px-6 md:px-0",
                    "leading-tight sm:leading-snug md:leading-normal",
                    "opacity-0 transition-opacity duration-1000 ease-out",
                    titleRef.visible ? "opacity-100" : "",
                ].join(" ")}
            >
                Save thousands, pay per second
            </h2>

            {/* Subtitle */}
            <p
                ref={subtitleRef.ref}
                className={[
                    "subtitle text-center text-white/80 mb-16 max-w-2xl mx-auto",
                    "opacity-0 transition-opacity duration-1000 ease-out delay-200",
                    subtitleRef.visible ? "opacity-100" : "",
                ].join(" ")}
            >
                PostgreSQL & Valkey at Costs That Scale
            </p>

            {/* Comparison Table */}
            <div
                ref={tableRef.ref}
                className={[
                    "max-w-7xl mx-auto",
                    "opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300",
                    tableRef.visible ? "opacity-100 translate-y-0" : "",
                ].join(" ")}
            >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                    {/* Table Header */}
                    <div className="hidden lg:grid grid-cols-5 gap-4 p-6 border-b border-white/10 bg-white/5">
                        <div className="font-semibold text-lg">
                            Database Type
                        </div>
                        {providers.map((provider) => (
                            <div key={provider.name} className="text-center">
                                <div
                                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-2 overflow-hidden ${
                                        provider.isHighlighted
                                            ? "bg-primary/20 border border-primary/50"
                                            : "bg-white/10"
                                    }`}
                                >
                                    <img
                                        src={provider.logo}
                                        alt={provider.name}
                                        className="w-full h-full object-contain p-1"
                                    />
                                </div>
                                <div className="text-sm text-white/70">
                                    {provider.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Rows for each database */}
                    {databases.map((database, dbIndex) => (
                        <div
                            key={database.name}
                            className={dbIndex > 0 ? "border-t border-white/10" : ""}
                        >
                            {/* Database Name Row with generic Configuration */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 md:p-6 bg-white/2">
                                <div className="col-span-2 md:col-span-1 flex flex-col justify-center">
                                    <div className="font-semibold text-base md:text-lg mb-1">
                                        {database.name}
                                    </div>
                                    <div className="text-xs text-white/60">
                                        2 vCPUs, {database.name === "Valkey" ? "4 GB" : "8 GB"} RAM, 100 GB NVMe
                                    </div>
                                </div>
                                {providers.map((provider) => {
                                    // Map provider names to pricing keys
                                    const providerKeyMap: Record<string, keyof DatabasePricing> = {
                                        "grid": "grid",
                                        "aws": "aws",
                                        "google cloud": "gcp",
                                        "digitalocean": "digitalOcean",
                                    };
                                    const key = providerKeyMap[provider.name.toLowerCase()] || "grid";
                                    const pricing = database.pricing[key];
                                    const isGrid = key === "grid";

                                    return (
                                        <div
                                            key={provider.name}
                                            className={`text-center p-3 md:p-4 rounded-lg ${
                                                provider.isHighlighted
                                                    ? "bg-primary/20 text-white border border-primary/50"
                                                    : "bg-white/5"
                                            }`}
                                        >
                                            {/* Provider name/logo - visible on mobile, hidden on desktop */}
                                            <div className="md:hidden mb-2">
                                                <div
                                                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-1 overflow-hidden ${
                                                        provider.isHighlighted
                                                            ? "bg-primary/20 border border-primary/50"
                                                            : "bg-white/10"
                                                    }`}
                                                >
                                                    <img
                                                        src={provider.logo}
                                                        alt={provider.name}
                                                        className="w-full h-full object-contain p-1"
                                                    />
                                                </div>
                                                <div className="text-xs text-white/70 font-medium">
                                                    {provider.name}
                                                </div>
                                            </div>
                                            <div className="text-lg md:text-xl font-semibold text-white mb-1">
                                                {typeof pricing?.monthly === 'number' 
                                                    ? `$${pricing.monthly.toFixed(0)}` 
                                                    : pricing?.monthly || "N/A"}
                                            </div>
                                            <div className="text-xs text-white/60 mt-1 mb-2">
                                                Monthly
                                            </div>
                                            {isGrid && (
                                                <div className="space-y-1 mt-2">
                                                    <div className="text-xs text-white/70">
                                                        {(pricing as GridPricing).avgStartupUse}
                                                    </div>
                                                    <div className="text-xs text-white/70">
                                                        {pricing.perInstance}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

