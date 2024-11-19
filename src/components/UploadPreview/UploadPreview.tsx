import useSimulatedProgress from '../../hooks/useSimulatedProgress';
import { CustomProgressState, MediaContentMetadata } from '../../types/common';

interface IUploadPreview {
    progress: number;
    progressState: CustomProgressState;
    file: MediaContentMetadata;
    onRemoveFile?: () => void;
}

export default function UploadPreview({ progress, progressState, file, onRemoveFile }: IUploadPreview) {
    const { name, size } = file.file;
    let progressBarValue = 0;

    const { progress: preparationProgress } = useSimulatedProgress(progressState === 'preparing');

    const uploadedSize = Math.round((progress * size) / 100000);
    const totalSize = Math.round(size / 1000);

    // TODO integrate retry button

    if (progressState === 'preparing') progressBarValue = preparationProgress;
    else if (progressState === 'uploading') progressBarValue = progress;
    else if (progressState === 'done') progressBarValue = 100;
    else if (progressState === 'error') progressBarValue = 0;

    if (!file) return null;

    return (
        <div className="rounded-[10px] border border-solid border-lightGray-6 py-3 px-4">
            <h4 className="font-medium mb-[5px]">{name}</h4>
            <p className="text-sm text-lightGray-2 font-medium">{progressState === 'idle' && 'Ready for upload'}</p>
            <p className="text-sm text-lightGray-2 font-medium">{progressState === 'preparing' && 'Preparing'}</p>
            <p className="text-sm text-lightGray-2 font-medium">{progressState === 'uploading' && `Uploading ${uploadedSize}KB / ${totalSize}KB`}</p>
            <p className="text-sm text-lightGray-2 font-medium">{progressState === 'done' && 'Uploaded successfully'}</p>
            {['done', 'uploading', 'preparing'].includes(progressState) && (
                <div className="h-[5px] bg-lightGray-6 rounded-full mt-[14px]">
                    <div className="bg-primary-red h-full rounded-full" style={{ width: `${progressBarValue}%` }}></div>
                </div>
            )}
            {(!progressState || ['idle', 'error'].includes(progressState)) && (
                <button className="mt-2 text-primary-red" onClick={onRemoveFile}>
                    Remove
                </button>
            )}
        </div>
    );
}
