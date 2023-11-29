
import { useEffect, useState } from "react";
import AuthService from "../../services/Auth/auth.service.js";

const LoggedUser = (currentUser, showAdminBoard, showFileUploadBoard, showAddUserBoard) => {
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

    // return <div>hello {currentUser}</div>;
}
export default LoggedUser