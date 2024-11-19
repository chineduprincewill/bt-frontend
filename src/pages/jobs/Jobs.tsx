import { JOB_CATEGORIES } from '@utils/constants';

import PageContainer from '../../components/PageContainer';
import Pill from '../../components/Pill';
import TopPageBar from '../../components/TopPageBar';
import JobItem from './components/JobItem';
import { JOB_STATUS } from './Jobs.data';
import JobPostingModal from './modals/JobPostingModal';
import useJobs from './useJobs';

export default function Jobs() {
    const {
        onCloseJobPostingModal,
        onShowJobPostingModal,
        onChangeJobStatus,
        showJobPostingModal,
        isLoading,
        jobStatus,
        profileId,
        jobList,
        onDeleteJob,
        onAddJob,
        onChangeSearchCategory,
        onRefreshFilter,
    } = useJobs();

    return (
        <>
            {showJobPostingModal && <JobPostingModal onCloseModal={onCloseJobPostingModal} onSuccess={onAddJob} />}
            <PageContainer
                title="Jobs"
                rightContent={
                    <div>
                        <button className="btn-rounded bg-primary-red" onClick={onShowJobPostingModal}>
                            Post a Job
                        </button>
                    </div>
                }
            >
                <TopPageBar
                    onChangeSearch={onChangeSearchCategory}
                    dropdownOptions={JOB_CATEGORIES}
                    onChangeCategory={onChangeSearchCategory}
                    onRefreshFilter={onRefreshFilter}
                />
                <div className="max-w-[100vw] overflow-auto mt-6">
                    <div className="flex items-center w-full gap-4">
                        <Pill color="#F7FCCC" active={!jobStatus && !profileId} onClick={() => onChangeJobStatus(JOB_STATUS.available)}>
                            Available Jobs
                        </Pill>
                        <Pill color="#81F9D4" active={jobStatus === JOB_STATUS.applied} onClick={() => onChangeJobStatus(JOB_STATUS.applied)}>
                            Applied
                        </Pill>
                        <Pill color="#E9E9E9" active={!!profileId} onClick={() => onChangeJobStatus(JOB_STATUS.posted)}>
                            My Job Postings
                        </Pill>
                    </div>
                </div>

                {!isLoading && jobList.length === 0 && <h5 className="w-full font-semibold text-center text-lightGray-2 mt-60">No Available Jobs</h5>}
                {isLoading && <p className="mt-6">Loading Jobs...</p>}
                {!isLoading && (
                    <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
                        {jobList.map((job) => (
                            <JobItem key={job.id} job={job} onDeleteJob={onDeleteJob} />
                        ))}
                    </div>
                )}
            </PageContainer>
        </>
    );
}
