// Simple in-memory rate limiter
// For production, use Redis or a dedicated rate limiting service

type RateLimitEntry = {
  count: number;
  resetTime: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 60000, maxRequests: 10 }
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // Clean up old entries
  if (entry && now > entry.resetTime) {
    rateLimitMap.delete(identifier);
  }

  const currentEntry = rateLimitMap.get(identifier);

  if (!currentEntry) {
    // First request in this interval
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.interval,
    });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      reset: now + config.interval,
    };
  }

  if (currentEntry.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      reset: currentEntry.resetTime,
    };
  }

  // Increment count
  currentEntry.count += 1;
  return {
    success: true,
    remaining: config.maxRequests - currentEntry.count,
    reset: currentEntry.resetTime,
  };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60000); // Clean up every minute
