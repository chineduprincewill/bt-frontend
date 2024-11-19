import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    useGetAllCommunityMembersQuery,
    useGetCommunityFeedQuery,
    useAcceptCommunityMemberMutation,
    useGetSingleCommunityQuery,
    useCreateCommunityMutation,
    useRequestCommunityMembershipMutation,
    useLeaveCommunityMutation,
} from 'api/communityApi';
import { useDispatch } from 'react-redux';
import { toggleJoinRequestModal, toggleShowInviteMembersModal, toggleLeaveCommunityModal, setShowInviteMembersModal } from '@state/slices/modals';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';
import { setPlatformId } from '@state/slices/platform';
import { useNavigate } from 'react-router-dom';
import SingleCommunity from '../SingleCommunity';

export default function useCommunity(singleCommunityId?: string) {
    const { id: communityId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: communityData, isLoading, isSuccess } = useGetSingleCommunityQuery(singleCommunityId || communityId!);
    const [createCommunity, { isLoading: createLoading, isSuccess: createSuccess, isError: createError, error: createErrorData }] =
        useCreateCommunityMutation();
    const [acceptMember, { isLoading: acceptLoading, isSuccess: acceptSuccess, isError: acceptError }] = useAcceptCommunityMemberMutation();
    const [requestMembership, { isLoading: requestLoading, isSuccess: requestSuccess, isError: requestError, error: requestErrorData }] =
        useRequestCommunityMembershipMutation();
    const { data: communityFeedsData, isLoading: communityFeedsLoading, isSuccess: communityFeedsSuccess } = useGetCommunityFeedQuery(communityId!);

    const [leaveCommunity, { isLoading: leaveLoading, isSuccess: leaveSuccess, isError: leaveError }] = useLeaveCommunityMutation();

    const { data: loggedInUser } = useGetLoggedInUserInfoQuery(null);

    const [stateCommunityId, setStateCommunityId] = useState('');

    const loggedInUserId = loggedInUser?.data.user.profile.id;

    const communityFeed = communityFeedsData?.data;

    const community = communityData?.data;

    console.log('CHECKING COMMUNITY!!', community);

    const { data, isLoading: membersLoading, isError: membersError } = useGetAllCommunityMembersQuery(communityId!);
    const members = data?.data;

    // const IsLeader = members?.find((member) => member.member.id === loggedInUserId);
    const [isLeader, setIsLeader] = useState(false);

    useEffect(() => {
        if (members && loggedInUserId) {
            const currentUser = members.find((member) => member.member.id === loggedInUserId);
            if (currentUser && currentUser.communityBadge === 'Leader') {
                setIsLeader(true);
            }
        }
    }, [members, loggedInUserId]);

    const pendingMembers = members?.filter((member) => member.status === 'Pending');

    const activeMembers = members?.filter((member) => member.status === 'Active');

    const isMember = community?.isMember;

    const handleCreateCommunity = async (name: string, description: string, reason: string) => {
        try {
            const response = await createCommunity({ name, description, reason }).unwrap();

            const platformIDTEST = response.data.id;
            dispatch(setPlatformId(platformIDTEST));
            localStorage.setItem('platformId', response.data.id);
            setStateCommunityId(response.data.id);
            dispatch(setShowInviteMembersModal(true));
            console.log('GRABBING ID', response.data.id);
            toast.success('Success');
        } catch (error) {
            // toast.error('An error occured.');
            console.log('error', error);
        }
    };

    const handleRequestCommunityMembership = (id: string) => {
        requestMembership(id!)
            .then((response) => {
                console.log('Member requested successfully:', response);

                // dispatch(toggleJoinRequestModal());
            })
            .catch((error) => {
                console.error('Failed to request member:', error);
            });
    };

    useEffect(() => {
        if (createSuccess) {
            toast.success('Community created successfully!');
            dispatch(toggleShowInviteMembersModal());
        } else if (createError) {
            toast.error(`An error occurred. Please try again later`);
        }
    }, [createSuccess, createError, createErrorData, dispatch]);

    useEffect(() => {
        if (acceptSuccess) {
            toast.success('Member accepted successfully!');
        } else if (createError) {
            toast.error(`An error occurred. Please try again later`);
        }
    }, [acceptSuccess, createError, createErrorData, dispatch]);

    useEffect(() => {
        if (requestSuccess) {
            toast.success('Membership request sent successfully!');
            dispatch(toggleJoinRequestModal());
        } else if (requestError) {
            toast.error(`Failed to send membership request. You have prompted too many requests. Please try again later`);
        }
    }, [requestSuccess, requestError, requestErrorData]);

    const handleAcceptCommunityMember = (profileId: string) => {
        acceptMember({ communityId: communityId!, profileId: profileId })
            .then((response) => {
                console.log('Member accepted successfully:', response);
            })
            .catch((error) => {
                console.error('Failed to accept member:', error);
            });
    };

    const handleBlockMember = () => {};

    const handleLeaveCommunity = () => {
        if (loggedInUser) {
            leaveCommunity({ memberId: loggedInUserId!, communityId: communityId! })
                .then((response) => {
                    console.log('Member left successfully:', response);
                    dispatch(toggleLeaveCommunityModal());
                    toast.success("You've left the community");
                    navigate('/village');
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Failed to leave member:', error);
                });
        }
    };

    return {
        community,
        stateCommunityId,
        communityId,
        isLoading,
        isSuccess,
        members,
        pendingMembers,
        membersLoading,
        membersError,
        handleCreateCommunity,
        handleAcceptCommunityMember,
        handleRequestCommunityMembership,
        communityPosts: communityFeed,
        communityFeedsLoading,
        communityFeedsSuccess,
        isLeader,
        activeMembers,
        loggedInUserId,
        handleLeaveCommunity,
        leaveLoading,
        leaveSuccess,
        leaveError,
        isMember,
    };
}
