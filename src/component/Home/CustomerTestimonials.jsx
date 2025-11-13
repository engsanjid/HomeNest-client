import { Star } from "lucide-react";

export default function CustomerTestimonials() {
  const testimonials = [
    {
      name: "Rahim Uddin",
      image: "https://i.pravatar.cc/100?img=12",
      review:
        "HomeNest থেকে স্বপ্নের বাড়ি পেয়েছি। সার্ভিস খুবই ভালো এবং একদম ঝামেলা-মুক্ত। Highly recommended!",
      rating: 5,
    },
    {
      name: "Sadia Islam",
      image: "https://i.pravatar.cc/100?img=23",
      review:
        "Property details খুব পরিষ্কার এবং verified ছিল। যোগাযোগও খুব সহজ ছিল।",
      rating: 4,
    },
    {
      name: "Jubayer Hasan",
      image: "https://i.pravatar.cc/100?img=32",
      review:
        "Featured properties দেখে বুক করেছিলাম — এক কথায় দুর্দান্ত অভিজ্ঞতা!",
      rating: 5,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-primary mb-4">
        What Our Customers Say
      </h2>
      <p className="text-center text-gray-400 mb-12">
        Thousands of users trust HomeNest every day
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-6 bg-base-100 border border-gray-700/30 rounded-2xl shadow-md 
                       hover:shadow-[0_8px_30px_rgba(138,180,255,0.25)] 
                       transition-all duration-300 hover:-translate-y-2"
          >
           
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full border border-primary/40"
              />
              <div>
                <h3 className="text-lg font-semibold">{t.name}</h3>

               
                <div className="flex text-yellow-400">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} size={18} fill="gold" stroke="gold" />
                  ))}
                </div>
              </div>
            </div>

            {/* Review text */}
            <p className="text-gray-400">{t.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
