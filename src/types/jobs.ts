export type JobResponse = {
    id: string;
    jobTitle: string;
    jobLocation: string;
    jobDescription: string;
    jobType: string;
    jobCategory: string;
    companyName: string;
    email: string;
    companyLogo: string | null;
    payAmount: string;
    payFrequency: string;
    jobProvidersProfileId: string;
    createdAt: string;
    updatedAt: string;
    jobProvider: {
        id: string;
        bio: string | null;
        user: {
            username: string;
            id: string;
            firstName: string;
            lastName: string;
            displayImage: string | null;
        };
    };
};


export interface JobApplicationRequest {
    name: string;
    email: string;
    shortBio?: string;
    portfolioLink?: string;
    jobId: string;
}