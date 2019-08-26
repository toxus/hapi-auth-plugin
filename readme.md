#hapi-auth
```sh
npm install @toxus/hapi-auth
```
Plugin that handles the authentication in Hapi.

Creats the following url:
* / [get] test if the server is available
* /login [post] login user. payload: username, email, password
* /logout [delete] removes the authenication from the server. param: refreshToken
* /register [post] create a new user. payload: account, username, password, email, accept, reset
* /resetAccount [post] clear the account. payload: username, password, email, remove
* /secure [get] test if the auth system is working. Should block if not logged in. param: token


###example

In the plugins director, in index.js
```javascript
module.exports = [
  {
    plugin: require('@toxus/hapi-auth'),
    routes: {
      prefix :'/auth'
    }
  }
];
```

In the /index.js

```javascript
 server = new Hapi.Server({
    port: 3030,
    host: 'localhost',
 });

 const start = async function() {
   server.decorate('request', 'user', function() { return UserObject.User });
   await hapiAuth.auth(server, UserObject.User);
   await server.register(hapiAuth.plugin);
   await server.start();   
   console.log(`Server running at: ${server.info.uri}\n`);
 };
 return start();

module.exports = server;

```

The User object is needed to handle the specific information
```javascript
const User = {
  get authKey() {
    return 'NeverShareYourSecret';
  },
  /**
   * registers a new user.
   *
   * @param options Object = account, username, password, email, reset
   * @return Promise same fields AND: isExisting if account aready existed
   */
  create(options) {
    return Promise.resolve(options);
  },
  /**
   * Login
   * @param info Object username, email, password
   * @return Promise (token: ... and refreshToken }
   *   the token must be signed with the authKey and the data needed to return in the session
   */
  login(info = {}) {
    if (info.password !== Password || info.email !== Email) {
      return Promise.reject(new ErrorTypes.ErrorAccessDenied());
    }
    return Promise.resolve(_.merge(info, { token: JsonWebToken.sign({id: info.email}, this.authKey), refreshToken: RefreshToken}));
  },
  /**
   * create a new session object
   * @param obj Object the information stored with the login en signed by JWT
   * @return Object
   */
  createSession(obj) {
    return obj;
  }

};

```