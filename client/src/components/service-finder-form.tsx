import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formSchema, FormData } from "@/lib/form-schema";

interface ServiceFinderFormProps {
  onSubmit: (data: FormData) => void;
}

export default function ServiceFinderForm({ onSubmit }: ServiceFinderFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "",
      operatingSystem: "",
      budget: 0,
      usageHours: 0,
    },
  });

  const handleReset = () => {
    form.reset({
      region: "",
      operatingSystem: "",
      budget: 0,
      usageHours: 0,
    });
  };

  return (
    <div className="mt-10">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Resource Requirements</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please provide details about what GPU resources you need for your project.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Region</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="noida">Noida</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="operatingSystem"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Operating System</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an OS" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="windows">Windows</SelectItem>
                          <SelectItem value="linux">Linux</SelectItem>
                          <SelectItem value="macos">macOS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Budget (USD)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="500" 
                          min={0}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value === "" ? "0" : e.target.value;
                            field.onChange(Number(value));
                          }}
                          value={field.value === 0 ? "" : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usageHours"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Usage Hours</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="40" 
                          min={1}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value === "" ? "0" : e.target.value;
                            field.onChange(Number(value));
                          }}
                          value={field.value === 0 ? "" : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-5 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button type="submit">
                  Find Resources
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
