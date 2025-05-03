import { useState } from "react";
import { GpuResource } from "@/pages/home";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Microchip, Clock, AlertCircle, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ResourceCardProps = {
  resource: GpuResource;
  usageHours: number;
};

export function ResourceCard({ resource, usageHours }: ResourceCardProps) {
  const [showUnavailableDialog, setShowUnavailableDialog] = useState(false);
  const [showRequestSuccess, setShowRequestSuccess] = useState(false);
  const { toast } = useToast();
  
  // Determine if the resource is available
  const isUnavailable = resource.price_per_hour <= 0 || !resource.price_per_hour;
  
  const estimatedCost = isUnavailable 
    ? "N/A" 
    : `$${(resource.price_per_hour * usageHours).toFixed(2)}`;
    
  const hourlyRate = isUnavailable 
    ? "N/A" 
    : `$${typeof resource.price_per_hour === 'number' 
        ? resource.price_per_hour.toFixed(2) 
        : parseFloat(resource.price_per_hour).toFixed(2)}`;

  const handleBookNow = () => {
    if (isUnavailable) {
      setShowUnavailableDialog(true);
    } else {
      // Regular booking flow (not implemented)
      toast({
        title: "Booking Initiated",
        description: `You're booking ${resource.gpu_description} for ${usageHours} hours.`,
      });
    }
  };

  const handleRequest = () => {
    setShowUnavailableDialog(false);
    setShowRequestSuccess(true);
  };

  const handleRequestSuccessClose = () => {
    setShowRequestSuccess(false);
    toast({
      title: "Request Submitted",
      description: "We'll notify you when this GPU becomes available.",
    });
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-2xl text-primary">
              <Microchip />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                {resource.gpu_description || "GPU Instance"}
                {isUnavailable && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Unavailable
                  </span>
                )}
              </h3>
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
              <span className="font-medium text-gray-900">{hourlyRate}</span>
            </div>
            <div className="text-sm text-gray-600 flex justify-between font-bold">
              <span>Estimated Cost:</span>
              <span className={`font-medium ${isUnavailable ? 'text-gray-500' : 'text-primary'}`}>
                {estimatedCost}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Button 
              className="w-full"
              variant={isUnavailable ? "outline" : "default"}
              onClick={handleBookNow}
            >
              {isUnavailable ? "Request" : "Book Now"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Unavailable GPU Dialog */}
      <AlertDialog open={showUnavailableDialog} onOpenChange={setShowUnavailableDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              GPU Currently Unavailable
            </AlertDialogTitle>
            <AlertDialogDescription>
              This GPU instance ({resource.gpu_description}) is currently unavailable. 
              Would you like to be notified when it becomes available?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRequest}>
              Request Notification
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Request Success Dialog */}
      <AlertDialog open={showRequestSuccess} onOpenChange={setShowRequestSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Request Submitted
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your request has been submitted. We will notify you when this GPU becomes available.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleRequestSuccessClose}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
