/**
 * Mock user class
 */

const User = {

  create(options) {
    return Promise.resolve(options);
  },

  login(info = {}) {
    return Promise.resolve(info);
  }
};

module.exports.User = User;