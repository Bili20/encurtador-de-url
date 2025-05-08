import rateLimit from "express-rate-limit";
export class RateLimiter {
  static limiter() {
    return rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: { message: "Muitas requisições, tente novamente mais tarde." },
    });
  }
}
