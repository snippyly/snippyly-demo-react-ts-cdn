// import { Velt as VeltClient } from '@veltdev/types';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import StreamView from './components/StreamView/StreamView';
import Toolbar from './components/Toolbar/Toolbar';
// import { VeltContext } from './context/VeltContext';
// import loadVelt from './loadVelt';
import { VeltCommentsSidebar, VeltCommentTool, VeltCursor, VeltHuddle, VeltHuddleTool, VeltProvider, VeltRecorderControlPanel, VeltRecorderNotes, VeltRecorderTool } from '@veltdev/react';
import { Velt } from '@veltdev/types';

function App() {

  // Callback function that is called once Velt SDK is loaded.
  const init = async (client?: Velt) => {
    if (client) {
      // To enable text comment feature
      const commentElement = client.getCommentElement();
      commentElement.enableTextComments();
      // Enable attachment feature
      commentElement.enableAttachment();
      // Show screen size info
      commentElement.enableDeviceInfo();
      // To enable live selection feature
      const selectionElement = client.getSelectionElement();
      selectionElement.enableLiveSelection();
    }
  }

  const excludeVeltParamsFromUrl = (url: string) => {
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
    <VeltProvider apiKey='TA66fUfxZVtGBqGxSTCz'
      config={{
        // featureAllowList: ['presence', 'cursor'],
        // userIdAllowList: ['abcd'],
        // urlAllowList: [],
      } as any} documentId={excludeVeltParamsFromUrl(window.location.href)} onClientLoad={(client) => init(client)}>
      <div>
        <VeltCursor avatarMode={true} />
        <VeltCommentsSidebar />
        <VeltCommentTool />
        <Toolbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/stream-view" element={<StreamView />} />
        </Routes>
      </div>
    </VeltProvider>
  );
}

export default App;
