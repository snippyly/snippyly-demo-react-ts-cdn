import { createContext, useContext } from 'react';

export const SnippylyContext = createContext<{ snippyly: any }>({ snippyly: null });

export function useSnippyly() {
    return useContext(SnippylyContext);
}