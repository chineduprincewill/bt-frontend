import React from 'react';

import JobUploadItem from '@pages/jobs/modals/JobApplyModal/components/JobUploadItem';
import { MediaContentMetadata } from '@type/common';

import { IJobPostingStep } from '../../JobPostingModal.types';

interface IJobCompanyStep extends IJobPostingStep {
    onPreviousStep: () => void;
    onNextStep: () => void;
}

export default function JobCompanyStep({ onNextStep, onPreviousStep, jobForm, onChange }: IJobCompanyStep) {
    return (
        <div className="flex flex-col gap-6 mt-6">
            <section className="form-field">
                <label>Company Name</label>
                <input
                    type="text"
                    placeholder="Enter your company name"
                    value={jobForm.companyName}
                    onChange={(e) => onChange('companyName', e.target.value)}
                />
            </section>
            <section className="form-field">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your company email here"
                    value={jobForm.email}
                    onChange={(e) => onChange('email', e.target.value)}
                />
            </section>
            <section className="form-field">
                <label>Company Logo</label>
                <JobUploadItem
                    title="Upload your company logo"
                    subTItle="Max upload size 5MB"
                    file={jobForm.companyLogo as MediaContentMetadata<Record<string, any>>}
                    onDropFile={(e) => onChange('companyLogo', e)}
                    onRemoveFile={() => onChange('companyLogo', null)}
                    accept={{
                        'image/*': [],
                    }}
                />
            </section>

            <div className="grid w-full grid-cols-2 gap-4 mt-12">
                <button className="w-full btn-rounded outline" onClick={onPreviousStep}>
                    Back
                </button>
                <button className="w-full btn-rounded bg-primary-red" onClick={onNextStep}>
                    Proceed - Pay Details
                </button>
            </div>
        </div>
    );
}
