import React, { useEffect, useState } from 'react';
import { useSnippylyClient } from '../../context/SnippylyContext';

function Presence() {

    const [presenceUsers, setPresenceUsers] = useState<any[]>([]);

    const { client } = useSnippylyClient();

    useEffect(() => {
        if (client) {
            getOnlineUsersOnCurrentDocument();
        }
    }, [client]);

    const getOnlineUsersOnCurrentDocument = () => {
        const presenceElement = client.getPresenceElement();
        presenceElement.getOnlineUsersOnCurrentDocument().subscribe((_presenceUsers: any) => {
            setPresenceUsers(_presenceUsers);
        });
    }

    return (
        <div>
            {
                presenceUsers.map((presenceUser) => {
                    return (
                        <div key={presenceUser.userId}>
                            {/* Add custom UI code here */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Presence;