import React from "react";

const BankForm = (props) => {
  
  return (
    props.show ? (
      <>
      {props.setName && <>
        Name<br/>
        <input 
            type="input"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={props.name}
            onChange={e => props.setName(e.currentTarget.value)}
        /><br/>
      </>}
      {props.setEmail && <>
        Email<br/>
        <input 
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={props.email}
            onChange={e => props.setEmail(e.currentTarget.value)}
        /><br/>
      </>}
      {props.setPassword && <>
        Password<br/>
        <input 
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={props.password}
            onChange={e => props.setPassword(e.currentTarget.value)}
        /><br/>
      </>}
      {props.setAmount && <>  
        Amount<br/>
        <input 
            type="number"
            className="form-control"
            id="amount"
            placeholder="Enter amount"
            value={props.amount}
            onChange={e => props.setAmount(e.currentTarget.value)}
        /><br/>
      </>}
      <button type="submit" className="btn btn-light" onClick={props.onClick} id="submit-btn" disabled={props.isDisabled}>{props.buttonLabel}</button>
      </>
    ):(
      <button type="submit" className="btn btn-light" onClick={props.successClick}>{props.successLabel}</button>
    )
  );
}

export default BankForm;