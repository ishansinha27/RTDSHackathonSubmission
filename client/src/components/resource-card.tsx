import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import { Resource } from "@/lib/types";
import { FormData } from "@/lib/form-schema";

interface ResourceCardProps {
  resource: Resource;
  usageHours: number;
}

export default function ResourceCard({ resource, usageHours }: ResourceCardProps) {
  const hourlyTotal = usageHours * resource.price_per_hour;

  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">{resource.resource_name}</h3>
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            {resource.is_gpu ? 'GPU' : 'CPU'}
          </Badge>
        </div>
        <p className="mt-2 text-gray-600">{resource.gpu_description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <span className="text-sm text-gray-500">vCPUs</span>
            <p className="font-medium">{resource.vcpus}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">RAM</span>
            <p className="font-medium">{resource.ram} GB</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Price/Hour</span>
            <p className="font-medium">${resource.price_per_hour.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Total ({usageHours} hrs)</span>
            <p className="font-medium">${hourlyTotal.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full">
            <CalendarCheck className="mr-2 h-4 w-4" /> Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
