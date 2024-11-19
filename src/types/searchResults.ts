export interface SearchResultParams {
    name: string;
    userType: 'creative' | 'executive' | 'vendor';
    position: string;
    location: string;
    profileImage?: string;
    id: string;
    userName: string;
}
