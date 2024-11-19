import { useState } from 'react';

import PageContainer from '@components/PageContainer';

import { ConnectionType } from '../../types/connection';
import ConnectionSection from './ConnectionSection';

const Connections = () => {
    const [currentTab, setCurrentTab] = useState<ConnectionType>('connections');

    return (
        <PageContainer title="Connections">
            <div className="border border-solid border-lightGray rounded-[10px] p-[10px] md:p-8 min-h-[75vh]">
                <div className="tabs pt-[25px] sticky top-0 bg-white">
                    <button className={`tab ${currentTab === 'connections' && 'active'}`} onClick={() => setCurrentTab('connections')}>
                        Connections
                    </button>
                    <button className={`tab ${currentTab === 'connected' && 'active'}`} onClick={() => setCurrentTab('connected')}>
                        Connected
                    </button>
                    <button className={`tab ${currentTab === 'requests' && 'active'}`} onClick={() => setCurrentTab('requests')}>
                        Requests
                    </button>
                    <button className={`tab ${currentTab === 'requested' && 'active'}`} onClick={() => setCurrentTab('requested')}>
                        Requested
                    </button>
                </div>
                <ConnectionSection type={currentTab} />
            </div>
        </PageContainer>
    );
};

export default Connections;
