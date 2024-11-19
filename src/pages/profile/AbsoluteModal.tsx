import CloseButton from '../../assets/close.png';
import ModalContainer from '../../components/ModalContainer';

export const AbsoluteModal = ({
    text,
    heading,
    setShow,
    show,
}: {
    setShow: (show: boolean) => void;
    show: boolean;
    text: string;
    heading: string;
}) => {
    return (
        <>
            {show && (
                <ModalContainer>
                    <div
                        className="absolute-modal flex-column centralize-x centralize-y"
                        style={{
                            display: 'flex',
                        }}
                    >
                        <div className="modal-content">
                            <p className="heading">{heading}</p>
                            <p className="text">{text}</p>
                            <button
                                className="close"
                                style={{
                                    position: 'absolute',
                                    top: 20,
                                    right: 20,
                                }}
                                onClick={() => setShow(false)}
                            >
                                <img src={CloseButton} alt="" />
                            </button>
                        </div>
                    </div>
                </ModalContainer>
            )}
        </>
    );
};
