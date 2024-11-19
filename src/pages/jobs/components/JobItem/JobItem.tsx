import { Link } from 'react-router-dom';

import JobApplyModal from '@pages/jobs/modals/JobApplyModal';
import ManageJobModal from '@pages/jobs/modals/ManageJobModal';
import { JobResponse } from '@type/jobs';
import { generateLightColor } from '@utils/utils';

import DollarIcon from '../../../../assets/dollar-circle.svg';
import Pill from '../../../../components/Pill';
import useJobItem from './useJobItem';

export interface IJobItem {
    job: JobResponse;
    onDeleteJob: (id: string) => void;
}

export default function JobItem({ job, onDeleteJob }: IJobItem) {
    const {
        onCloseJobApplyModal,
        showManageModal,
        isApplied,
        showJobApplyModal,
        wasJobPostedByMe,
        onShowModal,
        onCloseManageJobModal,
        createdFromDistance,
    } = useJobItem({ job, onDeleteJob });

    return (
        <>
            <div className="p-4 rounded-10 bg-lightGray-7">
                <Link to={`/jobs/${job.id}`}>
                    <div className="">
                        <div className="flex flex-col flex-1 gap-6 ">
                            <h6 className="text-xs font-medium">{createdFromDistance}</h6>
                            <div>
                                <h4 className="font-semibold font-2xl">{job.jobTitle}</h4>
                                <div className="flex gap-2 mt-3">
                                    <img src={DollarIcon} className="w-[18px] h-[18px]" alt="salary icon" />
                                    <p className="text-xs font-medium">
                                        {job.payAmount} {job.payFrequency}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs text-lightGray-2 h-[75px] overflow-hidden">{job.jobDescription}</p>
                            <div className="flex gap-2">
                                <Pill color={generateLightColor(job.jobCategory)}>{job.jobCategory}</Pill>
                            </div>
                        </div>
                        {/* Apply for job button */}
                    </div>
                </Link>
                {!isApplied && (
                    <button className="w-full mt-6 bg-black btn-rounded" onClick={onShowModal}>
                        {wasJobPostedByMe ? 'Manage' : 'Apply for this Job'}
                    </button>
                )}
                {/* Applied Button */}
                {isApplied && (
                    <button className="w-full mt-6 cursor-default btn-rounded outline" disabled onClick={onShowModal}>
                        Applied
                    </button>
                )}
            </div>
            {showManageModal && <ManageJobModal job={job} onClose={onCloseManageJobModal} onDeleteJob={onDeleteJob} />}
            {showJobApplyModal && <JobApplyModal job={job} onClose={onCloseJobApplyModal} />}
        </>
    );
}
