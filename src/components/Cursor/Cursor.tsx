import React, { useEffect, useState } from 'react';
import { useSnippylyClient } from '../../context/SnippylyContext';

function Cursor() {

    const [cursorUsers, setCursorUsers] = useState<any[]>([]);

    const { client } = useSnippylyClient();

    useEffect(() => {
        if (client) {
            getLiveCursorsOnCurrentDocument();
        }
    }, [client]);

    const getLiveCursorsOnCurrentDocument = () => {
        const cursorElement = client.getCursorElement();
        cursorElement.getLiveCursorsOnCurrentDocument().subscribe((_cursorUsers: any) => {
            setCursorUsers(_cursorUsers);
        });
    }

    return (
        <div>
            {
                cursorUsers.map((cursorUser) => {
                    return (
                        <div key={cursorUser.userId}>
                            {/* Add custom UI code here */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Cursor;