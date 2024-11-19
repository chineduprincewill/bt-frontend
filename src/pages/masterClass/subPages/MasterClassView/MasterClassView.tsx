import PageContainer from '../../../../components/PageContainer';
import VideoPlayer from '../../../../components/VideoPlayer';
import MasterClassTabs from './components/MasterClassTabs';
import { useParams } from 'react-router-dom';
import { formatTheDate } from '../../../../utils/date';
import useMasterClassView from './useMasterClassView';
import ProfileIcon from '../../../../assets/profile-hd.png';

export default function MasterClassView() {
    const { id } = useParams();
    const { singleMasterclass, isLoading } = useMasterClassView(id!);
    console.log(singleMasterclass);

    if (isLoading) {
        return <div>Loading Masterclass...</div>;
    }

    if (!id || !singleMasterclass) {
        return (
            <PageContainer back title="404">
                <div>Masterclass not found!</div>
            </PageContainer>
        );
    }

    return (
        <PageContainer back title={singleMasterclass.title}>
            <VideoPlayer url={singleMasterclass?.url} />
            <div className="px-4">
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-black">{singleMasterclass?.title}</h3>
                    <h5 className="mt-3 text-base font-bold text-accent-4">{singleMasterclass?.category}</h5>
                    <p className="max-w-2xl text-base font-medium text-accent-2">{singleMasterclass?.description}</p>
                    <div className="flex items-center gap-2 mt-6">
                        <img src={singleMasterclass.instructor.user.displayImage ?? ProfileIcon} alt="profile icon" className="rounded-full h-9 w-9" />
                        <div>
                            <p className="text-xs font-medium text-accent">
                                {singleMasterclass?.instructor.user.firstName} {singleMasterclass?.instructor.user.lastName}
                            </p>
                            <p className="mt-0.5 text-xs text-accent-2">
                                {singleMasterclass?.createdAt && formatTheDate(singleMasterclass.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
                <MasterClassTabs />
            </div>
        </PageContainer>
    );
}
