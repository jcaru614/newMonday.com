//response messages
export const ACCOUNT_EXISTS = 'An account with that email already exists';
export const NO_ACCOUNT_EXISTS = 'An account with that email does not exist';
export const ACCOUNT_CREATED = 'Account created successfully!';
export const ACCOUNT_DELETED = 'Account deleted successfully';
export const INVALID_PASSWORD = 'password is not correct';
export const LOGGED_OUT = 'User has logged out.';
export const LOGGED_IN = 'User has logged in.';
//client error response codes
export const CLIENT_ERROR_UA = 'UNAUTHORIZED.';
export const CLIENT_ERROR_A_NA = 'ACCOUNT NOT FOUND.';
export const CLIENT_ERROR_UA_T = 'TOKEN UNAUTHORIZED.';
export const CLIENT_ERROR_HB = 'BAD REQUEST.';
export const CLIENT_ERROR_AE = 'ACCOUNT ALREADY EXISTS.';

//request logging
export const JWT_VERIFY_LOG = 'ATTEMPTING TO VERIFY';
export const JWT_SUCCESS_LOG = 'VERIFICATION SUCCEEDED';
export const JWT_FAILURE_LOG = 'VERIFICATION FAILED';
export const INVALID_PASS_MATCH = 'INVALID PASSWORD MATCH';
export const SUCCESS = 'SUCCESS.';
export const READ_REQ_LOG = 'READ REQUEST.';
export const CREATE_REQ_LOG = 'CREATE REQUEST.';
export const UPDATE_REQ_LOG = 'UPDATE REQUEST.';
export const VERIFY_REQ_LOG = 'VERIFY REQUEST.';
export const RATING_LOG = 'RATING REQUEST.';
export const DELETE_REQ_LOG = 'DELETE REQUEST.';
export const STATIC_RESOURCES = './resources';

//server error resonse codes
export const SERVER_ERROR = 'BACKEND SERVER ERROR.';
export const SERVER_ERROR_TO = 'SERVICE TIMEOUT';
export const DEFAULT_ERROR = {
        code: 'BAD GATEWAY.',
        message: 'DEFAULT ERROR RESPONSE.'
    };
