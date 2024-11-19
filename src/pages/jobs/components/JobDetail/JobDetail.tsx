import DollarIcon from '@assets/dollar-circle.svg';
import { DUMMY_JOB_DESC } from '../JobItem/JobItem.dummy';
import Pill from '@components/Pill';
import { JobResponse } from '@type/jobs';
import { generateLightColor } from '@utils/utils';

interface IJobDetail {
    job: JobResponse;
}

export default function JobDetail({ job }: IJobDetail) {
    return (
        <div className="p-4 bg-lightGray-7 rounded-10 flex flex-col mt-9">
            <div className="mt-6">
                <h4 className="font-semibold font-2xl">{job.jobTitle}</h4>
                <div className="mt-3 flex gap-2">
                    <img src={DollarIcon} className="w-[18px] h-[18px]" alt="salary icon" />
                    <p className="text-xs font-medium">
                        {job.payAmount} {job.payFrequency}
                    </p>
                </div>
            </div>
            <p className="text-xs text-lightGray-2 mt-6">{job.jobDescription}</p>
            <div className="gap-2 flex mt-6">
                <Pill color={generateLightColor(job.jobCategory)}>{job.jobCategory}</Pill>
            </div>
        </div>
    );
}
