import FAQComponent from "@/components/FAQ";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/Process";
import Services from "@/components/Services";
import TestimonialSlider from "@/components/Testimonials";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <ProcessSection />
      <FAQComponent />
      <TestimonialSlider />
    </div>
  );
}
