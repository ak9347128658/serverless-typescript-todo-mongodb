import { ValidationError } from "class-validator";

const successformatResponse = (
  statusCode: number,
  success: boolean,
  data?: unknown
) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success,
      data,
    }),
  };
};

const errorformatResponse = (
  statusCode: number,
  success: boolean,
  error: unknown
) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success,
      error,
    }),
  };
};

export const SuccessResponse = (data: object, code: number = 200) => {
  return successformatResponse(code, true, data);
};

export const ErrorResponse = (code = 500, error: unknown) => {
  let errorMessage;

  if (error instanceof Error) {
    errorMessage = [error.message];
  } else {
    errorMessage = [error];
  }

  return errorformatResponse(code, false, errorMessage);
};

export const AppValidationResponse = (error: ValidationError[], code = 400) => {
  console.log("appvalidation :", error);
  const data = Object.values(error[0].constraints).map((value) => value);

  return errorformatResponse(code, false, data);
};
