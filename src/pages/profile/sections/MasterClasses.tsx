import { useState } from 'react';
import ArrowRight from '../../../assets/arrow-right_dark.png';
import { useDispatch, useSelector } from 'react-redux';
import { CompleteProfileButton } from '../CompleteProfileButton';
import { NoRecord } from '..';
import { toggleCommingSoonModal } from '../../../state/slices/commingSoon';
import MasterClassRequestModal from '../modals/MasterClassRequestModal';
import RequestMasterclassIcon from '../../../assets/request-masterclass.svg';
import { useGetAllMasterclassesQuery } from '../../../api/masterclass';
import { useNavigate, useParams } from 'react-router-dom';
import PlayIcon from '../../../assets/play-icon.svg';
import { RootState } from '../../../state/store';
import { MasterclassResponse, SingleMasterClassResponse } from '../../../types/masterclass';
import { togglePublishModal } from '../../../state/slices/modals';
import PublishVideoModal from '../../../components/PublishVideoModal';

type SingleMasterclass = SingleMasterClassResponse['data'];

export const MasterClasses = ({
    view,
    masterclassess,
}: {
    view: 'owner' | 'user';
    masterclassess?: {
        title: string;
        description: string;
        duration: string;
    }[];
}) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const [selectedMasterclass, setSelectedMasterclass] = useState<SingleMasterclass | null>(null);
    const profileId = view === 'owner' ? loggedUser?.profile?.id : id;

    const { data: allMasterclassesResponse, isLoading, isError, error } = useGetAllMasterclassesQuery({ profileId });

    const listOfMasterClasses = allMasterclassesResponse?.data || [];

    console.log('LIST OF AVAILABLE MASTERCLASSES', listOfMasterClasses);

    const [showRequestModal, setShowRequestModal] = useState<boolean>(false);

    const handleCloseModal = () => {
        setShowRequestModal(false);
    };

    const publishVideoModal = useSelector((state: RootState) => state.modals.showPublishModal);

    function onClickMasterclass(masterclass: SingleMasterclass) {
        if (view === 'owner') {
            setSelectedMasterclass(masterclass);
            dispatch(togglePublishModal());
        } else {
            navigate(`/masterclass/${masterclass.id}`);
        }
    }

    return (
        <>
            {publishVideoModal && (
                <PublishVideoModal
                    isOpen={publishVideoModal}
                    onClose={() => dispatch(togglePublishModal())}
                    masterclass={selectedMasterclass as SingleMasterclass}
                    // onPublish={() => dispatch(togglePublishModal())}
                />
            )}
            {showRequestModal && <MasterClassRequestModal onClose={handleCloseModal} />}
            <div className="masterclassess section">
                <p className="section-header">Masterclasses</p>
                {view === 'owner' && (
                    <div className="flex gap-6 items-center justify-between mt-[50px]" role="button" onClick={() => setShowRequestModal(true)}>
                        <div className="flex items-center gap-6">
                            <img src={RequestMasterclassIcon} alt="request masterclass" className="w-[60px] h-[60px]" />
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-medium">Request to upload masterclass</h4>
                                <p className="text-[#8E8E8E] font-medium">Request to make a masterclass</p>
                            </div>
                        </div>
                        <img src={ArrowRight} alt="request masterclass" className="w-6 h-6" />
                    </div>
                )}

                {listOfMasterClasses.length !== 0 ? (
                    <div className="available-masterclass max-h-96 overflow-y-auto">
                        <p className="header">Available masterclasses</p>
                        {listOfMasterClasses.map((masterclass, index) => (
                            <div className="masterclass flex-row centralize-y items-center" key={index}>
                                <img src={PlayIcon} alt="" className="icon" />
                                <div className="details items-center">
                                    <p className="title !text-black max-w-[10ch] leading-5">{masterclass.title}</p>
                                    {/* <p className="duration">{masterclass.duration}</p> */}
                                </div>
                                <button
                                    onClick={() => onClickMasterclass(masterclass)}
                                    className={`btn-rounded !rounded-full ${
                                        view === 'owner' && masterclass.status !== 'Approved' ? 'btn-disabled' : ''
                                    }`}
                                    disabled={view === 'owner' && masterclass.status !== 'Approved'}
                                >
                                    {view === 'owner'
                                        ? masterclass.status === 'Published'
                                            ? 'Published'
                                            : masterclass.status === 'Requested'
                                            ? 'Requested'
                                            : 'Uploaded'
                                        : 'Take'}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoRecord />
                )}
            </div>
        </>
    );
};
