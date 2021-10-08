import {TypeUtils} from "../types/utils";
import {IError} from "./interface";

export const isError = <T> (error: T): error is T & IError =>
  TypeUtils.object(error) &&
  TypeUtils.field(error, "name", TypeUtils.nonEmptyString) &&
  TypeUtils.field(error, "message", TypeUtils.nonEmptyString) &&
  TypeUtils.optField(error, "cause", isError);

export const normalizeError = (error: unknown, defaultMessage?: string): IError => {
  if (isError(error)) {
    return error;
  }

  if (TypeUtils.object(error)) {
    const updatedError: any = { ...error };
    if (!TypeUtils.field(error, "name", TypeUtils.nonEmptyString)) {
      updatedError.name = "UNKNOWN";
    }

    if (!TypeUtils.field(error, "message", TypeUtils.nonEmptyString)) {
      if (defaultMessage != null && defaultMessage.length > 0) {
        updatedError.message = defaultMessage;
      } else {
        updatedError.message = "NO MESSAGE";
      }
    }

    if (!TypeUtils.optField(error, "cause", isError)) {
      updatedError.cause = normalizeError(updatedError.cause);
    }

    return updatedError as IError;
  }

  if (TypeUtils.nonEmptyString(error)) {
    return {
      name: "UNKNOWN",
      message: error,
    };
  }

  if (defaultMessage != null  && defaultMessage.length > 0) {
    return {
      name: "UNKNOWN",
      message: defaultMessage,
    };
  }

  return {
    name: "UNKNOWN",
    message: "NO MESSAGE",
  };
};

