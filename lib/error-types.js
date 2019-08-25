/**
 * global error types
 */

const Boom = require('@hapi/boom');

class ErrorBase extends Error {
  constructor(message) {
    super(message);
    this.boomStatus = 500
  }
  asBoom() {
    return new Boom.badData(this.message);
  }
}

class ErrorNotImplemented extends Error {
  // https://javascript.info/custom-errors
  constructor(message) {
    super(message);
    // can not use this.constructor.name:   it returns 'unexpected string'
    this.type = 'ErrorNotImplemented';
  }
  asBoom() {
    return new Boom.notImplemented(this.message);
  }

}
class ErrorNotFound extends Error {
  constructor(field = 'no name', message= 'not found') {
    super(message);
    // can not use this.constructor.name:   it returns 'unexpected string'
    this.type = 'ErrorNotFound';
    this.name = field;
  }
  asBoom() {
    let b = Boom.notFound(this.message);
    b.output.payload.details =  {fieldname: this.fieldname};
    return b;
  }

}
class ErrorDuplicate extends Error {
  constructor(fieldname = 'no name', message= 'duplicate') {
    super(message);
    // can not use this.constructor.name:   it returns 'unexpected string'
    this.type = 'ErrorDuplicate';
    this.fieldname = fieldname;
  }

  asBoom() {
    let b = Boom.conflict('duplicate');
    b.output.payload.details =  {fieldname: this.fieldname, message: this.message};
    return b;
  }
}

class ErrorAccessDenied extends Error {
  constructor(message= 'access denied') {
    super(message);
    // can not use this.constructor.name:   it returns 'unexpected string'
    this.type = 'ErrorAccessDenied';
  }
  asBoom() {
    let b = Boom.forbidden(this.message);  // 403 not 401 (unautherized)
    return b;
  }
}

class ErrorDocumentNotFound extends Error {
  constructor(document = '', message= 'document not found') {
    super(message);
    this.document = document;
    // can not use this.constructor.name:   it returns 'unexpected string'
    this.type = 'ErrorDocumentNotFound';
  }
  asBoom() {
    let b = Boom.notFound(this.message);
    b.output.payload.details =  {document: this.document};
    return b;
  }
}

class ErrorFieldNotValid extends Error {
  constructor(fieldname = '', message= 'data not valid') {
    super(message);
    this.fieldname = fieldname;
    // can not use this.constructor.name:   it returns 'unexpected string'
    this.type = 'ErrorFieldNotValid';
  }
  asBoom() {
    let b = Boom.conflict('not valid');
    b.output.payload.details =  {fieldname: this.fieldname, message: this.message};
    return b;
  }

}
class ErrorFile extends Error {
  constructor(filename= '', message= 'file error found') {
    super(message);
    this.document = filename;
    // can not use this.constructor.name:   it returns 'unexpected string'
    this.type = 'ErrorFile';
  }

  asBoom() {
    let b = Boom.notFound('file not found');
    b.output.payload.details =  {document: this.document, message: this.message};
    return b;
  }
}

function toBoomError(err, request) {
  if (err.asBoom) {
    return err.asBoom(request)
  } else {
    switch(err.name) {
      case 'CastError' :
        let b = Boom.conflict('not valid');
        b.output.payload.details =  {fieldname: err.path, message: err.message};
        return b;
      default: {
        console.error('[Error undefined]:', err.message);
        return Boom.badImplementation(err.message);
      }
    }
  }
}
module.exports = {
  toBoomError,
  ErrorNotImplemented,
  ErrorNotFound,
  ErrorDuplicate,
  ErrorAccessDenied,
  ErrorFieldNotValid,
  ErrorDocumentNotFound,
  ErrorFile
};
