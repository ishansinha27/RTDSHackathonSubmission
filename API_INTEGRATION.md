# API Integration Documentation

This document explains how the AceCloud GPU Resource Finder integrates with external APIs to fetch GPU resource data.

## AceCloud Pricing API

The application uses AceCloud's pricing API to fetch real-time GPU resource data based on the selected region. The API endpoint follows this format:

```
https://customer.acecloudhosting.com/api/v1/pricing?is_gpu=true&resource=instances&region=[REGION]
```

Where `[REGION]` is dynamically replaced with one of the following valid region codes:
- `us-east-at-1` (US East)
- `ap-south-mum-1` (Mumbai)
- `ap-south-del-1` (Delhi)
- `ap-south-noi-1` (Noida)

## API Response Structure

The API returns a JSON response with the following structure:

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

## Implementation Details

### Backend Implementation

The backend handles the API integration in `server/routes.ts`:

```typescript
app.get('/api/resources', async (req, res) => {
  try {
    const { region, budget, operatingSystem, usageHours } = req.query;
    
    // Validate parameters
    const searchParams = searchParamsSchema.parse({
      region,
      budget: Number(budget),
      operatingSystem,
      usageHours: Number(usageHours)
    });
    
    // Call AceCloud API
    const apiUrl = `https://customer.acecloudhosting.com/api/v1/pricing?is_gpu=true&resource=instances&region=${searchParams.region}`;
    const response = await axios.get(apiUrl);
    
    if (response.data.error) {
      return res.status(400).json({ error: true, message: response.data.message });
    }
    
    // Extract resources from the response
    const resources = response.data.data.opera;
    
    // Filter resources based on budget and usage hours
    const filteredResources = resources
      .filter(resource => {
        const totalCost = resource.price_per_hour * searchParams.usageHours;
        return totalCost <= searchParams.budget;
      })
      .sort((a, b) => a.price_per_hour - b.price_per_hour)
      .slice(0, 5);
    
    return res.json({ error: false, message: 'Success', data: filteredResources });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Failed to fetch resources' });
  }
});
```

### Frontend Implementation

The frontend makes a request to the backend API in `client/src/pages/home.tsx`:

```typescript
const fetchResources = async (formData: FormData) => {
  const response = await fetch(`/api/resources?region=${formData.region}&budget=${formData.budget}&operatingSystem=${formData.operatingSystem}&usageHours=${formData.usageHours}`);
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.message);
  }
  
  return data.data;
};
```

## Error Handling

The application implements robust error handling for API requests:

1. **API Unavailability**: If the AceCloud API is unavailable, the application returns an appropriate error message.

2. **Invalid Parameters**: If the request parameters are invalid, the application returns a 400 Bad Request response with a descriptive error message.

3. **Server Errors**: If there's an internal server error, the application returns a 500 Internal Server Error response.

## Data Filtering

The application filters the API response based on the user's budget and usage hours:

1. Calculate the total cost for each resource: `price_per_hour * usageHours`
2. Filter resources where the total cost is less than or equal to the budget
3. Sort the filtered resources by price per hour (ascending)
4. Return the top 5 most affordable options

This ensures that users see only the most relevant and affordable GPU resources that meet their criteria.