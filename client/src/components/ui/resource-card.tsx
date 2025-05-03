import { GpuResource } from "@/pages/home";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Microchip } from "lucide-react";

type ResourceCardProps = {
  resource: GpuResource;
  usageHours: number;
};

export function ResourceCard({ resource, usageHours }: ResourceCardProps) {
  const estimatedCost = (resource.price_per_hour * usageHours).toFixed(2);
  const hourlyRate = typeof resource.price_per_hour === 'number' 
    ? resource.price_per_hour.toFixed(2) 
    : parseFloat(resource.price_per_hour).toFixed(2);

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 text-2xl text-primary">
            <Microchip />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">{resource.gpu_description || "GPU Instance"}</h3>
            <p className="text-sm text-gray-500">{resource.resource_name}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-600 flex justify-between">
            <span>Class:</span>
            <span className="font-medium text-gray-900">{resource.resource_class || "Standard"}</span>
          </div>
          <div className="text-sm text-gray-600 flex justify-between">
            <span>vCPUs:</span>
            <span className="font-medium text-gray-900">{resource.vcpus}</span>
          </div>
          <div className="text-sm text-gray-600 flex justify-between">
            <span>RAM:</span>
            <span className="font-medium text-gray-900">{resource.ram}GB</span>
          </div>
          <div className="text-sm text-gray-600 flex justify-between">
            <span>OS:</span>
            <span className="font-medium text-gray-900">{resource.operating_system}</span>
          </div>
          <div className="text-sm text-gray-600 flex justify-between">
            <span>Hourly Rate:</span>
            <span className="font-medium text-gray-900">${hourlyRate}</span>
          </div>
          <div className="text-sm text-gray-600 flex justify-between font-bold">
            <span>Estimated Cost:</span>
            <span className="font-medium text-primary">${estimatedCost}</span>
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full">Book Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
