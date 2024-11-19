import MasterClassItem from '../MasterClassItem';
import useMasterClass from '../../useMasterClass';
import PageContainer from '../../../../components/PageContainer';

export default function MasterClassSimilarVideos() {
    const { masterclasses, isLoading } = useMasterClass();

    if (isLoading) {
        return (
            <PageContainer title="Masterclass">
                <div>Loading Masterclasses...</div>
            </PageContainer>
        );
    }

    if (!masterclasses || masterclasses.length === 0) {
        return (
            <PageContainer title="Masterclass">
                <div>No masterclasses available.</div>
            </PageContainer>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {masterclasses.map((masterclass) => (
                <MasterClassItem key={masterclass.id} masterclass={masterclass} />
            ))}
        </div>
    );
}
