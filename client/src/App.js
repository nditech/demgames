import React from "react";
// Redux
import { Provider } from "react-redux";
import LandingPage from "./pages/LandingPage/LandingPage";
import "bootstrap/dist/css/bootstrap.css";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <>
        <LandingPage />
      </>
    </Provider>
  );
};

export default App;
