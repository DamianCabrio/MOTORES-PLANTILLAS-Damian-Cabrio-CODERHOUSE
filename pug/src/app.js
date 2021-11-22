import cors from "cors";
import express from "express";
import Contenedor from "./classes/Contenedor.js";
import productRouter from "./routes/products.js";

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

app.set('views','./views');
app.set('view engine', 'pug');

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static("./public"));

app.use("/api/productos", productRouter);

const contenedor = new Contenedor("./data/products.txt");
app.get("/ver/productos", (_, res) => {
  contenedor.getAll().then((result) => {
    const data = {
      title: "Productos",
      products: result.payload,
    };
    res.render("products", data);
  });
});
