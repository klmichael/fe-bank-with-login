import React, {useContext, useState, useEffect} from 'react';
import Card from './Card';
import BankForm from './BankForm';
import UserContext from './UserContext';

function Deposit(){
  const [alert, setAlert] = useState('');
  const [show, setShow] = useState(true);
  const [isDisabled, setDisabled] = useState(true);
  const [amount, setAmount] = useState('');
  const {user} = useContext(UserContext);

  useEffect(function canSubmit() {
    if (amount === "") {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [amount]);

  function validate(amount) {
    //First, verify there is an amount and it is more than $0.
    if (amount === "" || parseFloat(amount) <= 0) {
      setAlert({className: "alert alert-warning", strong: "Error! ", text: "You must deposit an amount greater than $0."});
      return false;
    }
    //Finally, generate a success alert.
    setAlert({className: "alert alert-success", strong: "Success! ", text: "You successfully deposited money into your account."});
    setTimeout((() => setAlert(null)), 5000);
    return true;
  }

  function handleDeposit(){
      if (!validate(amount)){
        return;
      }
      user.balance = parseFloat(user.balance) + parseFloat(amount);
      setShow(false);
  }

  function clearForm(){
      setAmount("");
      setAlert("");
      setShow(true);
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
          bgcolor="primary"
          header="Deposit"
          text={`Balance: $${parseFloat(user.balance)}`}
          body={<BankForm 
            amount={amount}
            setAmount={setAmount}
            show={show}
            onClick={handleDeposit}
            buttonLabel="Deposit"
            isDisabled={isDisabled}
            successClick={clearForm}
            successLabel="Make Another Deposit" 
          />}
    />
    ):(
      <Card
          bgcolor="secondary"
          header="Deposit"
          text="In order to use this feature you must be logged in."
    />
    )}
  </>
  );
}

export default Deposit;