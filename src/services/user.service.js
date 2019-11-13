import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    signup,
    getAll,
    getRutesForUser,
    addRuteForUser,
    deleteRuteForUser,
    uploadPhotoForUser
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`https://test-server-express-2.herokuapp.com/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        })
        .catch((error) => console.log('ERROR: ' + error));
}

function signup(username, password, firstName, lastName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, firstName, lastName })
    };
    
    return fetch(`https://test-server-express-2.herokuapp.com/users/addUser`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
        .catch(err => console.log("ERROR signup: " + err));
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://test-server-express-2.herokuapp.com/users`, requestOptions).then(handleResponse);
}

function getRutesForUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://test-server-express-2.herokuapp.com/users/getRutes`, requestOptions).then(handleResponse);
}

function addRuteForUser( username, ruteName, comment, location, grade ) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, ruteName, comment, location, grade })
    };
    
    return fetch(`https://test-server-express-2.herokuapp.com/users/addRute`, requestOptions).then(handleResponse);
}

function deleteRuteForUser( username, ruteName, comment, location, grade ) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, ruteName, comment, location, grade })
    };
    
    return fetch(`https://test-server-express-2.herokuapp.com/users/delRute`, requestOptions).then(handleResponse);
}


function uploadPhotoForUser( username, image ) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, image })
    };
    
    return fetch(`https://test-server-express-2.herokuapp.com/users/addPhoto`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
              // this is kind of strange because we are not returning updated user...
              // we don't wait for database to give us updated user, it would be an extra call to db
              // this will do the trick for now
                localStorage.setItem('user', JSON.stringify({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: image
                }));
            }
            return user;
        })
        .catch(err => console.log("ERROR upload photo: " + err));
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}