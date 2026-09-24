import test from "@playwright/test";
import { createUserData } from "../../data/ApiTestData";
import { Logger } from "../../utils/Logger";

test("Verify dynamic data values", ({}) => {
  const data = createUserData();
  Logger.info(JSON.stringify(data, null, 2));
});
