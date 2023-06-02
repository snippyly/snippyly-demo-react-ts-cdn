import { useVeltClient } from '@veltdev/react';
import React, { useEffect, useState } from 'react';

function Presence() {

    const [presenceUsers, setPresenceUsers] = useState<any[]>([]);

    const { client } = useVeltClient();

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