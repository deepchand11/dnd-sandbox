import React from 'react';
import LayoutContainer from './layouts/LayoutContainer'
import {LayoutProvider} from './context/layout.context'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const App = () => {
  return (
    <LayoutProvider>
          <LayoutContainer/>

    </LayoutProvider>
  )
}

export default App;
