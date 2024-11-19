import { useDeleteJobMutation } from 'api/jobsApi';
import React from 'react';
import { IManageJobModal } from './ManageJobModal';
import { toast } from 'react-toastify';

export default function useManageJobModal({ job, onClose, onDeleteJob }: IManageJobModal) {
    const [deleteJob, { isLoading }] = useDeleteJobMutation();

    async function onDelete() {
        try {
            await deleteJob(job.id).unwrap();
            toast.success('Job deleted successfully');
            onDeleteJob(job.id);
            onClose();
        } catch (error) {
            toast.error('Unable to delete job');
            console.log(error);
        }
    }

    return { onDelete, isLoading };
}
