import * as z from "zod";

export const formSchema = z.object({
  region: z.string({
    required_error: "Please select a region",
  }),
  operatingSystem: z.string({
    required_error: "Please select an operating system",
  }),
  budget: z.number({
    required_error: "Please enter a budget",
  }).positive("Budget must be greater than zero"),
  usageHours: z.number({
    required_error: "Please enter usage hours",
  }).positive("Usage hours must be greater than zero"),
});

export type FormData = z.infer<typeof formSchema>;
