export const getCurrentUser = () => {
    let currentUser = { loggedIn: false, data: {} };

    let userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
        currentUser = { loggedIn: true, data: userData };
    }

    return currentUser;
} 