import { useDropzone } from 'react-dropzone';
import { IJobUploadItem } from './JobUploadItem';
import { dropzoneBgColor } from '@utils/utils';

interface IUseJobUploadItem extends Partial<IJobUploadItem> {}

export default function useJobUploadItem({ onDropFile, accept }: IUseJobUploadItem) {
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop: onDropFile,
        maxFiles: 1,
        multiple: false,
        accept: accept || {
            'application/pdf': [],
            'application/msword': [], // DOC format
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [], // DOCX format
        },
    });

    const dragBgColor = dropzoneBgColor(isDragActive, isDragReject);

    return { dragBgColor, getRootProps, getInputProps };
}
