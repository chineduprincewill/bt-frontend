import CloseIcon from '@assets/close-icon.svg';
import ModalContainer from '@components/ModalContainer';
import JobDetail from '@pages/jobs/components/JobDetail';
import { JobResponse } from '@type/jobs';

import JobUploadItem from './components/JobUploadItem';
import useJobApplyModal from './useJobApplyModal';

export interface IJobApplyModal {
    onClose: () => void;
    job: JobResponse;
}

export default function JobApplyModal({ onClose, job }: IJobApplyModal) {
    const { onDropFile, onRemoveFile, resumeFile, coverFile, onChangeForm, onSubmit, isLoading } = useJobApplyModal({ job, onClose });

    return (
        <ModalContainer>
            <div className="bg-white h-full overflow-auto my-auto rounded-[10px] px-4 md:px-8 py-[54px] max-w-[582px] min-w-80 w-full">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-black">Apply</h3>
                    <img onClick={onClose} src={CloseIcon} className="w-6 h-6" role="button" />
                </div>
                <div className="mt-12">
                    <JobDetail job={job} />
                </div>
                <div className="flex flex-col gap-6 mt-6">
                    <section className="form-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Enter your name here" onChange={(e) => onChangeForm('name', e.target.value)} />
                    </section>
                    <section className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="Enter your email here" onChange={(e) => onChangeForm('email', e.target.value)} />
                    </section>
                    <section className="form-field">
                        <label htmlFor="name">Short Bio (Optional)</label>
                        <textarea rows={4} placeholder="Write a little about yourself" onChange={(e) => onChangeForm('shortBio', e.target.value)} />
                    </section>
                    <section className="form-field">
                        <label htmlFor="name">
                            Link - Portfolio, Website etc <span className="text-lightGray-2">(Optional)</span>
                        </label>
                        <input type="text" placeholder="Link" onChange={(e) => onChangeForm('portfolioLink', e.target.value)} />
                    </section>
                    <section className="form-field">
                        <label htmlFor="name">Resume</label>
                        <JobUploadItem
                            title="Upload your Resume here"
                            subTItle="Max upload size 20MB"
                            file={resumeFile}
                            onDropFile={(file) => onDropFile('resume', file)}
                            onRemoveFile={() => onRemoveFile('resume')}
                        />
                    </section>
                    <section className="form-field">
                        <label htmlFor="name">
                            Cover Letter <span className="text-lightGray-2">(Optional)</span>
                            <JobUploadItem
                                title="Upload your Cover letter here"
                                subTItle="Max upload size 20MB"
                                onDropFile={(file) => onDropFile('cover', file)}
                                file={coverFile}
                                onRemoveFile={() => onRemoveFile('cover')}
                            />
                        </label>
                    </section>
                    <div className="w-full mt-12">
                        <button className="w-full btn-rounded bg-primary-red" onClick={onSubmit} disabled={isLoading}>
                            Send Application
                        </button>
                    </div>
                </div>
            </div>
        </ModalContainer>
    );
}
