import DropdownSearch from '@components/DropdownSearch';
import { IDropdownSearchOption } from '@components/DropdownSearch/DropdownSearch';
import { PAY_FREQUENCY_OPTIONS } from '@utils/constants';

import { IJobPostingForm, IJobPostingStep } from '../../JobPostingModal.types';

interface IJobPayStep extends IJobPostingStep {
    onPreviousStep: () => void;
    jobForm: IJobPostingForm;
    onSubmit: () => void;
    isLoading: boolean;
}

export default function JobPayStep({ onPreviousStep, jobForm, isLoading, onChange, onSubmit }: IJobPayStep) {
    return (
        <div className="flex flex-col gap-6 mt-6">
            <section className="form-field">
                <label>Pay Amount</label>
                <input type="number" placeholder="Pay Amount" value={jobForm.payAmount} onChange={(e) => onChange('payAmount', e.target.valueAsNumber)} />
            </section>
            <section className="form-field">
                <label>Pay Frequency</label>
                <DropdownSearch
                    options={PAY_FREQUENCY_OPTIONS}
                    placeholder="Select Job type"
                    value={jobForm.payFrequency}
                    onChange={(e) => onChange('payFrequency', e)}
                />
            </section>

            <div className="grid w-full grid-cols-2 gap-4 mt-12">
                <button className="w-full btn-rounded outline" onClick={onPreviousStep} disabled={isLoading}>
                    Back
                </button>
                <button className="w-full btn-rounded bg-primary-red" onClick={onSubmit} disabled={isLoading}>
                    Post job
                </button>
            </div>
        </div>
    );
}
