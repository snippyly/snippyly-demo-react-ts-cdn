import { Snippyly as SnippylyClient } from '@snippyly/types';
import React, { useEffect, useState } from 'react';
import './App.css';
import Tabs from './components/Tabs/Tabs';
import Toolbar from './components/Toolbar/Toolbar';
import { SnippylyContext } from './context/SnippylyContext';
import loadSnippyly from './loadSnippyly';

declare var Snippyly: SnippylyClient;

function App() {

  const [client, setClient] = useState<SnippylyClient>(null as any);

  const [selectedMenu, setSelectedMenu] = useState();

  useEffect(() => {
    // Load snippyly from cdn using script
    loadSnippyly(init);
  }, [])

  // Callback function that is called once Snippyly SDK is loaded.
  const init = async () => {
    const client = await Snippyly.init('TA66fUfxZVtGBqGxSTCz', {
      featureAllowList: [], // To allow specific features only
      userIdAllowList: [], // To allow specific users only
      urlAllowList: [], // To allow snippyly in specific screens only
    }); // Add your Api Key here
    setClient(client);
  }

  return (
    <SnippylyContext.Provider value={{ client }}>
      <div>
        <snippyly-cursor></snippyly-cursor>
        <snippyly-comments></snippyly-comments>
        <snippyly-comment-tool>
          <div className='add-comment-btn'>
            <img src='https://cdn-icons-png.flaticon.com/512/727/727570.png' alt='Add comment' />
          </div>
        </snippyly-comment-tool>
        <Toolbar onMenuSelect={(menu: any) => setSelectedMenu(menu)} />
        <Tabs selectedMenu={selectedMenu} />
      </div>
    </SnippylyContext.Provider>
  );
}

export default App;
