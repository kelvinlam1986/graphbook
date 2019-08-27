import path from "path";
import express from "express";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import db from "./database";
import serviceLoader from "./services";

const util = {
  db
};

const services = serviceLoader(util);
const root = path.join(__dirname, "../../");
const serviceNames = Object.keys(services);
const app = express();

for (let i = 0; i < serviceNames.length; i++) {
  const name = serviceNames[i];
  if (name === "graphql") {
    services[name].applyMiddleware({ app });
  } else {
    app.use(`/${name}`, services[name]);
  }
}

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
  })
);
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(compress());
app.use(cors());
app.use("/", express.static(path.join(root, "dist/client")));
app.use("/uploads", express.static(path.join(root, "uploads")));
app.get("/", (req, res) =>
  res.sendFile(path.join(root, "dist/client/index.html"))
);
app.listen(9600, () => console.log("Listening on port 9600"));
