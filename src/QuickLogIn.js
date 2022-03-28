import React, {useContext, useEffect, useState} from 'react';
import { Accounts } from './Accounts';
import UserContext from './UserContext';

function QuickLogIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setDisabled] = useState(true);
    const {user, login, logout} = useContext(UserContext);
    
    useEffect(function canSubmit() {
      if (email === "" || password ==="") {
        setDisabled(true);
        return;
      }
      setDisabled(false);
    }, [email, password]);

    function validate(allFields) {
      //First, verify there are no blank fields.
      const blankValue = Object.values(allFields).includes("");
      if (blankValue) {
        return false;
      }
      //Verify that the email address has an account...
      if (Accounts.map(account => account.email).includes(allFields.email)) {
        //...and if so, verify that the provided password is correct
        let userIndex = Accounts.map(account => account.email).indexOf(allFields.email);
        if(Accounts[userIndex].password === allFields.password) {
          //Then update the current user;
          let currentUser = Accounts[userIndex];
          login(currentUser);
          return true;
        }
      }
      
      //If either the email or the password is incorrect, return false.
      return false;
    }

    function logUserOut(){
      logout();
      setEmail('');
      setPassword('');
    }

    function handleLogin(){
      validate({email, password}); 
    } 

    return (
      <>
      {user ? (
        <button type="submit" className="btn btn-warning" onClick={logUserOut}>Log Out</button>
      ):(
      <form className="form-inline">
        <input 
            type="email"
            className="form-control-sm"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
        />
        <input 
            type="password"
            className="form-control-sm"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
        />
        <button 
          type="submit" 
          className="btn btn-primary" 
          onClick={handleLogin} 
          id="submit-btn" 
          disabled={isDisabled}>
          Log In
          </button>
      </form>
    )}
    </>
    );
}

export default QuickLogIn;