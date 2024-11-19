import CloseIcon from '@assets/close-icon.svg';
import ModalContainer from '@components/ModalContainer';

import JobCompanyStep from './components/JobCompanyStep';
import JobInfoStep from './components/JobInfoStep';
import JobPayStep from './components/JobPayStep';
import { IJobPostingForm } from './JobPostingModal.types';
import useJobPostingModal from './useJobPostingModal';

interface IJobPostingModal {
    onCloseModal: () => void;
    onSuccess: (e: IJobPostingForm) => void;
}

export default function JobPostingModal({ onCloseModal, onSuccess }: IJobPostingModal) {
    const { currentStep, onNextStep, jobForm, onPreviousStep, onSubmit, onChange, isLoading } = useJobPostingModal({ onCloseModal, onSuccess });

    return (
        <ModalContainer>
            <div className="bg-white max-h-full h-max overflow-auto my-auto rounded-[10px] px-4 md:px-8 py-[54px] max-w-[582px] min-w-80 w-full">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-black md:text-2xl">Post a job</h3>
                    <img onClick={onCloseModal} src={CloseIcon} className="w-6 h-6" role="button" />
                </div>
                {currentStep === 0 && <JobInfoStep onNextStep={onNextStep} jobForm={jobForm} onChange={onChange} />}
                {currentStep === 1 && (
                    <JobCompanyStep onPreviousStep={onPreviousStep} onNextStep={onNextStep} jobForm={jobForm} onChange={onChange} />
                )}
                {currentStep === 2 && (
                    <JobPayStep isLoading={isLoading} onPreviousStep={onPreviousStep} jobForm={jobForm} onSubmit={onSubmit} onChange={onChange} />
                )}
            </div>
        </ModalContainer>
    );
}
