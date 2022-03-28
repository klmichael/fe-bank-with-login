import React, { useContext, useState, useEffect } from 'react';
import Card from './Card';
import UserContext from './UserContext';
import BankForm from './BankForm';

function Withdraw(){
  const [alert, setAlert] = useState('');
  const [show, setShow] = useState(true);
  const [amount, setAmount] = useState('');
  const [isDisabled, setDisabled] = useState(true);
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
      setAlert({className: "alert alert-warning", strong: "Error! ", text: "You must withdraw an amount greater than $0."});
      return false;
    }
    //Then, verify that the account has sufficient funds for the transaction.
    if (parseFloat(amount) > parseFloat(user.balance)) {
      setAlert({className: "alert alert-danger", strong: "Transaction Failed! ", text: "You do not have sufficient funds in your account. Try withdrawing a smaller amount."});
      return false;
    }
    //Finally, generate a success alert.
    setAlert({className: "alert alert-success", strong: "Success! ", text: "You successfully withdrew money from your account."});
    setTimeout((() => setAlert(null)), 5000);
    return true;
  }

  function handleWithdraw(){
      if (!validate(amount)){
        return;
      }
      user.balance = parseFloat(user.balance) - parseFloat(amount);
      setShow(false);
  }

  function clearForm(){
      setAmount("");
      setShow(true);
      setAlert("");
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
          header="Withdraw"
          text={`Balance: $${parseFloat(user.balance)}`}
          body={<BankForm 
            amount={amount}
            setAmount={setAmount}
            show={show}
            onClick={handleWithdraw}
            buttonLabel="Withdraw"
            isDisabled={isDisabled}
            successClick={clearForm}
            successLabel="Make Another Withdrawal" 
          />}
    />
    ):(
      <Card
          bgcolor="secondary"
          header="Withdraw"
          text="In order to use this feature you must be logged in."
    />
    )}
    </>
  );
}

export default Withdraw;