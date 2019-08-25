/**
 * get new access token from the refresh tokens
 */

const Joi = require('@hapi/joi');
const ErrorTypes = require('./error-types');
/**
 * access token to Dropper
 * @param username String
 * @param refreshToken String
 * @returns {
 *   accessToken
 * } or
 *   Boom Error  (400)
 */
const loginRoute = {
    method: 'POST',
    path: '/token',
    config : {
        auth: false,
        validate: {
            payload: {
                token: Joi.string().required()
            }
        }
    },
    handler: ( request, h) => {
        let User = require.decorations.user;
        return User.refreshToken(request.payload.token)
        .catch( (err) => {
          return ErrorTypes.toBoomError(err, request);
        })
    }
};

module.exports = loginRoute;
