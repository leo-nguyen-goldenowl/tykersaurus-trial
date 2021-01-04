import * as React from 'react'
// import { Provider } from "react-redux";
import { isTablet, isBrowser } from 'react-device-detect'
import { ToastContainer, Flip } from 'react-toastify'

import DashboardPage from 'pages/Dashboard'

import './libs/reactifyCss'

function App() {
  return (
    // <Provider>
    <>
      <ToastContainer
        autoClose={5000}
        transition={Flip}
        closeButton={false}
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
    </>
    // </Provider>
  )
}

export default App
