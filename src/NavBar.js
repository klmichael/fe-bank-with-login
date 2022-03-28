import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import QuickLogIn from './QuickLogIn';
import UserContext from './UserContext';

function NavBar(){
  const {user} = useContext(UserContext);

  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
       <Link className="navbar-brand" to="/">{user ? `Welcome, ${user.name}!` : "Home"}</Link>
      
       <button 
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarNav"
         aria-controls="navbarNav" 
         aria-expanded="false" 
         aria-label="Toggle navigation"
         >
           <span className="navbar-toggler-icon"></span>
       </button>

       <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
         <div className="navbar-nav">
           <Link className="nav-item nav-link" to="LogIn/">Log In</Link>
           <Link className="nav-item nav-link" to="CreateAccount/">Create Account</Link>
           <Link className="nav-item nav-link" to="Deposit/">Deposit</Link>
           <Link className="nav-item nav-link" to="Withdraw/">Withdraw</Link>
           <Link className="nav-item nav-link" to="AllData/">All Data</Link>
         </div>
         <QuickLogIn />
       </div>
     </nav>
  );
}

export default NavBar;