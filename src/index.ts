import express from "express";
import { connectDatabases } from "./services/database.service"
import { indexRouter } from "./routes/index.router";
import {EPDRouter} from "./routes/EPD.router"
import {mappingRouter} from "./routes/mapping.router"

const app = express();
const port = 448; // default port to listen

// ** TODO ** Replace this code with a call to your games router class to handle all calls to /games endpoint
connectDatabases()
.then(() => {
    app.use("/index", indexRouter)
    app.use("/EPD", EPDRouter)
    app.use("/EPDMapping", mappingRouter)
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`)
    });
})
.catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});
