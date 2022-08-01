import React, { useEffect, useState } from 'react';
import { useSnippylyClient } from '../../context/SnippylyContext';
import { Users } from '../../Users';

function Toolbar() {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const users = Users;

    const { client } = useSnippylyClient();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setSelectedUser(JSON.parse(localStorage.getItem('user')!));
        }
    }, [])

    useEffect(() => {
        // To call identifySnippyly once Snippyly is loaded and user is available
        if (selectedUser && client) {
            identifySnippyly();
        }
    }, [selectedUser, client])

    // To set user in Snippyly
    const identifySnippyly = async () => {
        if (client) {
            client.identify(selectedUser).then(() => {
                // User login successful
            }).catch(() => {
                // User login failure
            });
        }
    }

    const signIn = (user: any): void => {
        // Add custom logic here to login user
        // Once user is available call identifySnippyly
        localStorage.setItem('user', JSON.stringify(user));
        setSelectedUser(user);
    }

    const signOut = async () => {
        if (client) {
            await client.signOutUser();
        }
        localStorage.removeItem('user');
        window.location.reload();
    }

    const navigateTo = (path: string, target: string = '_self') => {
        window.open(path, target);
    }

    return (
        <div className='header'>
            <snippyly-presence></snippyly-presence>
            <div className='menu-container'>
                <span className='menu' onClick={() => navigateTo('/')}>Home</span>
                <span className='menu' onClick={() => navigateTo('/stream-view')}>Stream View</span>
                <span className='menu' onClick={() => navigateTo('https://snippyly-demo-react-ts-cdn-wdp.web.app/', '_blank')}>Document Params</span>
            </div>
            <div>
                {
                    selectedUser ?
                        <div>
                            <span>Hi, {selectedUser?.name}</span>
                            <button className='custom-btn' onClick={() => signOut()}>Sign Out</button>
                        </div>
                        :
                        <div>
                            <span>Sign In with:</span>
                            {
                                users.map((user) => {
                                    return (
                                        <button key={user.userId} className='custom-btn' onClick={() => signIn(user)}>{user?.name}</button>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Toolbar;