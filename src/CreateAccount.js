import React, { useEffect, useState, useContext } from 'react';
import Card from './Card';
import { Accounts } from './Accounts';
import BankForm from './BankForm';
import UserContext from './UserContext';

function CreateAccount(){
    const [alert, setAlert] = useState('');
    const [show, setShow] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setDisabled] = useState(true);
    const { user } = useContext(UserContext);
    
    useEffect(function canSubmit() {
      if (email === "" || name ==="" || password ==="") {
        setDisabled(true);
        return;
      }
      setDisabled(false);
    }, [email, name, password]);

    function validate(allFields) {
      //First, verify there are no blank fields.
      const blankValue = Object.values(allFields).includes("");
      if (blankValue) {
        setAlert({className: "alert alert-warning", strong: "Error! ", text: "All fields are required."});
        return false;
      }
      //Then, verify that the email address doesn't already have an account.
      if(Accounts.map(account => account.email).includes(allFields.email)) {
        setAlert({className: "alert alert-danger", strong: "Error! ", text: "Account already exists."});
        return false;
      }
      //Then, verify that the password is at least 8 characters long.
      if(allFields.password.length <8 ) {
        setAlert({className: "alert alert-warning", strong: "Error! ", text: "Password must be at least 8 characters in length."});
        return false;
      }
      //Finally, generate a success alert.
      setAlert({className: "alert alert-success", strong: "Success! ", text: "In order to use this account you must now log in."});
      setTimeout((() => setAlert(null)), 5000)
      return true;
    }

    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setAlert('');
      setShow(true);
    }

    function handleCreate(){
      if (!validate({name, email, password})) {
        return;
      } else {
        Accounts.push({name,email,password,balance:100.00,active:true});
        setShow(false);
      }
    } 

    return (
      <>
      {alert && 
        <div className={alert.className} role="alert">
          <strong>{alert.strong}</strong>{alert.text}
        </div>
      }
      {user ? (
        <Card
          bgcolor="danger"
          header="Create an Account"
          text="In order to use this feature you must first log out of the current account."
        />
      ):(
        <Card
              bgcolor="primary"
              header="Create Account"
              text="Use this form to create a new account."
              body={<BankForm 
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onClick={handleCreate}
                buttonLabel="Create Account"
                isDisabled={isDisabled}
                show={show}
                successClick={clearForm}
                successLabel="Add Another Account" 
              />}
        />
      )}
      </>
    );
}

export default CreateAccount;