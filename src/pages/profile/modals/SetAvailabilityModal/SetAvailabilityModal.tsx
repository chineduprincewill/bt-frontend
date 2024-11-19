import ClickOutsideWrapper from '../../../../components/ClickOutWrapper';
import ModalContainer from '../../../../components/ModalContainer';
import CloseIcon from '../../../../assets/close-icon.svg';
import DropdownSearch from '../../../../components/DropdownSearch';
import { DAYS_OF_WEEK } from '../../../../utils/constants';
import { ProfileBox } from '../../../../components/ProfileBox';
import Mgt from '../../../../assets/Mgt.svg';
import TimeSlotPicker from './components/TimeSlotPicker';
import useSetAvailabilityModal from './useSetAvailabilityModal';
import IconInput from '../../../../components/IconInput';

export default function SetAvailabilityModal() {
    const { formValues, setShowModal, onChangeFieldValue, onAddSlot, onRemoveSlot, isLoading, showModal, onSetAvailability } =
        useSetAvailabilityModal();

    return (
        <>
            <ProfileBox
                onClick={() => setShowModal(true)}
                children={<img src={Mgt} height={50} width={50} />}
                title="Manage availability"
                subtitle="Seamlessly manage your availability with a few clicks."
            />
            {showModal && (
                <ModalContainer>
                    <div className="bg-white h-full overflow-auto my-auto rounded-[10px] px-4 md:px-8 py-[54px] max-w-[436px] min-w-72 w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-1 flex-col">
                                <h3 className="text-2xl font-medium text-black">Set your Availability</h3>
                                <p className="text-[#5B5B5B] font-medium">Select a time at which you're available</p>
                            </div>
                            <img onClick={() => setShowModal(false)} src={CloseIcon} className="w-6 h-6" role="button" />
                        </div>
                        <section className="flex flex-col gap-4 mt-16">
                            <label className="text-base font-medium text-black">Time Zone</label>
                            <IconInput disabled value={Intl.DateTimeFormat().resolvedOptions().timeZone} />
                        </section>
                        <section className="flex flex-col gap-4 mt-16">
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-medium text-black">Weekly hours</label>
                                <p className="text-[#5B5B5B] font-medium">Select a time at which you're available</p>
                            </div>
                            {DAYS_OF_WEEK.map((day, index) => (
                                <TimeSlotPicker
                                    dayIndex={index}
                                    dayOfWeek={day}
                                    timeSlots={formValues[index].timeSlots || []}
                                    onAddSlot={onAddSlot}
                                    onRemoveSlot={onRemoveSlot}
                                    onChangeFieldValue={onChangeFieldValue}
                                />
                            ))}
                        </section>
                        <button disabled={isLoading} className="w-full mt-16 btn-rounded bg-primary-red" onClick={onSetAvailability}>
                            Set Availability
                        </button>
                    </div>
                </ModalContainer>
            )}
        </>
    );
}
