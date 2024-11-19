export interface MasterclassResponse {
    status: string;
    message: string;
    data: MasterClass[];
}

export interface SingleMasterClassResponse {
    status: string;
    message: string;
    data: MasterClass;
}

export interface UpdateMasterclassRequest {
    masterclassId: string
    description: string
    title: string
    category: string
}

export interface MasterClass {
    id: string;
    title: string;
    description: string;
    requiredForMentorship: boolean;
    status: string;
    url: string;
    category: string;
    instructorId: string;
    instructor: {
        bio: null | string;
        id: string;
        user: {
            displayImage: string;
            id: string;
            firstName: string;
            lastName: string;
            username: string;
        };
    };
    createdAt: string;
    updatedAt: string;
    thumbnail: string;
}
