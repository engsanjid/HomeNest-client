import { ShieldCheck, Headphones, BadgeCheck, Home } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-4">
        Why Choose Us
      </h2>

      <p className="text-center text-gray-400 mb-12">
        Your trusted partner for finding the perfect home
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="bg-base-100 p-6 rounded-xl border border-gray-700/20 shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
          <ShieldCheck className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-xl font-semibold text-center mt-4">Verified Listings</h3>
          <p className="text-gray-400 text-center mt-2 text-sm">
            All properties are verified to ensure authenticity and accuracy.
          </p>
        </div>

      
        <div className="bg-base-100 p-6 rounded-xl border border-gray-700/20 shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
          <Home className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-xl font-semibold text-center mt-4">Best Properties</h3>
          <p className="text-gray-400 text-center mt-2 text-sm">
            Access high-quality real estate options across Bangladesh.
          </p>
        </div>

      
        <div className="bg-base-100 p-6 rounded-xl border border-gray-700/20 shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
          <Headphones className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-xl font-semibold text-center mt-4">24/7 Support</h3>
          <p className="text-gray-400 text-center mt-2 text-sm">
            Our support team is always available to assist you.
          </p>
        </div>

       
        <div className="bg-base-100 p-6 rounded-xl border border-gray-700/20 shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
          <BadgeCheck className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-xl font-semibold text-center mt-4">Trusted Agents</h3>
          <p className="text-gray-400 text-center mt-2 text-sm">
            Work with experienced and reliable real estate professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
