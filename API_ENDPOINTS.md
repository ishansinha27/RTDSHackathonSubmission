# API Endpoints Documentation

This document describes the API endpoints provided by the AceCloud GPU Resource Finder application.

## Backend API Endpoints

### Get GPU Resources

Fetches GPU resources based on search criteria.

- **URL**: `/api/resources`
- **Method**: `GET`
- **Query Parameters**:
  - `region` (string, required): The cloud region code (e.g., 'us-east-at-1', 'ap-south-mum-1')
  - `budget` (number, required): Maximum budget in USD
  - `operatingSystem` (string, required): Operating system preference ('windows' or 'linux')
  - `usageHours` (number, required): Number of hours the resource will be used

- **Success Response**:
  - **Code**: 200
  - **Content Example**:
  ```json
  {
    "error": false,
    "message": "Success",
    "data": [
      {
        "id": 7,
        "country": "india",
        "operating_system": "windows",
        "resource_class": "a2",
        "resource_name": "W.N.A2.32",
        "vcpus": 8,
        "ram": 32,
        "price_per_hour": 0.309508461,
        "price_per_month": 196.4705882,
        "price_per_half_year": 1125.882353,
        "price_per_year": 2145.882353,
        "price_per_spot": 0.1981,
        "currency": "USD",
        "is_gpu": 1,
        "is_spot": 1,
        "resource": "instances",
        "resource_type": "gpu",
        "region": "noida",
        "gpu_description": "1x A2",
        "is_public": 1
      },
      // Additional resources...
    ]
  }
  ```

- **Error Responses**:
  - **Code**: 400 Bad Request
    - **Content**: `{ "error": true, "message": "Invalid search parameters", "details": [...] }`
  - **Code**: 500 Internal Server Error
    - **Content**: `{ "error": true, "message": "Failed to fetch resources" }`

- **Sample Request**:
  ```
  GET /api/resources?region=ap-south-mum-1&budget=500&operatingSystem=linux&usageHours=80
  ```

## External API Integration

The application integrates with the AceCloud Pricing API to fetch GPU resource data:

- **URL**: `https://customer.acecloudhosting.com/api/v1/pricing?is_gpu=true&resource=instances&region=[REGION]`
- **Method**: `GET`
- **Parameters**:
  - `is_gpu=true`: Filters only GPU resources
  - `resource=instances`: Specifies that we want instance resources
  - `region=[REGION]`: The specific region to query (e.g., us-east-at-1)

- **Response Format**:
  ```json
  {
    "error": false,
    "message": "Success",
    "data": {
      "country": "india",
      "opera": [
        {
          "id": 123,
          "country": "india",
          "operating_system": "windows/linux",
          "resource_class": "class_name",
          "resource_name": "resource_name",
          "vcpus": 32,
          "ram": 128,
          "price_per_hour": 0.95,
          "price_per_month": 700,
          "price_per_spot": 0.5,
          "currency": "USD",
          "is_gpu": 1,
          "is_spot": 0,
          "resource": "instances",
          "resource_type": "type_name",
          "region": "ap-south-mum-1",
          "gpu_description": "NVIDIA A100 GPU",
          "is_public": 1
        },
        // More resources...
      ]
    }
  }
  ```

## Data Processing Flow

1. The frontend sends a request to the backend with search criteria
2. The backend validates the parameters using Zod schema validation
3. The backend makes a request to the AceCloud API with the specified region
4. The API returns GPU resource data for that region
5. The backend filters the results by:
   - Operating system (windows/linux)
   - Budget constraint (price_per_hour * usageHours <= budget)
6. The backend sorts results by price_per_hour (ascending)
7. The top 5 most affordable options are returned to the frontend
8. The frontend displays the results as resource cards