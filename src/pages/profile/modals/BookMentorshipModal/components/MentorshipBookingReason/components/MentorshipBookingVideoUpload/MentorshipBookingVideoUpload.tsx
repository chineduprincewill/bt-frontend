import React from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../../../../../../../../assets/upload-icon.svg';
import { CustomProgressState, MediaContentMetadata } from '../../../../../../../../types/common';
import UploadPreview from '../../../../../../../../components/UploadPreview/UploadPreview';

interface IMentorshipBookingVideoUpload {
    file: MediaContentMetadata | null;
    onDropFiles: (e: File[]) => void;
    progressState: CustomProgressState;
    uploadProgress: number;
    onRemoveFile: () => void
}

export default function MentorshipBookingVideoUpload({ onDropFiles, file, progressState, uploadProgress, onRemoveFile }: IMentorshipBookingVideoUpload) {
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop: onDropFiles,
        maxFiles: 1,
        multiple: false,
        accept: { 'video/*': [] },
    });

    const dropzoneBgColor = () => {
        if (isDragActive && isDragReject) return '#EA2E49';
        if (isDragActive) return '#76CD26';
        return '#F2F2F2';
    };

    return (
        <>
            {file ? (
                <UploadPreview file={file} progress={uploadProgress} progressState={progressState} onRemoveFile={onRemoveFile} />
            ) : (
                <div
                    {...getRootProps()}
                    style={{
                        backgroundColor: dropzoneBgColor(),
                    }}
                    className="'rounded-[10px] flex-1 border-dashed border max-h-[400px] border-black/30 flex relative flex-col justify-center items-center p-8 ring-offset-6 bg-lightGray-7"
                >
                    <input className="invisible inset-0 absolute z-20" {...getInputProps()} />
                    <div>
                        <img src={UploadIcon} alt="upload icon" className="w-[68px] h-[68px] mx-auto" />
                        <p className="text-lightGray-2 font-medium text-center mt-2.5 leading-5">
                            Drag and drop files here or <span className="text-black">browse computer</span>
                        </p>
                    </div>
                    <p className="text-xs text-lightGray-2 text-center mt-8">
                        The video size shouldn't exceed 12MB
                    </p>
                </div>
            )}
        </>
    );
}
