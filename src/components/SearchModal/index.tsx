import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
	UserInfoFromApiWithProfileId, useSearchForUsersWithQueryMutation
} from '../../api/userApi';
import BlueRight from '../../assets/blue-right.png';
import CloseButton from '../../assets/close.png';
import ProfileIcon from '../../assets/profile-hd.png';
import RightTopArrow from '../../assets/right-top-arrow.png';
import NoSearchResult from '../../assets/seach-res-not-found.png';
import { toggleSearchModal } from '../../state/slices/searchSlice';
import { toggleSettingsModal } from '../../state/slices/settingsSlice';
// import Spinner from '../Spinner';
import { RootState } from '../../state/store';
import { SearchResultParams } from '../../types/searchResults';
import { Circle } from '../Circle';
import ClickOutsideWrapper from '../ClickOutWrapper';

const SearchResult = (props: SearchResultParams) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let bio = props?.position ?? '';
    // Limit bio to 50 characters
    if (bio.length > 100) {
        bio = bio.substring(0, 60) + '...';
    }

    const showProfile = () => {
        dispatch(toggleSearchModal({ show: false, searchText: '' }));
        navigate('/userprofile/' + props.id + '/' + props.userName);
    };

    return (
        <>
            <div className="flex justify-center w-full">
                <div
                    className="flex w-full justify-between items-center py-2"
                    onClick={() => {
                        dispatch(toggleSearchModal({ show: false, searchText: '' }));
                        dispatch(toggleSettingsModal({ show: false }));
                        // TODO: Add one state obj to control all modals, so it can be used to close all modals
                        showProfile();
                    }}
                >
                    <div
                        className="flex items-center gap-3 md:gap-5"
                        onClick={() => {
                            dispatch(toggleSearchModal({ show: false, searchText: '' }));
                            navigate('/userprofile/' + props.userName);
                        }}
                    >
                        <Circle
                            bg="white"
                            className="md:!w-[92px] md:!h-[92px] !w-10 !h-10 "
                            key={1}
                            noMg
                            style={{ marginRight: '10px !important', border: '1.5px solid #e9e9e9' }}
                            noBorder
                            img={props.profileImage ?? ProfileIcon}
                            pd={0}
                        />

                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <p className="text-sm md:text-xl font-medium mb-[5px]">{props.name}</p>
                                <div className="py-[5px] px-[7px] rounded-[3px] bg-black ml-[10px] uppercase">
                                    <p className="text-white text-[9px] tracking-[2px]">{props.userType}</p>
                                </div>
                            </div>
                            {bio && <p className="text-[9px] md:text-base max-w-[30ch] text-ellipsis overflow-hidden whitespace-nowrap">{bio}</p>}
                            {props?.location && (
                                <p className="uppercase text-[9px] md:text-xs text-black font-bold tracking-[2.4px]">{props.location}</p>
                            )}
                        </div>
                    </div>

                    <div className="">
                        <button className="btn-rounded bg-black hidden md:block" onClick={showProfile}>
                            View Profile
                        </button>
                        <button id="" onClick={showProfile} className="block md:hidden">
                            {' '}
                            <Circle
                                bg="transparent"
                                height={30}
                                width={30}
                                key={1}
                                noMg
                                noBorder
                                style={{ marginRight: '10px !important' }}
                                img={RightTopArrow}
                                pd={0}
                            />{' '}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function SearchModal({ inputValue }: { inputValue: string }) {
    const dispatch = useDispatch();
    const [searchUser, { isLoading, error }] = useSearchForUsersWithQueryMutation();
    const [users, setUsers] = useState<UserInfoFromApiWithProfileId[]>([]);
    const [viewAll, setViewAll] = useState(false);
    const { show } = useSelector((state: RootState) => state.searchResult);

    useEffect(() => {
        if (inputValue && inputValue !== '') {
            searchUser({ query: inputValue })
                .unwrap()
                .then((res) => {
                    console.log({ searchedusers: res.data });
                    // @ts-ignore
                    setUsers(res.data);
                });
        }
        if (inputValue === '') {
            // @ts-ignore
            dispatch(toggleSearchModal({ show: false }));
        }

        if (error) {
            toast.error((error as any).message ?? (error as any).data?.message);
        }
    }, [inputValue, searchUser, error]);

    const usersToShow: UserInfoFromApiWithProfileId[] = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.profile) {
            usersToShow.push(user);
        }
    }

    return (
        <>
            {show && (
                <ClickOutsideWrapper onClickOutside={() => dispatch(toggleSearchModal({ show: false }))}>
                    <div className="w-full p-5">
                        <div className="">
                            <div className="flex justify-center w-full md:w-[75%] mx-auto ">
                                <div className="flex items-center justify-between w-full gap-5 py-3 border-b-[0.5px] border-[#A0A0A0] border-solid">
                                    <p className="text-xs text-center md:text-base">
                                        Search Results - You searched for{' '}
                                        <strong className="italic">{!inputValue || inputValue === '' ? '' : inputValue}</strong> -{' '}
                                        {usersToShow.length} Results
                                    </p>
                                    <button
                                        style={{
                                            border: 0,
                                            backgroundColor: '',
                                        }}
                                        className=""
                                        onClick={() => {
                                            dispatch(toggleSearchModal({ show: false, searchText: '' }));
                                        }}
                                    >
                                        <img src={CloseButton} alt="" />
                                    </button>
                                </div>
                            </div>

                            <div className=" w-full md:w-[75%] mx-auto ">
                                {(!viewAll ? usersToShow.slice(0, 5) : usersToShow).map((result) => (
                                    <SearchResult
                                        key={result.id}
                                        name={`${result.firstName} ${result.lastName}`}
                                        userType={result.role.name as unknown as never}
                                        position={result.profile?.bio ?? ''}
                                        location={result.profile?.location?.value ?? result.profile?.location}
                                        profileImage={result.displayImage}
                                        id={result.profile.id}
                                        userName={result.username}
                                    />
                                ))}
                            </div>


                            {users.length === 0 && (
                                <div className="flex justify-center ">
                                    <div className="">
                                        <Circle
                                            bg="transparent"
                                            height={50}
                                            width={50}
                                            key={1}
                                            noMg
                                            noBorder
                                            style={{ marginRight: '10px !important' }}
                                            img={NoSearchResult}
                                            pd={0}
                                        />

                                        <p
                                            style={{
                                                fontWeight: '500',
                                            }}
                                        >
                                            {' '}
                                            Your search result was not found!
                                        </p>
                                    </div>
                                </div>
                            )}

                            {
                                <div className="flex justify-center w-full pt-5">
                                    <div
                                        className="flex items-center gap-3"
                                        onClick={() => {
                                            if (users.length > 5) {
                                                setViewAll(true);
                                            }
                                        }}
                                    >
                                        <p>{viewAll ? 'Showing all results' : 'See all results'}</p>
                                        {!viewAll && <img src={BlueRight} alt="" />}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </ClickOutsideWrapper>
            )}
        </>
    );
}
