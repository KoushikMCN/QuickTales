import express from 'express'
import bodyparser from "body-parser";
import { fileURLToPath } from 'url'
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.listen(3001, () => {
    console.log("http://localhost:3001")
})

app.get("/blog/:id", (req,res)=>{
    const id= parseInt(req.params.id);
    res.json(blogs[id-1])
})

app.get("/blogs/:id", (req,res)=>{
    console.log(blogs.slice(req.params.id - 1))
    res.json(blogs.slice(req.params.id-1));
})

app.delete("/blog/delete/:id", (req, res) => {
    const id = parseInt(req.params.id)
    blogs.splice(id - 1, 1)
    console.log("Deleted:")
    console.log(blogs)
    res.json(blogs)
})

app.patch("/blog/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(req.body)
    if (req.body.title) blogs[id - 1].title = req.body.title;
    if (req.body.content) blogs[id - 1].content = req.body.content;
    if (req.body.author) blogs[id - 1].author = req.body.author;
    console.log(req.body)
    res.json(blogs)
})

app.get("/", (req, res) => {
    res.json(blogs)
})

app.post("/add",(req,res)=>{
    blogs.push({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    })
    res.json(blogs)
})



var blogs = [
    {
        title: "Title is working",
        content: "Content idu",
        author: "naanu"
    }
]