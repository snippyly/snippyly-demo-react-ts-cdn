import React, { useEffect, useState } from 'react';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import { SnippylyContext } from './context/SnippylyContext';
import loadSnippyly from './loadSnippyly';

declare var Snippyly: any;

function App() {

  const [snippyly, setSnippyly] = useState<any>(null);

  useEffect(() => {
    // Load snippyly from cdn using script
    loadSnippyly(() => {
      initSnippyly();
    })
  }, [])

  // Once snippyly is loaded, call this method to initialize Snippyly with your api key
  const initSnippyly = async () => {
    const snippyly = await Snippyly.init('TA66fUfxZVtGBqGxSTCz'); // Add your Api Key here
    setSnippyly(snippyly);
  }

  return (
    <SnippylyContext.Provider value={{ snippyly }}>
      <div>
        <snippyly-cursor></snippyly-cursor>
        <Toolbar />
      </div>
    </SnippylyContext.Provider>
  );
}

export default App;
