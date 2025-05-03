export interface Resource {
  country: string;
  operating_system: string;
  resource_class: string;
  resource_name: string;
  vcpus: number;
  ram: number;
  price_per_hour: number;
  price_per_month: number;
  price_per_half_year?: number;
  price_per_year?: number;
  price_per_spot: number;
  currency: string;
  is_gpu: number;
  is_spot: number;
  resource: string;
  resource_type: string;
  region: string;
  gpu_description: string;
  is_public: number;
}

export interface ApiResponse {
  error: boolean;
  message: string;
  data: Resource[];
}
