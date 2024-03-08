import express from 'express'
import axios from 'axios'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const app=express()

const APIURL = "http://localhost:3001";

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true}))

// Get all blogs
app.get( '/', async(req,res)=>{
    const result = await axios.get(APIURL)
    const blogs = result.data;
    res.render("index.ejs",{blogs})
})

// Get a specific blog
app.get('/blogs/:id',async(req,res)=>{
    const result = await axios.get(APIURL+"/blogs/"+req.params.id)
    const blogs = result.data; 
    console.log(blogs);
    res.render("blog.ejs", {blogs, i: req.params.id});
})

// Render add blogs page
app.get("/addBlog", (req,res) => {
    res.render('addBlog.ejs')
})


app.post("/add",async(req,res)=>{
    await axios.post(APIURL+'/add', req.body).then((response)=>{
        let blogs = response.data
        console.log(blogs)
    })
    res.redirect("/")
})

// Render edit blogs page
app.get("/edit/:id", async(req,res) => {
    const result = await axios.get(APIURL+"/blog/"+req.params.id)
    const data = result.data;
    const id= req.params.id;
    res.render('edit.ejs', {data , id})
})

app.post("/blog/:id", async(req,res)=>{
    // try{
        console.log(req.body)
        const result = await axios.patch(APIURL+'/blog/'+req.params.id, req.body);
        console.log(result.data);
        res.redirect('/');
    // }catch(err){
    //     console.error(err);
    //     res.status(500).send("Server error");
    // }
});

app.post( "/delete/:id", async (req,res)=> {
    const result = await axios.delete(APIURL+'/blog/delete/'+req.params.id)
    const id = req.params.id
    res.redirect("/")
})


app.listen(3000, ()=>{
    console.log("http://localhost:3000")
})