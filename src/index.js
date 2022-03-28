import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import AllData from './AllData';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import { UserProvider } from './UserContext';
import './custom.scss';
import LogIn from './LogIn';



function Root() {
  return (
    <HashRouter>
      <NavBar/>
      <div className="container" style={{padding: "20px"}}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/Deposit/" element={<Deposit />} />
          <Route path="/Withdraw/" element={<Withdraw />} />
          <Route path="/LogIn/" element={<LogIn />} />
          <Route path="/AllData/" element={<AllData />} />
        </Routes>
      </div>     
    </HashRouter>
  );
}

ReactDOM.render(
  <UserProvider>
    <Root/>
  </UserProvider>,
  document.getElementById('root')
);
