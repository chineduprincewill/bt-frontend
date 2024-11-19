import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UserInfoFromApiWithProfileId, useSearchForUsersWithQueryMutation } from '../../api/userApi';
import BlueRight from '../../assets/blue-right.png';
import CloseButton from '../../assets/close.png';
import ProfileIcon from '../../assets/profile-hd.png';
import RightTopArrow from '../../assets/right-top-arrow.png';
import NoSearchResult from '../../assets/seach-res-not-found.png';
import { Circle } from '../../components/Circle';
import ClickOutsideWrapper from '../../components/ClickOutWrapper';
import ModalContainer from '../../components/ModalContainer';
import Spinner from '../../components/Spinner';
import { toggleSearchModal } from '../../state/slices/searchSlice';
import { toggleSettingsModal } from '../../state/slices/settingsSlice';
import { RootState } from '../../state/store';

interface SearchResultParams {
    name: string;
    userType: 'creative' | 'executive' | 'vendor';
    position: string;
    location: string;
    profileImage?: string;
    id: string;
    userName: string;
}
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
        <div className="">
            <div className="search-result-content width-wrapper">
                <div className="search-result flex-row centralize-x">
                    <div
                        className="result flex-row centralize-y centralize-x"
                        onClick={() => {
                            dispatch(toggleSearchModal({ show: false, searchText: '' }));
                            dispatch(toggleSettingsModal({ show: false }));
                            // TODO: Add one state obj to control all modals, so it can be used to close all modals
                            showProfile();
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <div
                            className="profile-area flex-row centralize-y"
                            onClick={() => {
                                dispatch(toggleSearchModal({ show: false, searchText: '' }));
                                navigate('/userprofile/' + props.userName);
                            }}
                        >
                            <Circle
                                bg="white"
                                height={50}
                                width={50}
                                key={1}
                                noMg
                                style={{ marginRight: '10px !important', border: '1.5px solid #e9e9e9' }}
                                noBorder
                                img={props.profileImage ?? ProfileIcon}
                                pd={0}
                            />

                            <div className="__details" style={{ marginLeft: '10px' }}>
                                <div className="__name ">
                                    <p className="__name-text">{props.name}</p>
                                    <div className={`__user-type ${props.userType.toLowerCase()}`}>
                                        {' '}
                                        <p>{props.userType}</p>{' '}
                                    </div>
                                </div>
                                <p className="__position">{bio}</p>
                                <p className="__location">{props?.location}</p>
                            </div>
                        </div>
                        <div className="open-res-button">
                            <button id="open-result" onClick={showProfile}>
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
            </div>
        </div>
    );
};

export const SearchModal = ({ inputValue }: { inputValue?: string }) => {
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
            dispatch(toggleSearchModal({ show: false, searchText: '' }));
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
                <div className="__search-bar z-[500]">
                    <div className="result-container flex-column centralize-y centralzie-x">
                        <div className="width-wrapper">
                            <div className="search-result-header flex-row centralize-y centralize-x" style={{ position: 'relative' }}>
                                <p className="">
                                    Search Results - You searched for <strong>{!inputValue || inputValue === '' ? '' : inputValue}</strong> -{' '}
                                    {usersToShow.length} Results
                                </p>
                                <button
                                    style={{
                                        border: 0,
                                        backgroundColor: '',
                                    }}
                                    className="close-search"
                                    onClick={() => {
                                        dispatch(toggleSearchModal({ show: false, searchText: '' }));
                                    }}
                                >
                                    <img src={CloseButton} alt="" />
                                </button>
                            </div>
                        </div>

                        <div
                            className={`width-wrapper results ${viewAll ? 'view-all' : ''} flex-column`}
                            style={{
                                position: 'relative',
                                alignItems: 'center',
                            }}
                        >
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

                        {isLoading && <Spinner />}

                        {users.length === 0 && (
                            <div
                                className=" width-wrapper flex-row"
                                style={{
                                    margin: '30px 0',
                                }}
                            >
                                <div className="illustration flex-row centralize-y">
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
                            <div className="bar-footer">
                                <div
                                    className="flex-row centralize-x centralize-y"
                                    style={{
                                        cursor: !viewAll ? 'pointer' : 'text',
                                    }}
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
            )}
        </>
    );
};
