import { Link } from "wouter";

export default function CtaSection() {
  return (
    <section className="bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Ready to Find Your Perfect GPU Resource?
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-100">
            Start your search today and find the resources you need within your budget.
          </p>
          <div className="mt-8">
            <Link href="#booking-section" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50">
              Start Searching Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
