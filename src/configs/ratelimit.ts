import rateLimit from "express-rate-limit";
import config from "./config";

const limiter = rateLimit({
  windowMs: Number(config.RateLimitWindowMs),   
  max: Number(config.RateLimitMax),
  message: "Too many requests from this IP, please try again after 10 minutes",
  headers: true
});

export default limiter;