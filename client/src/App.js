import * as React from 'react'
// import { Provider } from "react-redux";
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
        <DashboardPage />
      </div>
    </>
    // </Provider>
  )
}

export default App
