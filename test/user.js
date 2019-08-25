/**
 * Mock user class
 */

const User = {

  create(options) {
    return Promise.resolve(options);
  },
  login(info = {}) {
    return Promise.resolve(info);
  },
  resetAccount(payload) {
    return Promise.resolve(payload)
  },
  refreshToken(token, request) {
    return Promise.resolve(token);
  }
};

module.exports.User = User;