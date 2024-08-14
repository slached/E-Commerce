class APIError extends Error {
    constructor(message, detail, status) {
        super(message);
        this.detail = detail;
        this.status = status;
    }
}

module.exports = APIError;