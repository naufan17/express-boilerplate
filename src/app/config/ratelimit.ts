import rateLimit from "express-rate-limit";
import config from "./config";

const limiter = rateLimit({
  windowMs: Number(config.RateLimitWindowMs),   
  max: Number(config.RateLimitMax),
  message: "Too many requests, please try again",
  headers: true
});

export default limiter;