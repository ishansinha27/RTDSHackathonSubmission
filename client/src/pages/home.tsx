import Header from "@/components/header";
import ServiceFinderForm from "@/components/service-finder-form";
import ResultsSection from "@/components/results-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";
import { useState } from "react";
import { Resource } from "@/lib/types";
import { FormData } from "@/lib/form-schema";

export default function Home() {
  const [results, setResults] = useState<Resource[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setIsLoading(true);
    setError(null);
    setResults(null);
    
    fetch('/api/resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch resources');
        }
        return res.json();
      })
      .then(data => {
        setResults(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Find GPU Instances</span>
                  <span className="block text-primary">Within Your Budget</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Find and book the perfect GPU resources based on your budget and requirements. Specify your needs and discover the best options available.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#service-finder" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10">
                      Find Resources
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary/10 hover:bg-primary/20 md:py-4 md:text-lg md:px-10">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img 
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
            src="https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="GPU servers in a data center"
          />
        </div>
      </div>

      {/* Service finder section */}
      <div id="service-finder" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Resource Finder</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Find The Perfect GPU Resources
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Tell us your requirements and we'll match you with the best GPU resources within your budget.
            </p>
          </div>

          <ServiceFinderForm onSubmit={handleFormSubmit} />
          
          <ResultsSection 
            results={results} 
            isLoading={isLoading} 
            error={error} 
            formData={formData}
          />
        </div>
      </div>

      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
