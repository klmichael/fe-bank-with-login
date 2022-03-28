import React from 'react';
import {Accounts} from './Accounts';
import Card from './Card';

function AllData(){
  return (
    <Card
      maxWidth="100%"
      txtcolor="black"
      header="All Data"
      body={
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {Accounts.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>${user.balance}</td>
            </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
}

export default AllData;