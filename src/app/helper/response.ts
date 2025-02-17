import { Response } from "express";

export const responseOk = <T>(res: Response, message: string, data?: T) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const responseUpdated = (res: Response, message: string) => {
  res.status(200).json({
    success: true,
    message,
  });
}

export const responseCreated = (res: Response, message: string) => {
  res.status(201).json({
    success: true,
    message,
  });
};

export const responseBadRequest = (res: Response, message: string) => {
  res.status(400).json({
    success: false,
    message,
  });
};

export const responseUnauthorized = (res: Response, message: string) => {
  res.status(401).json({
    success: false,
    message,
  });
}

export const responseForbidden = (res: Response, message: string) => {
  res.status(403).json({
    success: false,
    message,
  });
}

export const responseNotFound = (res: Response, message: string) => {
  res.status(404).json({
    success: false,
    message,
  });
};

export const responseConflict = (res: Response, message: string) => {
  res.status(409).json({
    success: false,
    message,
  });
};

export const responseInternalServerError = (res: Response, message: string) => {
  res.status(500).json({
    success: false,
    message,
  });
};