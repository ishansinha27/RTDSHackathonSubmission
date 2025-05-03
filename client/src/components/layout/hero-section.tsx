import { Link } from "wouter";

export default function HeroSection() {
  return (
    <div className="bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
              Find GPU Resources Within Your Budget
            </h1>
            <p className="mt-4 text-lg text-primary-100">
              No more searching through multiple providers. Find and book GPU resources based on your
              preferences instantly. Simply select your criteria and discover the perfect computing
              resource for your project.
            </p>
            <div className="mt-8">
              <Link href="#booking-section" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50">
                Find Resources Now
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="GPU computing hardware" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
