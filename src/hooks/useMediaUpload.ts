import { useState } from 'react';
import { toast } from 'react-toastify';

import { SERVER_URL } from '../constants';
import { ApiResponse, CustomProgressState, MediaContentMetadata, MediaContentUploadInfo, MediaUploadResponse } from '../types/common';
import { ParseFormData } from '../utils/utils';

interface UseMediaUploadProps {
    infoUploadUrl: string;
    onSuccessfulUpload: () => void;
}

export default function useMediaUpload({ infoUploadUrl, onSuccessfulUpload = () => {} }: UseMediaUploadProps) {
    const [uploadProgress, setUploadProgress] = useState<number[]>([]);
    const [progressState, setProgressState] = useState<CustomProgressState[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<MediaContentMetadata[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const uploadMediaInfo = async <T extends object>(contents: MediaContentUploadInfo & T) => {
        try {
            const res = await fetch(`${SERVER_URL}/${infoUploadUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(contents),
            });

            if (!res.ok) {
                const errorRes = await res.json();
                throw new Error(errorRes.message);
            }

            const uploadStatus = await res.json();
            return uploadStatus as ApiResponse<MediaUploadResponse>;
        } catch (e) {
            setError(e as Error);
            throw e;
        }
    };

    const uploadMedia = async (contents: MediaContentUploadInfo, files?: MediaContentMetadata[]) => {
        if (!contents || contents.contents.length === 0) {
            setProgressState([]);
            setLoading(false);
            onSuccessfulUpload();
            return;
        }

        setLoading(true);

        setProgressState(contents.contents.map((_) => 'preparing'));

        try {
            const uploadStatus = await uploadMediaInfo(contents);
            const newLinks: Record<string, string> = {};
            //     const filesToBeUploaded = contents.contents.map(content => content.)

            uploadStatus.data.preSignedUrlData.forEach((signedUrlData: any) => {
                newLinks[signedUrlData.fileName] = signedUrlData.preSignedUrl;
            });

            const fileNames = Object.keys(newLinks);
            let uploadsCompleted = 0;

            fileNames.forEach((fileName, index) => {
                const uploadLink = newLinks[fileName];
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', uploadLink);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            uploadsCompleted++;
                            if (uploadsCompleted === fileNames.length) {
                                setProgressState((prev) => {
                                    const newProgressState = [...prev];
                                    newProgressState[index] = 'done';
                                    return newProgressState;
                                });
                                onSuccessfulUpload();
                                setLoading(false);
                            }
                        } else {
                            console.error(`Upload failed with status: ${xhr.status}`);
                            toast.error('Error uploading content');
                            setProgressState((prev) => {
                                const newProgressState = [...prev];
                                newProgressState[index] = 'error';
                                return newProgressState;
                            });
                            setLoading(false);
                        }
                    }
                };
                xhr.upload.onprogress = (event) => {
                    setProgressState((prev) => {
                        const newProgressState = [...prev];
                        newProgressState[index] = 'uploading';
                        return newProgressState;
                    });
                    const percentage = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress((prev) => {
                        const newProgress = [...prev];
                        newProgress[index] = percentage;
                        return newProgress;
                    });
                };
                console.log({ selectedFiles });
                const body = ParseFormData({
                    file: files ? files[index].file : selectedFiles[index].file,
                });

                xhr.send(body);

                //     uploadPromises.push(
                //         new Promise<void>((resolve, reject) => {
                //             xhr.onload = () => {
                //                 if (xhr.status === 200) {
                //                     resolve();
                //                 } else {
                //                     reject(new Error(`Upload failed with status: ${xhr.status}`));
                //                 }
                //             };
                //             xhr.onerror = () => {
                //                 reject(new Error('Upload error'));
                //             };
                //         }),
                //     );
            });

            // await Promise.all(uploadPromises);
        } catch (error: any) {
            console.error(error);
            setLoading(false);
            toast.error(error?.message || 'Unable to upload content');
            setProgressState((prev) => prev.map((_) => 'error'));
        }
    };

    function onSelectFiles(files: MediaContentMetadata[]) {
        setSelectedFiles(files);
    }

    return { error, loading, uploadMedia, progressState, uploadProgress, onSelectFiles, selectedFiles };
}
