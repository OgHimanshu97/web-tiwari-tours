"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "The Innova Crysta was spotless and the driver was extremely polite. Made our Ayodhya trip very comfortable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Amit Sharma",
    role: "Business Owner",
  },
  {
    text: "Booked a Tempo Traveller for our family pilgrimage. Everything was on time and the pricing was transparent.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Priya Gupta",
    role: "Home Maker",
  },
  {
    text: "Best car rental service in Ayodhya. Their Fortuner is well-maintained and perfect for VIP guests.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Vikram Singh",
    role: "Event Planner",
  },
  {
    text: "Reliable and professional. The 24/7 support helped us when we had a late-night flight.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Sanjay Verma",
    role: "Software Engineer",
  },
  {
    text: "Luxury fleet at reasonable prices. The glassmorphic website feel matches their service quality!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Anjali Rao",
    role: "Travel Blogger",
  },
  {
    text: "Smooth booking experience. The driver knew all the best routes in Lucknow and Ayodhya.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Rohan Mehra",
    role: "Corporate Executive",
  },
  {
    text: "Highly recommend Tiwari Travels for anyone visiting the Ram Mandir. Very respectful and helpful staff.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Sunita Devi",
    role: "Retired Teacher",
  },
  {
    text: "The 17-seater traveller was perfect for our group. Spacious, clean, and very safe.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Deepak Kumar",
    role: "Tour Guide",
  },
  {
    text: "Excellent experience from start to finish. Truly 'Safar Aapka, Zimmedari Hamari'.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Karan Malhotra",
    role: "Marketing Head",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative" id="testimonials">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-primary/20 py-1 px-4 rounded-lg text-primary text-sm font-medium uppercase tracking-wider">
              Testimonials
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5 text-center text-foreground">
            What our customers say
          </h2>
          <p className="text-center mt-5 opacity-75 text-foreground/70">
            Real experiences from travelers who chose Tiwari Tour & Travels for their journeys across India.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};
