import { Response } from "express";

export const responseOk = <T>(res: Response, message: string, data?: T) => {
  res.status(200).json({
    statusCode: 200,
    message,
    data,
  });
};

export const responseCreated = (res: Response, message: string) => {
  res.status(201).json({
    statusCode: 201,
    message,
  });
};

export const responseBadRequest = (res: Response, message: string) => {
  res.status(400).json({
    statusCode: 400,
    message,
  });
};

export const responseUnauthorized = (res: Response, message: string) => {
  res.status(401).json({
    statusCode: 401,
    message,
  });
}

export const responseForbidden = (res: Response, message: string) => {
  res.status(403).json({
    statusCode: 403,
    message,
  });
}

export const responseNotFound = (res: Response, message: string) => {
  res.status(404).json({
    statusCode: 404,
    message,
  });
};

export const responseConflict = (res: Response, message: string) => {
  res.status(409).json({
    statusCode: 409,
    message,
  });
};

export const responseInternalServerError = (res: Response, message: string) => {
  res.status(500).json({
    statusCode: 500,
    message,
  });
};