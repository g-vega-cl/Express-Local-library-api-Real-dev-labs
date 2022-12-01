/**
 *
 * !!!!!!!!!!!!!  IMPORTANT  !!!!!!!!!!!!!!!!!
 *
 * Please do not modify this file
 *
 */
import { PORT } from "./env";
import app from "./app";

const port = PORT;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
