require(`./db/connections`);
const cors = require(`cors`);
const express = require(`express`);
const app = express();
const userRouter = require(`./users/userRoutes`);
const listingRouter = require(`./listings/listingRoutes`);
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(listingRouter);
app.get("/health", (res, req) => {
  res.status(200).send({message: "API is working"})
})
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
