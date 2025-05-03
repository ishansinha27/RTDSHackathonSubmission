import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/layout/hero-section";
import GpuSearchForm from "@/components/form/gpu-search-form";
import FeaturesSection from "@/components/sections/features-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import CtaSection from "@/components/sections/cta-section";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ResourceCard } from "@/components/ui/resource-card";
import { Loader2 } from "lucide-react";

export type FormData = {
  region: string;
  budget: number;
  operatingSystem: string;
  usageHours: number;
};

export type GpuResource = {
  id: number;
  country: string;
  operating_system: string;
  resource_class: string;
  resource_name: string;
  vcpus: number;
  ram: number;
  price_per_hour: number;
  price_per_month: number;
  price_per_spot?: number;
  currency: string;
  is_gpu: number;
  is_spot: number;
  resource: string;
  resource_type: string;
  region: string;
  gpu_description: string;
  is_public: number;
};

export default function Home() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData | null>(null);
  
  const { data, isLoading, isError, error } = useQuery<{ data: GpuResource[] }>({
    queryKey: [
      formData 
        ? `/api/resources?region=${formData.region}&budget=${formData.budget}&os=${formData.operatingSystem}&hours=${formData.usageHours}`
        : null
    ],
    enabled: !!formData
  });

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    toast({
      title: "Search started",
      description: "Looking for GPU resources that match your criteria...",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section id="booking-section" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Resource Finder</h2>
              <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
                Find The Perfect Resource
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Tell us what you're looking for and we'll match you with the best GPU resources available.
              </p>
            </div>

            <div className="mt-12 max-w-3xl mx-auto">
              <GpuSearchForm onSubmit={handleFormSubmit} />
            </div>

            {formData && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Available Resources</h3>
                
                {isLoading && (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
                    <p className="ml-3 text-lg text-gray-600">Finding the best resources for you...</p>
                  </div>
                )}
                
                {isError && (
                  <div className="bg-red-50 p-8 rounded-lg shadow-sm border border-red-200">
                    <div className="flex">
                      <div className="text-red-400 text-xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-red-800">Something went wrong</h4>
                        <p className="text-red-600 mt-1">
                          {error instanceof Error ? error.message : "We couldn't process your request. Please try again later."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {data && data.data && data.data.length === 0 && (
                  <div className="bg-white p-8 rounded-lg shadow text-center">
                    <div className="text-gray-400 text-5xl mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700">No resources found</h4>
                    <p className="text-gray-500 mt-2">Try adjusting your budget or other criteria to find available resources.</p>
                  </div>
                )}
                
                {data && data.data && data.data.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.data.map((resource, index) => (
                      <ResourceCard 
                        key={resource.id || `resource-${index}`} 
                        resource={resource} 
                        usageHours={formData.usageHours}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
}
