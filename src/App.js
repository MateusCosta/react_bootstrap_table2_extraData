import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Analysis from "./pages/Analysis";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Analysis />
      </div>
    </Provider>
  );
}

export default App;
