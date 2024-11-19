import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import { useGetSingleMasterclassQuery, useUpdateMasterclassDetailsMutation } from '../../../../../../api/masterclass';
import useMediaUpload from '../../../../../../hooks/useMediaUpload';
import { getMediaMetadata, transformFileMetaToMediaContent } from '../../../../../../utils/utils';
import { IFieldValues } from '../../MasterClassUpload.types';

export default function useMasterClassDropzoneLayout() {
    const {
        uploadProgress,
        progressState,
        uploadMedia,
        onSelectFiles,
        selectedFiles,
        loading: isPending,
    } = useMediaUpload({
        infoUploadUrl: 'masterclass/upload/content',
        onSuccessfulUpload: onFilesUploaded,
    });

    const { id } = useParams();

    const [uploadMasterclass, { isLoading }] = useUpdateMasterclassDetailsMutation();

    const { data, isLoading: isFetchingMasterclass, fulfilledTimeStamp } = useGetSingleMasterclassQuery(id!);

    const [formValues, setFormValues] = useState<IFieldValues>({ title: '', category: '', description: '' });

    useEffect(() => {
        if (data) {
            setFormValues((prev) => ({
                title: data.data.title,
                description: data.data.description,
                category: data.data.category,
            }));
        }
    }, [fulfilledTimeStamp]);

    function onChangeFieldValue(name: string, value: string | string[]) {
        setFormValues((previous) => ({ ...previous, [name]: value }));
    }

    async function onDropFile(e: File[], index: 0 | 1) {
        const filesMetadata = await getMediaMetadata(e);

        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles[index] = filesMetadata[0];

        onSelectFiles(newSelectedFiles);
    }

    async function onFilesUploaded() {
        try {
            await uploadMasterclass({ ...formValues, masterclassId: id! }).unwrap();
            toast.success('Masterclass uploaded successfully');
        } catch (error) {
            toast.error('Unable to upload content');
            console.log(error);
        }
    }

    function onSubmit() {
        uploadMedia(transformFileMetaToMediaContent(selectedFiles, { masterclassId: id! }));
    }

    const isSubmitButtonDisabled =
        !formValues.category ||
        !formValues.title ||
        !selectedFiles.find((file) => file.content.contentType === 'video') ||
        (progressState.length > 0 && progressState.some((state) => state === 'preparing' || state === 'uploading'));

    return {
        uploadProgress,
        progressState,
        uploadMedia,
        onSelectFiles,
        selectedFiles,
        formValues,
        onDropFile,
        onSubmit,
        onChangeFieldValue,
        isLoading: isLoading || isPending || isFetchingMasterclass,
        isSubmitButtonDisabled,
        executive: data?.data?.instructor?.user,
    };
}
