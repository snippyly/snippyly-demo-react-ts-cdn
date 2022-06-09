import { Snippyly as SnippylyClient } from '@snippyly/types';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import StreamView from './components/StreamView/StreamView';
import Toolbar from './components/Toolbar/Toolbar';
import { SnippylyContext } from './context/SnippylyContext';
import loadSnippyly from './loadSnippyly';

declare var Snippyly: SnippylyClient;

function App() {

  const [client, setClient] = useState<SnippylyClient>(null as any);

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

    // To enable text comment feature
    const commentElement = client.getCommentElement();
    commentElement.enableTextComments(true);
  }

  return (
    <SnippylyContext.Provider value={{ client }}>
      <div>
        <snippyly-cursor></snippyly-cursor>
        <snippyly-comments-sidebar></snippyly-comments-sidebar>
        <snippyly-comment-tool>
          <div className='add-comment-btn'>
            <img src='https://cdn-icons-png.flaticon.com/512/727/727570.png' alt='Add comment' />
          </div>
        </snippyly-comment-tool>
        <Toolbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/stream-view" element={<StreamView />} />
        </Routes>
      </div>
    </SnippylyContext.Provider>
  );
}

export default App;
