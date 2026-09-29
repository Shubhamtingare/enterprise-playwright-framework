import Ajv from "ajv";
import { Logger } from "./Logger";

const ajv = new Ajv();

export function validateSchema(responseBody: object, userSchema: object) {
  const validate = ajv.compile(userSchema);
  const isValid = validate(responseBody);
  if (!isValid) {
    const error = JSON.stringify(validate.errors, null, 2);
    Logger.error(`Schema validation failed:${error}`);
    throw new Error(`Schema validation failed: ${error}`);
  }
  return true;
}
