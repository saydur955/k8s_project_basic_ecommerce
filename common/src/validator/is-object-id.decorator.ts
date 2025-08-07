import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (target: Object, propertyName: string | symbol) {
    // Register class-validator custom decorator
    registerDecorator({
      name: 'IsObjectId',
      target: target.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value === 'string') {
            return Types.ObjectId.isValid(value) && String(new Types.ObjectId(value)) === value;
          } else if (value instanceof Types.ObjectId) {
            return true;
          }
          return false;
        },
        defaultMessage(): string {
          return '$property must be a valid MongoDB ObjectId';
        },
      },
    });

    // Apply transform (executed only when value is valid)
    Transform(({ value }) => {
      if (typeof value === 'string' && Types.ObjectId.isValid(value)) {
        const objectId = new Types.ObjectId(value);
        if (String(objectId) === value) {
          return objectId;
        }
      }
      return value; // let validator handle invalid value
    })(target, propertyName);
  };
}
