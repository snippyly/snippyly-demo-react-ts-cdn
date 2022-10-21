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
    // Enable attachment feature
    commentElement.enableAttachment(true);
    // Show screen size info
    commentElement.showScreenSizeInfo(true);
    // To enable live selection feature
    const selectionElement = client.getSelectionElement();
    selectionElement.enableLiveSelection(true);
    // Set document id
    client.setDocumentId(excludeSnippylyParamsFromUrl(window.location.href));
  }

  const excludeSnippylyParamsFromUrl = (url: string) => {
    try {
      const tempUrl = new URL(url);
      ['review', 'sreviewId', 'snippyly-user', 'scommentId', 'stagId'].forEach((param) => {
        tempUrl.searchParams.delete(param);
      });
      return tempUrl.href;
    } catch (err) {
      return url;
    }
  }

  return (
    <SnippylyContext.Provider value={{ client }}>
      <div>
        <snippyly-cursor></snippyly-cursor>
        <snippyly-comments-sidebar></snippyly-comments-sidebar>
        <snippyly-comment-tool></snippyly-comment-tool>
        <Toolbar />
        <div className='toolbar-2'>
          <div className="recorder-buttons">
            <div>Recorders:</div>
            <snippyly-recorder-tool type="all"></snippyly-recorder-tool>
            <snippyly-recorder-tool type="audio"></snippyly-recorder-tool>
            <snippyly-recorder-tool type="video"></snippyly-recorder-tool>
            <snippyly-recorder-tool type="screen"></snippyly-recorder-tool>
          </div>
          <div className="huddle-buttons">
            <div>Huddle:</div>
            <snippyly-huddle-tool type="all"></snippyly-huddle-tool>
            <snippyly-huddle-tool></snippyly-huddle-tool>
            <snippyly-huddle-tool type="video"></snippyly-huddle-tool>
            <snippyly-huddle-tool type="presentation"></snippyly-huddle-tool>
          </div>
        </div>
        <snippyly-recorder-control-panel></snippyly-recorder-control-panel>
        <snippyly-recorder-notes></snippyly-recorder-notes>
        <snippyly-huddle></snippyly-huddle>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/stream-view" element={<StreamView />} />
        </Routes>
      </div>
    </SnippylyContext.Provider>
  );
}

export default App;
