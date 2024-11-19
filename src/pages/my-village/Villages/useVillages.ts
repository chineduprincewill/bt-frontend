import { useGetAllVillagesQuery } from 'api/villageApi';

export default function useVillages(searchValue = '') {
    const sample = 'ah';
    const { data: villagesData, isLoading, isSuccess } = useGetAllVillagesQuery(searchValue);
    const villages = villagesData?.data;
    console.log(villages);

    return {
        sample,
        villages,
        isLoading,
        isSuccess,
    };
}
