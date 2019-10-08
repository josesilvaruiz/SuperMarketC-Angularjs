
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

class TokenService {

    constructor() {
        this.Token = null;
        this.TokenParsed = null;
    }

    Logout() {
        this.Token = null;
    }
    SetToken(token) {
        this.Token = token;

        this.TokenParsed = parseJwt(token);
    }
    GetToken() {
        return this.Token;
    }

    getUserId() {
        return this.TokenParsed && this.TokenParsed.unique_name;
    }

    isLogged() {
        return this.Token !== null;
    }
}

// esto le dice a Angular que creamos un service que se llama $UsersService
// para que lo inyecte 
app.service('$TokenService', TokenService);