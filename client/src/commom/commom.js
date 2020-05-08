export default class Commom {
    getCurrentUser() {
        let currentUser = sessionStorage.getItem('user');
        return currentUser;
    }

    getToken() {
        return sessionStorage.getItem('token') || null;
    }

    setSessionStorage(token, user) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', user);
    }

    removeSessionStorage() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
}

