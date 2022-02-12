import { ErrorReport, ValidationError } from 'joi';

const message = (err: ErrorReport[], field: string): string => {
  const { code } = err[0];

  switch (code) {
    case 'any.only':
      return field;
    case 'any.required':
      return `${field} is a required field.`;
    case 'number.base':
      return `${field} must be a number.`;
    case 'string.base':
      return `${field} must be a text.`;
    default:
      return `An error occurred in the ${field} field`;
  }
};

const TypeMessage = (err: ErrorReport[], field: string) =>
  new ValidationError(message(err, field), err, err);

export default TypeMessage;
