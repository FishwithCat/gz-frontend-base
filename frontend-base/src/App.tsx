import React, { Fragment } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css'; 

const App: React.FC = () => {
  return (
    <div className="App">
      this is base
            <BrowserRouter>
                <Fragment>
                    <Switch>
                        {/* <Route exact path="/" component={MyTask} /> */}
                    </Switch>
                </Fragment>
            </BrowserRouter>
    </div>
  );
}

export default App;
