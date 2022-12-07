// import { Snippyly as SnippylyClient } from '@snippyly/types';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import StreamView from './components/StreamView/StreamView';
import Toolbar from './components/Toolbar/Toolbar';
// import { SnippylyContext } from './context/SnippylyContext';
// import loadSnippyly from './loadSnippyly';
import { SnippylyCommentsSidebar, SnippylyCommentTool, SnippylyCursor, SnippylyHuddle, SnippylyHuddleTool, SnippylyProvider, SnippylyRecorderControlPanel, SnippylyRecorderNotes, SnippylyRecorderTool } from '@snippyly/react';
import { Snippyly } from '@snippyly/types';

function App() {

  // Callback function that is called once Snippyly SDK is loaded.
  const init = async (client?: Snippyly) => {
    if (client) {
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
    }
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
    <SnippylyProvider apiKey='TA66fUfxZVtGBqGxSTCz'
      config={{
        // featureAllowList: ['presence', 'cursor'],
        // userIdAllowList: ['abcd'],
        // urlAllowList: [],
      } as any} documentId={excludeSnippylyParamsFromUrl(window.location.href)} onClientLoad={(client) => init(client)}>
      <div>
        <SnippylyCursor avatarMode={true} />
        <SnippylyCommentsSidebar />
        <SnippylyCommentTool />
        <Toolbar />
        <div className='toolbar-2'>
          <div className="recorder-buttons">
            <div>Recorders:</div>
            <SnippylyRecorderTool type="all" />
            <SnippylyRecorderTool type="audio" />
            <SnippylyRecorderTool type="video" />
            <SnippylyRecorderTool type="screen" />
          </div>
          <div className="huddle-buttons">
            <div>Huddle:</div>
            <SnippylyHuddleTool type="all" />
            <SnippylyHuddleTool />
            <SnippylyHuddleTool type="video" />
            <SnippylyHuddleTool type="presentation" />
          </div>
        </div>
        <SnippylyRecorderControlPanel />
        <SnippylyRecorderNotes />
        <SnippylyHuddle />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/stream-view" element={<StreamView />} />
        </Routes>
      </div>
    </SnippylyProvider>
  );
}

export default App;
