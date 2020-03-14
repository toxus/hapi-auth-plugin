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
    options : {
        auth: false,
        validate: {
            validator: Joi,
            payload: {
                token: Joi.string().required()
            }
        }
    },
    handler: ( request, h) => {
        let User = request.user();
        return User.refreshToken(request.payload.token, request)
        .catch( (err) => {
          return ErrorTypes.toBoomError(err, request);
        })
    }
};

module.exports = loginRoute;
