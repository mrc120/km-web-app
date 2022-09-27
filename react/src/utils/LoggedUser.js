// import React, { useState, useEffect } from 'react';
// import AuthService from "../services/auth.service.js";

// // import AuthService from "../../services/auth.service.js";

//  const loggedUser = () => {

//   const [showAdminBoard, setShowAdminBoard] = useState(false);
//   const [showAddUserBoard, setAddUserBoard] = useState(false);
//   const [currentUser, setCurrentUser] = useState(undefined);


//     const user = AuthService.getCurrentUser();
//     if (user) {
//       setCurrentUser(user);
//       setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
//       setAddUserBoard(user.roles.includes("ROLE_ADD_USER"));
//     }
//   }


// export default loggedUser;