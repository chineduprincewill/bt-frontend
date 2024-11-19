import DollarIcon from '@assets/dollar-circle.svg';
import GoogleLogo from '@assets/google_logo.png';
import PageContainer from '@components/PageContainer';
import JobApplyModal from '@pages/jobs/modals/JobApplyModal';
import JobUploadItem from '@pages/jobs/modals/JobApplyModal/components/JobUploadItem';
import ManageJobModal from '@pages/jobs/modals/ManageJobModal';

import useViewJob from './useViewJob';
import { DUMMY_JOB_DESC_FULL } from './ViewJob.dummy';

export default function ViewJob() {
    const { job, isLoading, showApplyModal, onCloseModal, onShowModal, showManageModal, onDeleteJob, wasJobPostedByMe } = useViewJob();

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <PageContainer back>
                <div className="flex items-center justify-between p-4 mt-12 bg-lightGray-7 rounded-10">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold">{job?.jobTitle}</h2>
                        <div className="flex flex-wrap items-center gap-6 mt-3">
                            <div className="flex gap-2 items-center *:text-accent-6">
                                {job?.companyLogo && (
                                    <img src={job.companyLogo || ''} className="w-[18px] h-[18px]" alt={job.companyName + ' logo'} />
                                )}
                                <p className="text-base font-medium">{job?.companyName}</p>
                            </div>
                            <div className="flex gap-2 items-center *:text-accent-6">
                                <span className="w-2 h-2 rounded-full bg-accent-6"></span>
                                <p className="text-base font-medium">{job?.jobType}</p>
                            </div>
                            <div className="flex gap-2 items-center *:text-accent-6">
                                <img src={DollarIcon} className="w-[18px] h-[18px]" alt="salary icon" />
                                <p className="text-base font-medium">
                                    {job?.payAmount} {job?.payFrequency}
                                </p>
                            </div>
                        </div>

                        <button className="block btn-rounded bg-primary-red lg:hidden w-max" onClick={onShowModal}>
                            {wasJobPostedByMe ? 'Manage job' : 'Apply for this job'}
                        </button>
                    </div>
                    <button className="hidden btn-rounded bg-primary-red lg:block" onClick={onShowModal}>
                        {wasJobPostedByMe ? 'Manage job' : 'Apply for this job'}
                    </button>
                </div>

                <h4 className="text-xl font-semibold mt-14">Job Description</h4>
                <p className="mt-6 text-base font-semibold leading-normal text-accent-6">{job?.jobDescription}</p>
                <div className="flex gap-6 mt-16">
                    <button className="bg-black btn-rounded" onClick={onShowModal}>
                        {wasJobPostedByMe ? 'Manage job' : 'Apply for this job'}
                    </button>
                    <button className="btn-rounded outline">Share this job</button>
                </div>
            </PageContainer>
            {showApplyModal && <JobApplyModal onClose={onCloseModal} job={job} />}
            {showManageModal && <ManageJobModal job={job} onClose={onCloseModal} onDeleteJob={onDeleteJob} />}
        </>
    );
}
