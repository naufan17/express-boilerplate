import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import config from "./config";

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: Number(config.RateLimitWindowMs),   
  max: Number(config.RateLimitMax),
  message: "Too many requests, please try again",
  headers: true
});

export default limiter;