/**
 *
 * !!!!!!!!!!!!!  IMPORTANT  !!!!!!!!!!!!!!!!!
 *
 * Please do not modify this file
 *
 */
import * as dotenv from "dotenv";
dotenv.config();
function requireEnv<T = string>(name: string, defaultValue: any = null): T {
  const value = process.env[name];
  if (value === undefined && defaultValue == null) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value ?? defaultValue;
}

export const NODE_ENV = requireEnv("NODE_ENV", "development");
export const PORT = requireEnv<number>("PORT", 8080);
