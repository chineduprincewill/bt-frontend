import { useState, useEffect } from 'react';
import { useGetSingleVillageQuery, useGetAllVillageMembersQuery } from 'api/villageApi';
import { useParams } from 'react-router-dom';
import { useAcceptVillageMemberMutation } from 'api/villageApi';
import { toast } from 'react-toastify';
import { useBlockVillageMemberMutation } from 'api/villageApi';
import { useGetVillageFeedQuery } from 'api/villageApi';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';

export default function useVillage() {
    const { id } = useParams();

    const { data: villageData, isLoading, isSuccess } = useGetSingleVillageQuery(id!);
    const [acceptMember, { isLoading: acceptLoading, isSuccess: acceptSuccess, isError: acceptError }] = useAcceptVillageMemberMutation();

    const { data: villageFeedsData, isLoading: villageFeedsLoading, isSuccess: villageFeedsSuccess } = useGetVillageFeedQuery(id!);

    const { data: loggedInUser } = useGetLoggedInUserInfoQuery(null);

    const villagePosts = villageFeedsData?.data;

    const village = villageData?.data;

    const { data, isLoading: membersLoading, isError: membersError } = useGetAllVillageMembersQuery(id!);
    const members = data?.data;

    const [blockVillageMember] = useBlockVillageMemberMutation();

    const pendingMembers = members?.filter((member) => member.status === 'Pending');

    const activeMembers = members?.filter((member) => member.status === 'Active');

    const loggedInUserId = loggedInUser?.data.user.profile.id;

    const [isLeader, setIsLeader] = useState(false);

    useEffect(() => {
        if (members && loggedInUserId) {
            const currentUser = members.find((member) => member.member.id === loggedInUserId);
            if (currentUser && currentUser.villageBadge === 'Leader') {
                setIsLeader(true);
            }
        }
    }, [members, loggedInUserId]);

    const handleAcceptVillageMember = (memberId: string, profileId: string) => {
        acceptMember({ villageId: id!, profileId: profileId })
            .then((response) => {
                console.log('Member accepted successfully:', response);
                toast.success('Member accepted successfully!');
            })
            .catch((error) => {
                console.error('Failed to accept member:', error);
                toast.error('Failed to accept member');
            });
    };

    const handleBlockVillageMember = (profileId: string) => {
        blockVillageMember({ villageId: id!, profileId: profileId })
            .then((response) => {
                console.log('Member blocked successfully:', response);
                toast.success('Member blocked successfully!');
            })
            .catch((error) => {
                console.error('Failed to block member:', error);
                toast.error('Failed to block member');
            });
    };

    return {
        village,
        villageId: id,
        isLeader,
        isLoading,
        isSuccess,
        members,
        pendingMembers,
        activeMembers,
        membersLoading,
        membersError,
        handleAcceptVillageMember,
        handleBlockVillageMember,
        villagePosts,
    };
}
