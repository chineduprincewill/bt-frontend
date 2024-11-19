import { useUnFollowProfileMutation, useUpdateConnectionMutation } from '../../../api/connectionApi';
import CancelIcon from '../../../assets/close-circle.svg';
import ModalContainer from '../../../components/ModalContainer';
import Spinner from '../../../components/Spinner';
import { ConnectionType } from '../../../types/connection';

interface ConnectionModalProps {
    type: ConnectionType;
    connectionId: string;
    actionType?: 'cancel-request' | 'rejected' | 'unfollow';
    username: string;
    onCloseModal: () => void;
    // onRequestUpdated: (username: string, type: 'accepted' | 'rejected') => void;
    onSuccess: (e: string) => void;
}
const ConnectionModal = ({ onCloseModal, onSuccess, username, type, actionType, connectionId }: ConnectionModalProps) => {
    const [unfollowConnection, { isLoading: isUnfollowConnectionLoading }] = useUnFollowProfileMutation();
    const [updateConnection, { isLoading: isUpdateConnectionLoading }] = useUpdateConnectionMutation();

    async function onUnfollowUser() {
        try {
            await unfollowConnection({ username }).unwrap();
            onSuccess(connectionId);
            onCloseModal();
        } catch (error) {
            console.log(error);
        }
    }

    async function onUpdateRequest(acceptance: 'accepted' | 'rejected') {
        try {
            await updateConnection({ username, type: acceptance }).unwrap();
            onSuccess(connectionId);
            onCloseModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ModalContainer>
            <div className="bg-white rounded-[10px] px-4 md:px-8 py-[54px] max-w-[436px] min-w-72">
                <img src={CancelIcon} className="w-12 h-12 mx-auto mb-3" />
                {type === 'connections' && actionType === 'unfollow' && (
                    <>
                        <div className="text-sm font-semibold text-center text-textPrimary">
                            Are you sure you want to <span className="text-primary-red">unfollow </span>
                            <br /> {username}?
                        </div>
                        <div className="flex gap-4 mt-12 justify-content">
                            <button className="btn-rounded bg-textPrimary" onClick={() => onUpdateRequest('rejected')}>
                                {isUpdateConnectionLoading ? <Spinner width="10px" height="10px" /> : 'Yes, Unfollow'}
                            </button>
                            <button className="text-black border-black border px-4 border-solid rounded-3xl" onClick={onCloseModal}>
                                No, Cancel
                            </button>
                        </div>
                    </>
                )}
                {type === 'requested' && actionType === 'cancel-request' && (
                    <>
                        <div className="text-sm font-semibold text-center text-textPrimary">
                            Are you sure you want to <span className="text-primary-red">cancel connection request to</span>
                            <br /> {username}?
                        </div>

                        <div className="flex justify-center gap-4 mt-12">
                            <button className="btn-rounded bg-textPrimary" onClick={onUnfollowUser}>
                                {isUnfollowConnectionLoading ? <Spinner width="10px" height="10px" /> : 'Yes, Cancel'}
                            </button>
                            <button className=" text-black border-black border px-4 border-solid rounded-3xl" onClick={onCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </>
                )}
                {type === 'requests' && actionType === 'rejected' && (
                    <>
                        <div className="text-sm font-semibold text-center text-textPrimary">
                            Are you sure you want to <span className="text-primary-red">ignore connection request </span>from {username}?
                        </div>
                        <div className=" flex gap-4 mt-12 justify-content">
                            <button className="btn-rounded bg-textPrimary" onClick={() => onUpdateRequest('rejected')}>
                                {isUpdateConnectionLoading ? <Spinner width="10px" height="10px" /> : 'Yes, Ignore'}
                            </button>
                            <button className=" text-black border-black px-4 border border-solid rounded-3xl" onClick={onCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </ModalContainer>
    );
};

export default ConnectionModal;
