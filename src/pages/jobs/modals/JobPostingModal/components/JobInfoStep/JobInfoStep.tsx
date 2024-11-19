import React from 'react';

import DropdownSearch from '@components/DropdownSearch';
import LocationDropdown from '@components/LocationDropdown';
import { JOB_CATEGORIES, JOB_TYPES } from '@utils/constants';

import { IJobPostingStep } from '../../JobPostingModal.types';

interface IJobInfoStep extends IJobPostingStep {
    onNextStep: () => void;
}

export default function JobInfoStep({ onNextStep, jobForm, onChange }: IJobInfoStep) {
    return (
        <div className="flex flex-col gap-6 mt-6">
            <section className="form-field">
                <label>Job Title</label>
                <input
                    type="text"
                    placeholder="Enter your job title here"
                    value={jobForm.jobTitle}
                    onChange={(e) => onChange('jobTitle', e.target.value)}
                />
            </section>
            <section className="form-field">
                <label>Location</label>
                {/* <input
                    type="text"
                    placeholder="Enter your job location here"
                    value={jobForm.jobLocation}
                    onChange={(e) => onChange('jobLocation', e.target.value)}
                /> */}
                <LocationDropdown value={jobForm.jobLocation} onSelect={(e) => onChange('jobLocation', e)} />
            </section>
            <section className="form-field">
                <label>Job Description</label>
                <textarea
                    rows={4}
                    placeholder="Write a little about the job"
                    value={jobForm.jobDescription}
                    onChange={(e) => onChange('jobDescription', e.target.value)}
                />
            </section>
            <section className="form-field">
                <label>Job Type</label>
                <DropdownSearch options={JOB_TYPES} placeholder="Select Job type" value={jobForm.jobType} onChange={(e) => onChange('jobType', e)} />
            </section>
            <section className="form-field">
                <label>Job Category</label>
                <DropdownSearch
                    options={JOB_CATEGORIES}
                    placeholder="Select Job category"
                    value={jobForm.jobCategory}
                    onChange={(e) => onChange('jobCategory', e)}
                />
            </section>

            <div className="w-full mt-12">
                <button className="w-full btn-rounded bg-primary-red" onClick={onNextStep}>
                    Proceed - Company Information
                </button>
            </div>
        </div>
    );
}
