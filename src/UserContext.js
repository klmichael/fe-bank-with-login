//From David Ceddia's https://www.purereact.com/lessons/react-manage-the-logged-in-user-state-with-context

import React, {useState} from 'react';

const UserContext = React.createContext();

export function UserProvider( {children} ) {
  const [user, setUser] = useState(null);

  const login = user => setUser(user);
  const logout = () => setUser(null);

  const value = {
    user,
    login,
    logout
  };

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}

export default UserContext;