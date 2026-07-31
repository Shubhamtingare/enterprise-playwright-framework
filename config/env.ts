import dotenv from "dotenv";
import path from "path";

const testEnv = process.env.TEST_ENV || "qa";
const allowedEnvironments = ["qa", "uat", "staging"];
if (!allowedEnvironments.includes(testEnv)) {
  throw new Error(`Unsupported environment: ${testEnv}`);
}
dotenv.config({ path: path.resolve(__dirname, `.env.${testEnv}`) });

export const env = {
  baseURL: process.env.BASE_URL,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};
