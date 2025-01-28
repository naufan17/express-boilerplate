import { Response } from "express";

export const handleOk = <T>(res: Response, message: string, data?: T) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const handleUpdated = (res: Response, message: string) => {
  res.status(200).json({
    success: true,
    message,
  });
}

export const handleCreated = (res: Response, message: string) => {
  res.status(201).json({
    success: true,
    message,
  });
};

export const handleBadRequest = (res: Response, message: string) => {
  res.status(400).json({
    success: false,
    message,
  });
};

export const handleUnauthorized = (res: Response, message: string) => {
  res.status(401).json({
    success: false,
    message,
  });
}

export const handleForbidden = (res: Response, message: string) => {
  res.status(403).json({
    success: false,
    message,
  });
}

export const handleNotFound = (res: Response, message: string) => {
  res.status(404).json({
    success: false,
    message,
  });
};

export const handleConflict = (res: Response, message: string) => {
  res.status(409).json({
    success: false,
    message,
  });
};

export const handleInternalServerError = (res: Response, message: string) => {
  res.status(500).json({
    success: false,
    message,
  });
};