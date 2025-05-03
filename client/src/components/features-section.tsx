import { Palette, PanelLeftOpen, BadgeDollarSign, Zap } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Discover why users choose our platform for their GPU resource needs.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <Palette className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Simple Search</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Find GPU resources without endless searching. Our platform lets you specify exactly what you need.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <PanelLeftOpen className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Detailed Information</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Get all the technical specs and pricing details you need to make an informed decision.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <BadgeDollarSign className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Budget Friendly</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Find services that match your exact budget. No surprises, no hidden fees.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Instant Results</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Get matched with GPU resources instantly. No waiting for callbacks or quotes.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
