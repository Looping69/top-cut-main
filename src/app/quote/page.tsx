"use client";

import { Container } from "@/components/Container";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export default function QuotePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSubmitting(false);

      // Increment the job counter in localStorage
      const currentCount = parseInt(localStorage.getItem('jobCounter') || '895');
      localStorage.setItem('jobCounter', (currentCount + 1).toString());

      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };

  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Request a Free Quote</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to request a free, no-obligation quote for our professional outdoor and garden services. We&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <IconCheck size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Quote Request Received!</h3>
                <p className="text-green-700 mb-4">
                  Thank you for your quote request. We&apos;ll review your details and get back to you within 24 hours with a free estimate.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-primary"
                >
                  Request Another Quote
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                    Service Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Street address where service is needed"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="province" className="block text-gray-700 font-medium mb-2">
                      Province*
                    </label>
                    <input
                      type="text"
                      id="province"
                      name="province"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">
                      Postal Code*
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="serviceType" className="block text-gray-700 font-medium mb-2">
                    Service Type*
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select a Service</option>
                    <option value="tree-felling">Tree Felling</option>
                    <option value="greenhouse">Greenhouse & Trees</option>
                    <option value="composting">Composting & Soil</option>
                    <option value="chips-bark">Chips & Bark</option>
                    <option value="wood-sales">Wood Sales</option>
                    <option value="pest-weed-control">Pest & Weed Control</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="projectDetails" className="block text-gray-700 font-medium mb-2">
                    Project Details*
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Please describe your project in detail. Include information about the number of trees, their size, and any specific requirements."
                    required
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Preferred Contact Method*
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="contactMethod" value="email" className="mr-2" required />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="contactMethod" value="phone" className="mr-2" />
                      Phone
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="contactMethod" value="whatsapp" className="mr-2" />
                      WhatsApp
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </form>
            )}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-gray-600 mb-4">
              For emergency services or if you prefer to speak with someone directly:
            </p>
            <a href="tel:+27788747327" className="text-primary font-bold text-lg hover:underline">
              +27 78 874 7327
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
} 