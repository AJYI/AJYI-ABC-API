module.exports = {
    defaultServerResponse: {
        status: 400,
        message: '',
        body:{}
    },
    requestValidationMessage:{
        BAD_REQUEST: 'Invalid request',
        INCORRECT_QUERY: "Incorrect data within the query",
        INCORRECT_BODY: "Incorrect data within the body",
        MISSING_FIELD: "Missing field(s)"
    }
}