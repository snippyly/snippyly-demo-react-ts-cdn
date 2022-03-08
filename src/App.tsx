import React, { useEffect, useState } from 'react';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import { SnippylyContext } from './context/SnippylyContext';
import loadSnippyly from './loadSnippyly';

declare var Snippyly: any;

function App() {

  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    // Load snippyly from cdn using script
    loadSnippyly(init);
  }, [])

  // Callback function that is called once Snippyly SDK is loaded.
  const init = async () => {
    const snippyly = await Snippyly.init('TA66fUfxZVtGBqGxSTCz', {
      featureAllowList: [], // To allow specific features only
      userIdAllowList: [], // To allow specific users only
      urlAllowList: [], // To allow snippyly in specific screens only
    }); // Add your Api Key here
    setClient(snippyly);
  }

  return (
    <SnippylyContext.Provider value={{ client }}>
      <div>
        <snippyly-cursor></snippyly-cursor>
        <Toolbar />
      </div>
    </SnippylyContext.Provider>
  );
}

export default App;
