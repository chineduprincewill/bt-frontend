import { useGetSingleMasterclassQuery } from '../../../../api/masterclass';

export default function useMasterClassView(id: string) {
    const { data: singleMasterclassResponse, isLoading } = useGetSingleMasterclassQuery(id);
    const singleMasterclass = singleMasterclassResponse?.data;

    return { singleMasterclass, isLoading };
}
