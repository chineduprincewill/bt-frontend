import './commingSoon.scss';

import { useDispatch, useSelector } from 'react-redux';

import ModalContainer from '../../components/ModalContainer';
// import { useNavigate } from "react-router-dom";
import { toggleCommingSoonModal } from '../../state/slices/commingSoon';
import { RootState } from '../../state/store';

export const CommingSoon = ({ externalControl }: { externalControl?: { show: boolean; close: () => void } }) => {
    const { show } = useSelector((state: RootState) => state.comingSoon);
    const dispatch = useDispatch();

    return (
        <>
            {(externalControl?.show ?? show) && (
                <ModalContainer>
                    <div className="comming-soon max-width">
                        <div className="vh max-width">
                            <div className="flex-column centralize-y modal">
                                <h3>This feature is coming soon!</h3>
                                <p className="desc">
                                    Get ready for something exciting! Our new feature is just around the corner. Keep an eye on your inbox – we'll
                                    drop you a line with the latest updates!
                                </p>

                                <div className="cta">
                                    {/* <button className="back-home" onClick={() => navigate('/profile')}>Back home</button> */}
                                    <p
                                        className="cancel"
                                        onClick={() => {
                                            dispatch(toggleCommingSoonModal({ show: false }));
                                            externalControl?.close();
                                        }}
                                    >
                                        Cancel
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalContainer>
            )}
        </>
    );
};
