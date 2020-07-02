import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/store'
import Chart from './components/Chart'

const App = () => {
  return (
      <Provider store={store}>
        <div className="App">
            <Chart />
        </div>
      </Provider>
  );
}

export default App;
