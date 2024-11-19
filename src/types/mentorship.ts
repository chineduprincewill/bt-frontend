import { DAYS_OF_WEEK } from '../utils/constants';

export interface IAvailabilityFormValue {
    dayOfWeek: (typeof DAYS_OF_WEEK)[number];
    timeSlots: { start: string; end: string }[];
}

export interface ISetAvailabilityRequest {
    weeklyAvailability: IAvailabilityFormValue[];
    timeZone: string;
}

export interface ISetAvailabilityResponse extends ISetAvailabilityRequest {
    createdAt: string;
    updatedAt: string;
    id: string;
    profileId: string;
    // availability: Daili;
}

export interface MentorshipResponse {
    status: string;
    message: string;
    data: MentorshipData[];
}

export interface SingleMentorshipResponse {
    status: string;
    message: string;
    data: MentorshipData;
}

export interface MentorshipData {
    id: string;
    title: string;
    description: string;
    category: string;
    expertise: string;
    duration: number;
    startDate: string;
    endDate: string;
    status: string;
    mentorId: string;
    createdAt: string;
    updatedAt: string;
    mentor: Mentor;
    reason: string;
    requestVideoUrl: string;
    meetingLink: string;
}

export interface Mentor {
    id: string;
    bio: string;
    user: {
        username: string;
        id: string;
        firstName: string;
        lastName: string;
        displayImage: string;
    };
}

export interface MentorshipRequestResponse {
    status: string;
    message: string;
    data: {
        id: string;
        mentorshipId: string;
        menteeId: string;
        status: string;
        chosenDate: string;
        chosenTime: string;
        reason: string;
        updatedAt: string;
        createdAt: string;
        mentorId: string | null;
    };
}

export interface MentorshipRequestPayload {
    mentorshipId: string;
    chosenDate: Date | null | string;
    chosenTime: string;
    reason: string;
    uploadKey: string;
}

export interface MentorshipRequest {
    mentorship: MentorshipData;
    id: string;
    menteeId: string;
    mentorshipId: string;
    status: string;
    reason: string;
    chosenDate: string;
    chosenTime: string;
    createdAt: string;
    updatedAt: string;
    mentorId: string | null;
    meetingLink: string;
    mentee: Mentee;
}

interface User {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    displayImage?: string | null;
}

interface Mentee {
    id: string;
    bio: string | null;
    user: User;
}

export interface MentorshipRequestsResponse {
    status: string;
    message: string;
    data: MentorshipRequest[];
}

export interface SingleMentorshipRequestResponse {
    status: string;
    message: string;
    data: MentorshipRequest;
}

/** LEAVE BELOW FOR ME -SIGNED MARV*/
interface TimeSlot {
    start: string;
    end: string;
}

interface WeeklyAvailability {
    dayOfWeek: string;
    timeSlots: TimeSlot[];
}

interface UserProfile {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    displayImage: string;
}

interface Profile {
    id: string;
    user: UserProfile;
}

interface Availability {
    id: string;
    profileId: string;
    weeklyAvailability: WeeklyAvailability[];
    timeZone: string;
    createdAt: string;
    updatedAt: string;
    profile: Profile;
}

export interface ProfileAvailabilityResponseMentorship {
    status: string;
    message: string;
    data: {
        availability: Availability;
        bookedSlots: any[];
    };
}
