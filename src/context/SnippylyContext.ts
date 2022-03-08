import { createContext, useContext } from 'react';

export const SnippylyContext = createContext<{ client: any }>({ client: null } as any);

export function useSnippylyClient() {
  return useContext(SnippylyContext);
}