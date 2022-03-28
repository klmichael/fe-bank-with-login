import React, { useContext } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

function Home(){
  const { user } = useContext(UserContext);

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header="Welcome to the Bank"
      title={user ? (`Thank you for banking with us, ${user.name}.`):("For all your banking needs.")}        text={user ? (<p><Link to="Deposit/" className="link">Make a deposit</Link> or <Link to="Withdraw/" className="link">withdraw funds</Link> now.</p>):(<p><Link to="CreateAccount/" className="link">Create a new account</Link> or <Link to="LogIn/" className="link">log in</Link> to your account to begin.</p>)}
      body={(<img src={require("./bank.png")} className="img-fluid" alt="bank building"/>)}
    /> 
  );  
}

export default Home;