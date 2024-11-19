import React from 'react';
import { Accept } from 'react-dropzone';

import DocumentUploadIcon from '@assets/document-upload.svg';
import RedCloseCircle from '@assets/red-close-circle.svg';
import { MediaContentMetadata } from '@type/common';

import useJobUploadItem from './useJobUploadItem';

export interface IJobUploadItem {
    title: string;
    subTItle: string;
    onDropFile: (files: File[]) => void;
    file: MediaContentMetadata | null;
    onRemoveFile: () => void;
    accept?: Accept;
}

export default function JobUploadItem({ title, subTItle, onDropFile, file, onRemoveFile, accept }: IJobUploadItem) {
    const { dragBgColor, getInputProps, getRootProps } = useJobUploadItem({ onDropFile, accept });

    return (
        <div
            className="py-2.5 px-6 bg-lightGray-7 rounded-10 flex flex-col md:flex-row gap-4 items-center justify-between"
            {...getRootProps()}
            style={{ backgroundColor: dragBgColor }}
        >
            <div className="flex flex-col items-center gap-5 md:flex-row">
                <img src={DocumentUploadIcon} alt="upload document" className="w-11 h-11" />
                <div className="flex flex-col gap-1.5">
                    {file ? (
                        <h5 className="text-base font-medium">{file.file.name}</h5>
                    ) : (
                        <>
                            <h5 className="text-base font-medium">{title}</h5>
                            <p className="text-sm font-medium text-accent-7">{subTItle}</p>
                        </>
                    )}
                </div>
            </div>
            {!file && (
                <div className="relative w-full md:w-max">
                    <input className="absolute inset-0 z-20 invisible" />
                    <button className="btn-rounded bg-black !px-[18px] !rounded-10 w-full md:w-max">Upload</button>
                </div>
            )}
            {file && (
                <button
                    w-full
                    md:w-max
                    className="rounded-[10px] px-2 py-2.5"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFile();
                    }}
                >
                    <span className="flex gap-2 px-4 py-2 text-sm text-primary-red">
                        <img src={RedCloseCircle} className="h-[18px] w-[18px]" alt="cancel icon" />
                        Delete
                    </span>
                </button>
            )}
        </div>
    );
}
