import React, { useReducer, createContext, useContext } from "react";
import initialData from './initialData';
import { layoutReducer } from './layout.reducer';

const LayoutContext = createContext();

function LayoutProvider({ children }) {
    const [state, dispatch] = useReducer(layoutReducer, initialData)
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    //https://devsmitra.medium.com/state-management-with-react-hooks-and-context-api-2968a5cf5c83
    const value = { state, dispatch }
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

function useLayoutContext() {
    const context = useContext(LayoutContext)
    if (context === undefined) {
      throw new Error('useLayoutContext must be used within a LayoutProvider')
    }
    return context
  }

const useDispatch = () => useContext(LayoutContext).dispatch;
const useSelector = (callback) => {
  const state = { ...useContext(LayoutContext).state };
  return callback ? callback(state) : state;
};

export { LayoutProvider, useLayoutContext, useDispatch, useSelector }