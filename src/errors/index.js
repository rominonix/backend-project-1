class AppError extends Error { }
class InvalidBody extends AppError {
    constructor() {
        super()
        this.message = 'Invalid body, please try again'
        this.errorCode = 400
    }

    // constructor(fields){
    //     super()
    //     this.fields = fields
    //     this.message = `Invalid body, required field: ${this.fields.join(', ')}`
    //     this.errorCode = 400
    // }
}
class InvalidCredentials extends AppError {
    constructor() {
        super()
        this.message = 'Invalid credentials, please try again'
        this.errorCode = 403
    }
}
class TokenExpired extends AppError {
    constructor() {
        super()
        this.message = 'Token expired'
    }
}
class Unauthorized extends AppError {
    constructor() {
        super()
        this.message = 'Unauthorized'
        this.errorCode = 401
    }
}


module.exports = {
    AppError,
    InvalidBody,
    InvalidCredentials,
    TokenExpired,
    Unauthorized
}