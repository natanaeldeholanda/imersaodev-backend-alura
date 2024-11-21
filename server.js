import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const posts = [
  { id: 1, descricao: "Uma foto test", imagem: "https://placecats.com/millie/300/150"},
  { id: 2, descricao: "Gato fofo dormindo", imagem: "https://placecats.com/sleepy/400/200"},
  { id: 3, descricao: "Gatinho brincando com um novelo de lã", imagem: "https://placecats.com/yarn/500/300"}
];
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});

// Função para buscar um post por id
// function buscarPostPorId(id) {
//   return posts.findIndex((post) =>{
//     return post.id === Number(id);
//   });
// }
async function getTodosPosts(req, res) {
  const db = conexao.db("ImersaoDevBackendAlura");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

app.get("/posts", async(req, res) => {
  const resultado = await getTodosPosts(req, res);
    res.status(200).json(resultado);
});
app.get("/posts/:id", (req, res) => {
  const index = buscarPostPorId(req.params.id);
  res.status(200).json(posts[index]);
});
