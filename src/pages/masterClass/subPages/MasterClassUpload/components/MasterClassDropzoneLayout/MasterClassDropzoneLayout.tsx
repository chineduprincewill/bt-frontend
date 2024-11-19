import DropdownSearch from '../../../../../../components/DropdownSearch';
import UploadPreview from '../../../../../../components/UploadPreview/UploadPreview';
import { MASTERCLASS_CATEGORIES } from '../../../../../../utils/constants';

import MasterClassThumbnailDropzone from './components/MasterClassThumbnailDropzone';
import MasterClassVideoDropzone from './components/MasterClassVideoDropzone';
import useMasterClassDropzoneLayout from './useMasterClassDropzoneLayout';

export default function MasterClassDropzoneLayout() {
    const {
        uploadProgress,
        progressState,
        executive,
        onSubmit,
        onSelectFiles,
        selectedFiles,
        isSubmitButtonDisabled,
        formValues,
        onDropFile,
        onChangeFieldValue,
    } = useMasterClassDropzoneLayout();

    return (
        <>
            <div className="flex gap-4 flex-col">
                <MasterClassVideoDropzone onDropFiles={(file) => onDropFile(file, 0)} />
                <MasterClassThumbnailDropzone onDropFiles={(file) => onDropFile(file, 1)} />
            </div>
            <div>
                <div className="flex flex-col gap-4 ">
                    {selectedFiles[0] && (
                        <UploadPreview
                            file={selectedFiles[0]}
                            onRemoveFile={() => onSelectFiles([])}
                            progress={uploadProgress[0]}
                            progressState={progressState[0]}
                        />
                    )}
                    <section className="flex flex-col gap-4">
                        <label htmlFor="title" className="text-base font-medium text-black">
                            Title
                        </label>
                        <input
                            id="title"
                            // value={formValues.title}
                            onChange={(e) => onChangeFieldValue('title', e.target.value)}
                            placeholder="Ex. How I created X to achieve Y"
                            className="w-full p-4 placeholder:text-accent-3 text-sm font-medium border rounded-[10px] border-solid border-lightGray-6 text-black"
                        />
                    </section>
                    <section className="flex flex-col gap-4">
                        <label className="text-base font-medium text-black">Executive</label>
                        <div className="bg-lightGray-7 opacity-50 cursor-not-allowed rounded-[10px] p-4">
                            {executive?.firstName + ' ' + executive?.lastName}
                        </div>
                    </section>
                    <section className="flex flex-col gap-4">
                        <label htmlFor="title" className="text-base font-medium text-black">
                            Brief description
                        </label>
                        <textarea
                            id="title"
                            rows={4}
                            value={formValues.description}
                            onChange={(e) => onChangeFieldValue('description', e.target.value)}
                            placeholder="Enter a brief description about the session"
                            className="w-full p-4 placeholder:text-accent-3 text-sm font-medium border rounded-[10px] border-solid border-lightGray-6 text-black"
                        />
                    </section>
                    <section className="flex flex-col gap-4">
                        <label className="text-base font-medium text-black">Category</label>
                        <DropdownSearch
                            value={formValues.category}
                            onChange={(e) => onChangeFieldValue('category', e)}
                            options={MASTERCLASS_CATEGORIES}
                        />
                    </section>
                </div>
                <button className="w-full mt-16 btn-rounded bg-primary-red" disabled={isSubmitButtonDisabled} onClick={onSubmit}>
                    Proceed
                </button>
            </div>
        </>
    );
}
