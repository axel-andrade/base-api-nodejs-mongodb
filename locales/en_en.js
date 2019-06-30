var Messages = {
    success: {
        CREATED_SUCCESS: "The object was successfully created.",
        DOWNLOAD_SUCCESS: "Download completed successfully.",
        DELETED_SUCCESS: "The object was successfully removed.",
        EDITED_SUCCESS: "The object has been updated successfully.",
        RECOVER_EMAIL_SUCCESS: "Follow the steps sent to your email to reset your password.",
        LOGOUT_SUCCESS: "You were successfully logged out",
        LIKE_POST: "This user has already liked this post.",
    },
    push: {
   
    },
    error: {

        ERROR_UNAUTHORIZED: {code: 101, message: "You do not have permission to perform this action."},
        INVALID_USERNAME: {code: 101, message: "Incorrect user name or password, please try again."},
        ERROR_ACCESS_REQUIRED: {code: 101, message: "You have no privilege to perform this action."},
        ERROR_SESSION_NOT_FOUND: {code: 101, message: "Session not found."},
        USERNAME_EXISTS: {code: 101, message: "Account already exists for this username."},
        ERROR_EMAIL_NOT_FOUND: {code: 101, message: "Email not found."},
        ERROR_TOKEN_NOT_FOUND: {code: 101, message: "Invalid token."},
        INVALID_OLD_PASSWORD: {code: 101, message: "Old password is incorrect."},
        INVALID_VALUE: {code: 101, message: "Invalid value."},
        DATE_REQUIRED: {code: 101, message: "For publications of type event the date parameter is required."},
        INVALID_DATE: {code: 101, message: "Invalid date."},
        INVALID_IMAGES: {code: 101, message: "The images field is incomplete or invalid."}

    },
    email: {
        RECOVER: "Recover Password",
        WELCOME: "Welcome",
    },
};

module.exports = Messages;