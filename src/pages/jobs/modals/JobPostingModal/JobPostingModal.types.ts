import { MediaContentMetadata } from '@type/common';

export interface IJobPostingForm {
    jobTitle: string;
    jobLocation: string;
    jobDescription: string;
    jobType: string;
    jobCategory: string;
    companyName: string;
    email: string;
    companyLogo: MediaContentMetadata | string | File | null;
    payAmount: number | string;
    payFrequency: string;
}

export interface IJobPostingStep {
    jobForm: IJobPostingForm;
    onChange: (name: string, e: any) => void;
}
