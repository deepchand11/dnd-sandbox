import * as React from 'react';
import initialData from './initialData';
import { layoutReducer } from './layout.reducer';

const LayoutContext = React.createContext();

function LayoutProvider({ children }) {
    const [state, dispatch] = React.useReducer(layoutReducer, initialData)
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = { state, dispatch }
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

function useLayoutContext() {
    const context = React.useContext(LayoutContext)
    if (context === undefined) {
      throw new Error('useLayoutContext must be used within a LayoutProvider')
    }
    return context
  }

export { LayoutProvider, useLayoutContext }