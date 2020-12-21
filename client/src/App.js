// import { Provider } from "react-redux";
import { ToastContainer, Flip } from "react-toastify";

import "./libs/reactifyCss";

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
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </>
    // </Provider>
  );
}

export default App;
