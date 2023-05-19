import { useState, useEffect } from 'react';

import AuthService from '../services/Auth/auth.service'

const useAuth = () => {

    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showFileUploadBoard, setFileUploadBoard] = useState(false);
    const [showAddUserBoard, setAddUserBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
  
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        setFileUploadBoard(user.roles.includes("ROLE_ADD_FILE"));
        setAddUserBoard(user.roles.includes("ROLE_ADD_USER"));
      }
    }, []);
  
    const logOut = () => {
      AuthService.logout();
    };
  
    return { currentUser, showAdminBoard, showAddUserBoard, showFileUploadBoard, logOut }
}

export default useAuth;