import HeroSlider from "./HeroSlider";
import FeaturedRealEstate from "./FeaturedRealEstate";
import WhyChooseUs from "./WhyChooseUs";
import CustomerTestimonials from "./CustomerTestimonials";
import HowItWorks from "./HowItWorks";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <FeaturedRealEstate />
      <WhyChooseUs></WhyChooseUs>
      <CustomerTestimonials></CustomerTestimonials>
      <HowItWorks></HowItWorks>
    </div>
  );
}
