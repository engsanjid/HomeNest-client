import { Search, Home, Handshake } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search size={48} className="text-primary" />,
      title: "Find Your Property",
      desc: "Search from thousands of verified listings and choose what fits your needs.",
    },
    {
      icon: <Home size={48} className="text-primary" />,
      title: "Visit & Verify",
      desc: "Schedule visits, check details, and verify all information easily.",
    },
    {
      icon: <Handshake size={48} className="text-primary" />,
      title: "Buy or Rent Safely",
      desc: "Make secure deals with trusted agents and complete your dream journey.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-primary mb-4">
        How It Works
      </h2>
      <p className="text-center text-gray-400 mb-12">
        Three simple steps to find your perfect home
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-8 bg-base-100 border border-gray-700/30 rounded-2xl text-center
                       shadow-md hover:shadow-[0_8px_30px_rgba(138,180,255,0.25)]
                       transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-gray-400">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
