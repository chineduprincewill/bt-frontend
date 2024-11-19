import React from 'react';
import ModalContainer from '../../../../components/ModalContainer';
import CloseIcon from '../../../../assets/close-icon.svg';
import { MASTERCLASS_CATEGORIES, MENTORSHIP_STATUSES, MENTORSHIP_EXPERTISE } from '../../../../utils/constants';
import useCreateSessionModal from './useCreateSessionModal';
import DropdownSearch from '../../../../components/DropdownSearch';
import { useCreateMentorshipSessionMutation } from '../../../../api/mentorship';
import { toast } from 'react-toastify';

interface ICreateSessionModal {
    children: React.ReactNode;
}

export default function CreateSessionModal({ children }: ICreateSessionModal) {
    const { formValues, onChangeFieldValue, showModal, setShowModal } = useCreateSessionModal();
    const [createMentorshipSession, { isLoading, isError, isSuccess }] = useCreateMentorshipSessionMutation();

    const handleSubmit = async () => {
        try {
            // Prepare payload
            const payload = {
                title: formValues.title,
                description: formValues.description,
                category: formValues.category,
                expertise: formValues.expertise,
                status: formValues.status,
                duration: 60,
                startDate: formValues.startDate,
                endDate: formValues.endDate,
            };

            await createMentorshipSession(payload).unwrap();

            toast.success('Mentorship session created successfully');

            setShowModal(false);
        } catch (error) {
            // Show error message
            toast.error('Failed to create mentorship session. Please try again later.');
        }
    };

    return (
        <>
            <div role="button" onClick={() => setShowModal(true)}>
                {children}
            </div>
            {showModal && (
                <ModalContainer>
                    <div className="bg-white h-max my-auto rounded-[10px] px-4 md:px-8 py-[54px] max-w-[436px] min-w-72 w-full">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-medium text-black"> Create a session</h3>
                            <img onClick={() => setShowModal(false)} src={CloseIcon} className="w-6 h-6" role="button" />
                        </div>
                        <div>
                            <div className="flex flex-col gap-4 mt-16">
                                <section className="flex flex-col gap-4">
                                    <label htmlFor="title" className="text-base font-medium text-black">
                                        Session title
                                    </label>
                                    <input
                                        id="title"
                                        onChange={(e) => onChangeFieldValue('title', e.target.value)}
                                        placeholder="Ex. How I created X to achieve Y"
                                        className="w-full p-4 placeholder:text-accent-3 text-sm font-medium border rounded-[10px] border-solid border-lightGray-6 text-black"
                                    />
                                </section>

                                <section className="flex w-full gap-4">
                                    <div>
                                        <label>Start Date</label>
                                        <input
                                            id="startDate"
                                            type="date"
                                            value={formValues.startDate}
                                            onChange={(e) => onChangeFieldValue('startDate', e.target.value)}
                                            placeholder="Ex. How I created X to achieve Y"
                                            className="w-full p-4 placeholder:text-accent-3 text-sm font-medium border rounded-[10px] border-solid border-lightGray-6 text-black mt-2"
                                        />
                                    </div>

                                    <div>
                                        <label>End Date</label>
                                        <input
                                            id="endDate"
                                            type="date"
                                            value={formValues.endDate}
                                            onChange={(e) => onChangeFieldValue('endDate', e.target.value)}
                                            placeholder="Ex. How I created X to achieve Y"
                                            className="w-full p-4 placeholder:text-accent-3 text-sm font-medium border rounded-[10px] border-solid border-lightGray-6 text-black mt-2"
                                        />
                                    </div>
                                </section>

                                <section className="flex flex-col gap-4">
                                    <label htmlFor="description" className="text-base font-medium text-black">
                                        Brief Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        onChange={(e) => onChangeFieldValue('description', e.target.value)}
                                        placeholder="Enter a brief description about the session"
                                        className="w-full p-4 placeholder:text-accent-3 text-sm font-medium border rounded-[10px] border-solid border-lightGray-6 text-black"
                                    />
                                </section>
                                <section className="flex flex-col gap-4">
                                    <label className="text-base font-medium text-black">Category</label>
                                    <DropdownSearch
                                        value={formValues.category}
                                        onChange={(e) => onChangeFieldValue('category', e as string)}
                                        options={MASTERCLASS_CATEGORIES}
                                    />
                                </section>
                                <section className="flex flex-col gap-4">
                                    <label className="text-base font-medium text-black">Status</label>
                                    <DropdownSearch
                                        value={formValues.status}
                                        onChange={(e) => onChangeFieldValue('status', e as string)}
                                        options={MENTORSHIP_STATUSES}
                                    />
                                    {/* <select
                                        className=" w-full p-4 placeholder:text-accent-3 text-sm font-medium border rounded-[10px] border-solid border-lightGray-6 text-black mt-2"
                                        name="status"
                                        id="status"
                                    >
                                        <option value={'Expert'}>Pending</option>
                                        <option value={'Intermediate'}>Active</option>
                                    </select> */}
                                    {/* <option value={'Beginner'}></option> */}
                                </section>
                                <section className="flex flex-col gap-4">
                                    <label className="text-base font-medium text-black">Expertise</label>
                                    <DropdownSearch
                                        value={formValues.expertise}
                                        onChange={(e) => onChangeFieldValue('expertise', e as string)}
                                        options={MENTORSHIP_EXPERTISE}
                                    />
                                </section>
                            </div>
                            <button disabled={isLoading} onClick={handleSubmit} className="w-full mt-16 btn-rounded bg-primary-red">
                                {isLoading ? 'Creating...' : 'Proceed'}
                            </button>
                        </div>
                    </div>
                </ModalContainer>
            )}
        </>
    );
}
