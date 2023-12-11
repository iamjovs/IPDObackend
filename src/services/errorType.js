class AuthenticationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthenticationError';
    }
  }
  
  // Custom error class for other service-related errors
  class ServiceError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ServiceError';
    }
  }
  
  module.exports = {
    AuthenticationError,
    ServiceError,
  };