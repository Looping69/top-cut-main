"use client";

import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import { IconQuote, IconStar, IconStarFilled } from "@tabler/icons-react";

const testimonials = [
  {
    id: 1,
    name: "Pieter van der Merwe",
    location: "Kuruman",
    rating: 5,
    date: "Maart 15, 2023",
    quote: "Baie dankie aan Ryno en sy span! Hulle het vinnig en veilig 'n groot boom naby my huis verwyder. Uitstekende diens!",
    service: "Hoë Risiko Boom Veldwerk",
  },
  {
    id: 2,
    name: "Annelie Botha",
    location: "Kathu",
    rating: 5,
    date: "Februarie 3, 2023",
    quote: "Ek is so tevrede met die netjiese snoeiwerk. Die span was vriendelik en professioneel. Sal hulle beslis aanbeveel!",
    service: "Boom Snoei",
  },
  {
    id: 3,
    name: "Jaco Steyn",
    location: "Kimberley",
    rating: 5,
    date: "April 22, 2023",
    quote: "Na 'n storm het Top Cut vinnig gereageer en die gevalle bome veilig verwyder. Baie dankie vir julle puik diens!",
    service: "Nooddiens",
  },
  {
    id: 4,
    name: "Marlene du Plessis",
    location: "Kuruman",
    rating: 5,
    date: "Januarie 17, 2023",
    quote: "Ryno en sy manne het my ou palmboom perfek gesnoei. Hulle het alles mooi skoon agtergelaat. Baie professioneel!",
    service: "Palmboom Versorging",
  },
  {
    id: 5,
    name: "Francois Smit",
    location: "Kathu",
    rating: 5,
    date: "Mei 9, 2023",
    quote: "Ek het Top Cut gebruik vir 'n moeilike boomverwydering. Hulle het alles veilig en vinnig gedoen. Baie dankie!",
    service: "Boomverwydering",
  },
  {
    id: 6,
    name: "Lize van Wyk",
    location: "Kimberley",
    rating: 5,
    date: "Junie 14, 2023",
    quote: "Puik diens en vriendelike span. My tuin lyk nou fantasties!",
    service: "Tuinonderhoud",
  },
  {
    id: 7,
    name: "Gert Pretorius",
    location: "Kuruman",
    rating: 5,
    date: "Julie 2, 2023",
    quote: "Hulle het vinnig gereageer toe ek 'n noodgeval gehad het. Sal hulle beslis weer gebruik!",
    service: "Nooddiens",
  },
  {
    id: 8,
    name: "Sonja Jacobs",
    location: "Kathu",
    rating: 5,
    date: "Augustus 11, 2023",
    quote: "Baie professioneel en netjies gewerk. Ek beveel Top Cut aan vir enige boomwerk!",
    service: "Boomwerk",
  },
 
];

export default function TestimonialsPage() {
  return (
    <>
      <div className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Customer Testimonials</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about our tree services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        i < testimonial.rating ? (
                          <IconStarFilled key={i} size={18} className="text-yellow-500" />
                        ) : (
                          <IconStar key={i} size={18} className="text-gray-300" />
                        )
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <IconQuote size={24} className="text-primary/20 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">
                      {testimonial.quote}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                    <span>Service: {testimonial.service}</span>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-green-light p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Experience Our Service?</h2>
              <p className="text-gray-600 mb-6">
                Join our growing list of satisfied customers. Contact us today for a free quote on your tree service needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/quote" className="btn-primary">
                  Get a Free Quote
                </a>
                <a href="/contact" className="btn-secondary">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      <CallToAction />
    </>
  );
} 