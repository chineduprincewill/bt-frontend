export interface ApiResponse<T> {
    status: 'success' | 'error';
    message: string;
    data: T;
}

export interface ContentUploadRequest {
    url: string;
    contentType: string;
    duration?: number; // Optional, only for videos
}

// @ts-ignore
export interface MediaContentMetadata<T = Record<string, any>> extends object {
    content: ContentUploadRequest;
    file: File;
    extra?: T
}

export type MediaUploadInfo<T = any> = T & {
    mimeType: string;
    fileName: string;
    fileSizeInBytes: number;
    durationInSeconds?: number;
};

export interface MediaContentUploadInfo {
    contents: MediaUploadInfo[];
}

export interface MediaUploadResponse {
    preSignedUrlData: {
        mimeType: string;
        fileSizeInBytes: string;
        durationInSeconds?: number;
        fileName: string;
        preSignedUrl: string;
        uploadKey: string;
        originalName: string;
        uploadClass: string;
        identifier: string;
        extension: string;
    }[];
}

export interface MediaSingleUploadResponse {
    preSignedUrl: string;
    instructions: string;
    uploadKey: string;
}

export type CustomProgressState = 'preparing' | 'uploading' | 'done' | 'idle' | 'error';

export interface ILocationSuggestion {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: {
        islet: string;
        municipality: string;
        county: string;
        ISO3166_2_lvl4: string;
        country: string;
        country_code: string;
    };
    boundingbox: string[];
}
