/**
 * Mock user class
 */
const _ = require('lodash');
const ErrorTypes = require('../lib/error-types');
const JsonWebToken = require('jsonwebtoken');

const UserName = 'auth.testName';
const Password = '123456';
const Email = 'auth@test.com';
const Token = 'eyAAAJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJ2YWwiLCJpYXQiOjE0MjI2MDU0NDV9.eUiabuiKv-8PYk2AkGY4Fb5KMZeorYBLw2a439tPQD5lM'
const RefreshToken = 'eyBBBJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJ2YWwiLCJpYXQiOjE0MjI2MDU0NDV9.eUiabuiKv-8PYk2AkGY4Fb5KMZeorYBLw2a439tPQD5lM'


/**
 * object that holds the user specific information
 */

const User = {
  /**
   * returns the secret key of the server.
   * @return {string}
   */
  get authKey() {
    return 'NeverShareYourSecret';
  },

  createToken(obj) {
    return JsonWebToken.sign(obj, this.authKey);
  },

  /**
   * registers a new user.
   *
   * @param options Object
   *    account: Joi.string().allow('').optional(),
   *    username: Joi.string(),
   *    password: Joi.string(),
   *    email: Joi.string(),
   *    accept: Joi.boolean(),
   *    reset: Joi.boolean().optional()      // remove all info if it's a login
   *
   * @return Promise same fields AND: isExisting if account aready existed
   */
  create(options) {
    return Promise.resolve(options);
  },
  /**
   *
   * @param info Object
   *    username: Joi.string(),
   *    email: Joi.string(),
   *    password: Joi.string()
   * @return Promise (token: ... and refreshToken }
   *   the token must be signed with the authKey and the data needed to return in the session
   */

  login(info = {}) {
    if (info.password !== Password || info.email !== Email) {
      return Promise.reject(new ErrorTypes.ErrorAccessDenied());
    }
    return Promise.resolve(_.merge(info, { token: JsonWebToken.sign({id: info.email}, this.authKey), refreshToken: RefreshToken}));
  },

  resetAccount(payload) {
    return Promise.resolve(payload)
  },
  refreshToken(token, request) {
    return Promise.resolve({token: token});
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

module.exports.User = User;