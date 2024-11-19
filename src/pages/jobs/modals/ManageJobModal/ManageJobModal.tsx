import React from 'react';
import ModalContainer from '../../../../components/ModalContainer';
import CloseIcon from '@assets/close-icon.svg';
import ProfileCircle from '@assets/profile-circle.svg';
import DollarIcon from '@assets/dollar-circle.svg';
import { DUMMY_JOB_DESC } from '@pages/jobs/components/JobItem/JobItem.dummy';
import Pill from '@components/Pill';
import JobDetail from '@pages/jobs/components/JobDetail';
import useManageJobModal from './useManageJobModal';
import { JobResponse } from '@type/jobs';

export interface IManageJobModal {
    onClose: () => void;
    onDeleteJob: (id: string) => void
    job: JobResponse;
}

export default function ManageJobModal(props: IManageJobModal) {

    const { onDelete, isLoading } = useManageJobModal(props)

    return (
        <ModalContainer>
            <div className="bg-white max-h-[100%] overflow-auto my-auto rounded-[10px] px-4 md:px-8 py-[54px] max-w-[436px] min-w-72 w-full">
                <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-2xl font-semibold text-black">Manage your job post</h3>
                    <img onClick={props.onClose} src={CloseIcon} className="w-6 h-6" role="button" />
                </div>
                

                <JobDetail job={props.job}/>

                <div className="mt-16 grid grid-cols-2 gap-1.5">
                    <button className="btn-rounded bg-primary-red" onClick={onDelete} disabled={isLoading}>Delete Job Post</button>
                    <button className="btn-rounded outline text-sm !text-black border" onClick={props.onClose}>Cancel</button>
                </div>
            </div>
        </ModalContainer>
    );
}
