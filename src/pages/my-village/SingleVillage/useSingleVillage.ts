import { useEffect } from 'react';
import { toggleJoinRequestModal } from '@state/slices/modals';
import { useRequestMembershipMutation, useGetAllVillageMembersQuery, useGetSingleVillageQuery } from 'api/villageApi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function useSingleVillage(id: string) {
    const [requestMembership, { isSuccess: requestSuccess, isError: requestError }] = useRequestMembershipMutation();

    const dispatch = useDispatch();

    const { data, isLoading: membersLoading } = useGetAllVillageMembersQuery(id);
    const members = data?.data;

    const { data: singleVillageData } = useGetSingleVillageQuery(id);

    const handleRequestMembership = async () => {
        try {
            await requestMembership(id).unwrap();
        } catch (error) {
            console.error(error);
            // toast.error('Failed to send membership request. Please try again.');
        }
    };

    useEffect(() => {
        if (requestSuccess) {
            toast.success('Membership request sent successfully!');
            dispatch(toggleJoinRequestModal());
        } else if (requestError) {
            toast.error(`Failed to send membership request. You have prompted too many requests. Please try again later`);
        }
    }, [dispatch, requestSuccess, requestError]);

    const village = singleVillageData?.data;

    return {
        membersLoading,
        handleRequestMembership,
        members,
        village,
    };
}
