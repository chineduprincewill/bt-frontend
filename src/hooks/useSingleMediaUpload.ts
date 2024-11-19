import { useState } from 'react';
import { toast } from 'react-toastify';

import { SERVER_URL } from '../constants';
import { ApiResponse, CustomProgressState, MediaContentMetadata, MediaSingleUploadResponse, MediaUploadInfo } from '../types/common';
import { ParseFormData } from '../utils/utils';

interface UseMediaUploadProps {
    infoUploadUrl: string;
    onSuccessfulUpload: (uploadStatusResponse: MediaSingleUploadResponse) => void;
}

export default function useSingleMediaUpload({ infoUploadUrl, onSuccessfulUpload = () => {} }: UseMediaUploadProps) {
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [progressState, setProgressState] = useState<CustomProgressState>('idle');
    const [selectedFile, setSelectedFile] = useState<MediaContentMetadata | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const uploadSingleMediaInfo = async <T extends object>(content: MediaUploadInfo & T) => {
        try {
            const res = await fetch(`${SERVER_URL}/${infoUploadUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(content),
            });

            if (!res.ok) {
                const errorRes = await res.json();
                throw new Error(errorRes.message);
            }

            const uploadStatus = await res.json();
            return uploadStatus as ApiResponse<MediaSingleUploadResponse>;
        } catch (e) {
            setError(e as Error);
            throw e;
        }
    };

    const uploadSingleMedia = async <T extends object>(content: MediaUploadInfo & T) => {
        if (!content) {
            setProgressState('done');
            setLoading(false);
            onSuccessfulUpload({
                instructions: '',
                preSignedUrl: '',
                uploadKey: '',
            });
            return;
        }

        setLoading(true);

        setProgressState('preparing');

        try {
            const uploadStatus = await uploadSingleMediaInfo(content);

            const preSignedUrl = uploadStatus.data.preSignedUrl;
            const uploadLink = uploadStatus.data.uploadKey;

            const xhr = new XMLHttpRequest();

            xhr.open('PUT', preSignedUrl);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        setProgressState('done');
                        setLoading(false);
                        onSuccessfulUpload(uploadStatus.data);
                    } else {
                        console.error(`Upload failed with status: ${xhr.status}`);
                        toast.error('Error uploading content');
                        setProgressState('error');
                        setLoading(false);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                setProgressState('uploading');
                const percent = Math.round((event.loaded / event.total) * 100);
                setUploadProgress(percent);
            };

            const body = ParseFormData({ file: selectedFile?.file });

            xhr.send(body);
        } catch (error: any) {
            console.error(error);
            setLoading(false);
            toast.error(error?.message || 'Unable to upload content');
            setProgressState('error');
        }
    };

    function onSelectFile(file: MediaContentMetadata | null) {
        setSelectedFile(file);
    }

    return {
        error,
        loading,
        uploadMedia: uploadSingleMedia,
        progressState,
        uploadProgress,
        onSelectFile,
        selectedFile,
    };
}
