import React from 'react';
import Layout from './Layout';
import LayoutContainer from './LayoutContainer'
import {LayoutProvider} from './layout.context'
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
