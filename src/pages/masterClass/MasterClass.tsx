import PageContainer from '../../components/PageContainer';
import MasterClassItem from './components/MasterClassItem';
import useMasterClass from './useMasterClass';
import TopPageBar from '@components/TopPageBar';

export default function MasterClass() {
    const { masterclasses, isLoading, onChangeSearchText, options, handleCategoryChange, resetFilters, isError } = useMasterClass();
    // const [searchQuery, setSearchQuery] = useState<string>('');

    if (isLoading) {
        return (
            <PageContainer title="Masterclass">
                <div>Loading Masterclasses...</div>
            </PageContainer>
        );
    }

    // if (!masterclasses || masterclasses.length === 0) {
    //     return (
    //         <PageContainer title="Masterclass">
    //             <div>No masterclasses available.</div>
    //         </PageContainer>
    //     );
    // }

    if (isError) {
        return <div>An error seems to have occured. Please try again later.</div>;
    }

    return (
        <PageContainer title="Masterclass">
            <div>
                <TopPageBar
                    onChangeSearch={onChangeSearchText}
                    dropdownOptions={options}
                    onChangeCategory={handleCategoryChange}
                    onRefreshFilter={resetFilters}
                />
                {!masterclasses?.length && <div className="py-5">No masterclasses available.</div>}
                <div className="mt-[52px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {masterclasses?.map((masterclass) => <MasterClassItem key={masterclass.id} masterclass={masterclass} />)}
                </div>
            </div>
        </PageContainer>
    );
}
