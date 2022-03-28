import React, {useContext, useEffect, useState} from 'react';
import Card from './Card';
import { Accounts } from './Accounts';
import BankForm from './BankForm';
import UserContext from './UserContext';

function LogIn(){
    const [alert, setAlert] = useState('');
    const [show, setShow] = useState(true);
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
        setAlert({className: "alert alert-warning", strong: "Error! ", text: "All fields are required."});
        return false;
      }
      //Verify that the email address has an account...
      if (Accounts.map(account => account.email).includes(allFields.email)) {
        //...and if so, verify that the provided password is correct
        let userIndex = Accounts.map(account => account.email).indexOf(allFields.email);
        if(Accounts[userIndex].password === allFields.password) {
          //Then update the current user and give a success message;
          let currentUser = Accounts[userIndex];
          login(currentUser);
          setAlert({className: "alert alert-success", strong: "Success! ", text: "You successfully logged in."});
          setTimeout((() => setAlert(null)), 5000);
          return true;
        }
      }
      
      //If either the email or the password is incorrect, alert the user.
      setAlert({className: "alert alert-danger", strong: "Error! ", text: "Email or password does not match the accounts on file."});
      return false;
    }

    function logUserOut(){
      logout();
      setEmail('');
      setPassword('');
      setAlert('');
      setShow(true);
    }

    function handleCreate(){
      if (!validate({email, password})) {
        return;
      } else {
        //True validation handles login - update show state here.
        setShow(false);
        console.log(user);
      }
    } 

    return (
      <>
      {alert && 
        <div className={alert.className} role="alert">
          <strong>{alert.strong}</strong>{alert.text}
        </div>
      }
      <Card
              bgcolor="primary"
              header="Log In"
              text={user ? ("Please use the button below to log out when you are done banking."): ("Use this form to log in to your existing account.")}
              body={<BankForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onClick={handleCreate}
                buttonLabel="Log In"
                isDisabled={isDisabled}
                show={user ? false : show}
                successClick={logUserOut}
                successLabel="Log Out" 
              />}
        />
      </>
    );
}

export default LogIn;