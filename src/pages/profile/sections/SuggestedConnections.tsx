import './suggestedConnection.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetSuggestedConnectionsQuery } from '../../../api/connectionApi';
import ProfileIcon2 from '../../../assets/profile2.png';
import { Circle } from '../../../components/Circle';
import { GoToProfile } from '../../../components/GoToProfile';
import Spinner from '../../../components/Spinner';

export const SuggestedConnections = ({ demo }: { demo?: string }) => {
    demo;
    const navigate = useNavigate();
    const { data: getSuggestedConnections, isLoading: getSuggestedConnectionsIsLoading } = useGetSuggestedConnectionsQuery(undefined);

    const [connections, setConnections] = useState<
        {
            image: string;
            name: string;
            position: string;
            username: string;
            profileId: string;
        }[]
    >([]);

    useEffect(() => {
        if (getSuggestedConnections?.data) {
            setConnections(
                getSuggestedConnections.data.map((connection) => ({
                    image: connection.user.displayImage ?? ProfileIcon2,
                    name: connection.user.firstName + ' ' + connection.user.lastName,
                    position: connection.bio,
                    username: connection.user.username,
                    profileId: connection.id,
                })),
            );
        }
    }, [getSuggestedConnections?.data]);

    return (
        <div className="connection __suggested_connection section flex-column align-y border-solid border border-[#E9E9E9] max-w-[366px] p-5 rounded-xl">
            <div className="header flex-row centralize-y space_btw">
                <p className="section-header" style={{ fontWeight: 500, fontSize: 16 }}>
                    Suggested connections
                </p>
                {/* <p className="see_all">See all</p> */}
            </div>
            {getSuggestedConnectionsIsLoading ? (
                <Spinner width="20px" height="20px" />
            ) : (
                connections.map((connection, index) => (
                    <GoToProfile userId={connection.profileId} username={connection.username} key={index}>
                        <div className="connection-details flex-row centralize-y">
                            <Circle bg="white" height={40} width={40} key={1} noMg style={{ marginRight: 15 }} img={connection.image} pd={0} />
                            <div className="details">
                                <p className="name">{connection.name}</p>
                                <p className="position">
                                    {
                                        connection.position?.length > 0 ?
                                        (connection.position?.length > 25 ? connection.position?.slice(0, 25) + '...' : connection.position) :
                                        '...'
                                    }
                                </p>
                            </div>
                        </div>
                    </GoToProfile>
                ))
            )}
        </div>
    );
};
