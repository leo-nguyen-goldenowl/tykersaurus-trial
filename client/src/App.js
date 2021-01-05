import * as React from 'react'
import { Provider } from 'react-redux'
import { isTablet, isBrowser } from 'react-device-detect'
import { ToastContainer, Flip } from 'react-toastify'
import configureStore from './configureStore'

import DashboardPage from 'pages/Dashboard'

import './libs/reactifyCss'

const { store } = configureStore()

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        transition={Flip}
        newestOnTop
      />
      <div className='App'>
        {isTablet || isBrowser ? (
          <DashboardPage />
        ) : (
          <div className='not-support-mobile'>
            <p>Not support on mobile</p>
          </div>
        )}
      </div>
    </Provider>
  )
}

export default App
