"use client";

import { Container } from "@/components/Container";
import { IconCheck, IconLoader2, IconAlertCircle } from "@tabler/icons-react";
import { useState, useRef } from "react";
import { encoreFetch } from "@/lib/encore";

const SERVICE_TYPES = [
  "Tree Felling",
  "Tree Trimming / Crown Reduction",
  "Stump Grinding",
  "Palm Tree Services",
  "Land Clearing",
  "Emergency Tree Removal",
  "Tree Health Assessment",
  "General Garden Services",
  "Other",
];

export default function QuotePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const data = new FormData(e.currentTarget);
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string | undefined;
    const phone = data.get("phone") as string;
    const address = data.get("address") as string;
    const city = data.get("city") as string;
    const serviceType = data.get("serviceType") as string;
    const details = data.get("projectDetails") as string;

    const notes = `Service: ${serviceType}\nAddress: ${address}, ${city}\n\n${details}`;

    try {
      // Fetch service types to find the correct ID
      const serviceTypesRes = await encoreFetch("/service-types");
      const serviceTypes: { id: number; name: string }[] = serviceTypesRes?.service_types ?? [];

      // Find matching service type, or use first one as fallback (General)
      const matched = serviceTypes.find(st =>
        st.name.toLowerCase().includes(serviceType.toLowerCase().split(" ")[0])
      ) ?? serviceTypes[0];

      const service_type_id = matched?.id ?? 1;

      // Submit as appointment (status: 'quote') to the booking backend
      await encoreFetch("/appointments", {
        method: "POST",
        body: JSON.stringify({
          service_type_id,
          customer_name: `${firstName} ${lastName}`.trim(),
          customer_email: email || undefined,
          customer_phone: phone,
          start_time: new Date(Date.now() + 86400000).toISOString(), // next day placeholder
          notes,
        }),
      });

      setFormSubmitted(true);

      // Increment local counter for display purposes
      if (typeof window !== "undefined") {
        const current = parseInt(localStorage.getItem("jobCounter") || "895");
        localStorage.setItem("jobCounter", (current + 1).toString());
      }

      formRef.current?.reset();
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Request a Free Quote</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below. <strong>Email is optional</strong> — we can reach you via phone or WhatsApp.
              We&apos;ll get back to you within 24 hours.
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
                  Thank you! Your request is now in our system — Rhyno and the team will be in touch within 24 hours with a free estimate.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-primary"
                >
                  Request Another Quote
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
                    <IconAlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="firstName" name="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="lastName" name="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Cell / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input type="tel" id="phone" name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+27 78 000 0000"
                      required />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address <span className="text-gray-400 font-normal text-sm">(optional)</span>
                    </label>
                    <input type="email" id="email" name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Leave blank if phone-only" />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                    Service Address <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="address" name="address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Street address where service is needed"
                    required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="city" name="city"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required />
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-gray-700 font-medium mb-2">
                      Service Type <span className="text-red-500">*</span>
                    </label>
                    <select id="serviceType" name="serviceType"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required>
                      <option value="">Select a Service</option>
                      {SERVICE_TYPES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="projectDetails" className="block text-gray-700 font-medium mb-2">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <textarea id="projectDetails" name="projectDetails" rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your project. Include the number of trees, their size, access challenges, and any specific requirements."
                    required />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><IconLoader2 size={18} className="animate-spin" /> Submitting…</>
                  ) : (
                    "Submit Quote Request"
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-gray-600 mb-4">
              For emergency services or to speak directly with someone:
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