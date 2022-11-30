import { Snippyly as SnippylyClient } from '@snippyly/types';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import StreamView from './components/StreamView/StreamView';
import Toolbar from './components/Toolbar/Toolbar';
// import { SnippylyContext } from './context/SnippylyContext';
// import loadSnippyly from './loadSnippyly';
import { Snippyly as SnippylyReact, SnippylyCommentsSidebar, SnippylyCommentTool, SnippylyCursor, SnippylyHuddle, SnippylyHuddleTool, SnippylyRecorderControlPanel, SnippylyRecorderNotes, SnippylyRecorderTool, useSnippylyClient } from '@snippyly/sdk-react-staging';

declare var Snippyly: SnippylyClient;

function App() {

  // const [client, setClient] = useState<SnippylyClient>(null as any);
  const { client } = useSnippylyClient();

  useEffect(() => {
    console.log('client', client)
  }, [client]);

  useEffect(() => {
    // Load snippyly from cdn using script
    // loadSnippyly(init);
  }, [])

  // Callback function that is called once Snippyly SDK is loaded.
  const init = async (client: SnippylyClient) => {
    // const client = await Snippyly.init('TA66fUfxZVtGBqGxSTCz', {
    //   featureAllowList: [], // To allow specific features only
    //   userIdAllowList: [], // To allow specific users only
    //   urlAllowList: [], // To allow snippyly in specific screens only
    // }); // Add your Api Key here
    // setClient(client);

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
    // <SnippylyContext.Provider value={{ client }}>
    <SnippylyReact apiKey='TA66fUfxZVtGBqGxSTCz' onLoadSnippyly={(snippyly) => init(snippyly)}
      config={{
        // featureAllowList: ['presence', 'cursor'],
        // userIdAllowList: ['abcd'],
        // urlAllowList: [],
        debugMode: false
      }}>
      <div>
        {/* <snippyly-cursor></snippyly-cursor>
        <snippyly-comments-sidebar></snippyly-comments-sidebar>
        <snippyly-comment-tool></snippyly-comment-tool> */}
        <SnippylyCursor avatarMode={true} />
        <SnippylyCommentsSidebar />
        <SnippylyCommentTool />
        <Toolbar />
        <div className='toolbar-2'>
          <div className="recorder-buttons">
            <div>Recorders:</div>
            {/* <snippyly-recorder-tool type="all"></snippyly-recorder-tool>
            <snippyly-recorder-tool type="audio"></snippyly-recorder-tool>
            <snippyly-recorder-tool type="video"></snippyly-recorder-tool>
            <snippyly-recorder-tool type="screen"></snippyly-recorder-tool> */}
            <SnippylyRecorderTool type="all" />
            <SnippylyRecorderTool type="audio" />
            <SnippylyRecorderTool type="video" />
            <SnippylyRecorderTool type="screen" />
          </div>
          <div className="huddle-buttons">
            <div>Huddle:</div>
            {/* <snippyly-huddle-tool type="all"></snippyly-huddle-tool>
            <snippyly-huddle-tool></snippyly-huddle-tool>
            <snippyly-huddle-tool type="video"></snippyly-huddle-tool>
            <snippyly-huddle-tool type="presentation"></snippyly-huddle-tool> */}
            <SnippylyHuddleTool type="all" />
            <SnippylyHuddleTool />
            <SnippylyHuddleTool type="video" />
            <SnippylyHuddleTool type="presentation" />
          </div>
        </div>
        {/* <snippyly-recorder-control-panel></snippyly-recorder-control-panel> */}
        <SnippylyRecorderControlPanel />
        {/* <snippyly-recorder-notes></snippyly-recorder-notes> */}
        <SnippylyRecorderNotes />
        {/* <snippyly-huddle></snippyly-huddle> */}
        <SnippylyHuddle />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/stream-view" element={<StreamView />} />
        </Routes>
      </div>
    </SnippylyReact>
    // </SnippylyContext.Provider>
  );
}

export default App;
