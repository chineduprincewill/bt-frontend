import React from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../../../../../../../../assets/upload-icon.svg';

interface IMasterClassThumbnailDropzone {
    onDropFiles: (e: File[]) => void;
}

export default function MasterClassThumbnailDropzone({ onDropFiles }: IMasterClassThumbnailDropzone) {
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop: onDropFiles,
        maxFiles: 1,
        multiple: false,
        accept: { 'image/*': [] },
    });

    const dropzoneBgColor = () => {
        if (isDragActive && isDragReject) return '#EA2E49';
        if (isDragActive) return '#76CD26';
        return '#F2F2F2';
    };

    return (
        <div
            {...getRootProps()}
            style={{
                backgroundColor: dropzoneBgColor(),
            }}
            className="'rounded-[10px] border-dashed border border-black/30 flex relative flex-col justify-center items-center p-8 ring-offset-6 bg-lightGray-7"
        >
            <input className="invisible inset-0 absolute z-20" {...getInputProps()} />
            <div>
                <img src={UploadIcon} alt="upload icon" className="w-[68px] h-[68px] mx-auto" />
                <p className="text-lightGray-2 font-medium text-center mt-2.5 leading-5">Select Thumbnail</p>
            </div>
        </div>
    );
}
