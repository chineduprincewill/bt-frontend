import { useGetAllCommunitiesQuery } from 'api/communityApi';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';

export default function useCommunities(searchValue = '') {
    const { data: communitiesData, isLoading, isSuccess, refetch } = useGetAllCommunitiesQuery(searchValue);
    const communities = communitiesData?.data;
    console.log('COMMUNITIES', communities);

    // const isMember = members?.find((member) => member.member.id === loggedInUserId);

    return {
        communities,
        isLoading,
        isSuccess,
        refetch,
    };
}
