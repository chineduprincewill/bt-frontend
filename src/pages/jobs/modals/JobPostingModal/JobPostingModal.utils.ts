import { z } from 'zod';

export const jobPostingFormSchema = z.object({
    jobTitle: z.string({message: "Job title is required"}).min(1, 'Job title is required'),
    jobLocation: z.string({message: "Job location is required"}),
    jobDescription: z.string({message: "Job description is required"}).min(1, 'Job description is required'),
    jobType: z.string({message: "Job type is required"}).min(1, 'Job type is required'),
    jobCategory: z.string({message: "Job category is required"}).min(1, 'Job category is required'),
    companyName: z.string({message: "Company name is required"}).min(1, 'Company name is required'),
    email: z.string({message: "Invalid company email"}).email('Invalid email'),
    companyLogo: z.any().optional(),
    payAmount: z.number({message: "Invalid pay amount"}).min(1, 'Pay amount is required'),
    payFrequency: z.string({message: "Pay frequency is required"}).min(1, 'Pay frequency is required'),
});
