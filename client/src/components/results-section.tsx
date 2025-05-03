import { Resource } from "@/lib/types";
import { FormData } from "@/lib/form-schema";
import ResourceCard from "./resource-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Search } from "lucide-react";

interface ResultsSectionProps {
  results: Resource[] | null;
  isLoading: boolean;
  error: string | null;
  formData: FormData | null;
}

export default function ResultsSection({
  results,
  isLoading,
  error,
  formData,
}: ResultsSectionProps) {
  if (!isLoading && !error && !results) {
    return null;
  }

  return (
    <div className="mt-10">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Results</h3>
      
      {/* Loading State */}
      {isLoading && (
        <div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          <p className="text-center text-gray-500">Finding the perfect resources for you...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Finding Resources</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Empty State */}
      {results && results.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No Resources Found</h3>
          <p className="mt-2 text-sm text-gray-500">
            We couldn't find any resources matching your criteria. Try adjusting your budget or other requirements.
          </p>
        </div>
      )}
      
      {/* Results State */}
      {results && results.length > 0 && formData && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {results.map((resource) => (
            <ResourceCard 
              key={resource.resource_name} 
              resource={resource}
              usageHours={formData.usageHours}
            />
          ))}
        </div>
      )}
    </div>
  );
}
