export interface Village {
    id: string;
    name: string;
    banner: string | null;
    description: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    createdAt: string;
    updatedAt: string;
    membersCount: number;
}

export interface VillagesResponse {
    status: string;
    message: string;
    data: Village[];
}

export interface VillageResponse {
    status: string;
    message: string;
    data: {
        village: Village;
        isMember: boolean;
    };
}

export interface VillageMembershipResponse {
    status: string;
    message: string;
    data: VillageMembershipData;
}

interface VillageMembershipData {
    id: string;
    status: string;
    villageBadge: string;
    communityBadge: string;
    memberId: string;
    villageId: string;
    updatedAt: string;
    createdAt: string;
    communityId: string | null;
}

export interface VillageMemberUserDetails {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    displayImage: string | null;
}

export interface VillageMember {
    id: string;
    bio: string | null;
    user: VillageMemberUserDetails;
}

export interface VillageMemberData {
    id: string;
    villageId: string;
    communityId: string | null;
    memberId: string;
    status: string;
    villageBadge: string;
    communityBadge: string;
    createdAt: string;
    updatedAt: string;
    member: VillageMember;
}

export interface AllMembersResponse {
    status: string;
    message: string;
    data: VillageMemberData[];
}
