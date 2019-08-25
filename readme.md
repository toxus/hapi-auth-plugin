#hapi-auth
```sh
npm install @toxus/hapi-auth
```
Plugin that handles the authentication in Hapi.

Create the following url:
* / [get] test if the server is available
* /login [post] login user. payload: username, email, password
* /logout [delete] removes the authenication from the server. param: refreshToken
* /register [post] create a new user. payload: account, username, password, email, accept, reset
* /resetAccount [post] clear the account. payload: username, password, email, remove
* /secure [get] test if the auth system is working. Should block if not logged in. param: token