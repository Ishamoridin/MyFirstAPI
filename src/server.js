require(`./db/connections`);
const express = require(`express`);
const app = express();
const userRouter = require(`./users/userRoutes`);
const listingRouter = require(`./listings/listingRoutes`);
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(userRouter);
app.use(listingRouter);
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
