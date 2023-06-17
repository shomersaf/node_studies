const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 3000;
const HOST = "localhost";
const path = require("path");
const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);
const morgan = require ("morgan");


app.set('view engine','ejs')

app.listen(PORT, HOST, (error) => {
    error
      ? console.log(error)
      : console.log(`Server is listening on http://${HOST}:${PORT}`);
  });
  
  app.use(express.static('public'))
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  app.use(express.urlencoded({extended: false}))

  app.post('/add-post',(req, res)=>{
    const { title, author, text } = req.body;
    const post =
    {
    id: new Date(),
    text: text,
    title: title,
    date: (new Date()).toLocaleDateString(),
    author: author,
    };
  
    res.render(createPath("post"),{title, post});
  })

app.get("/", (req, res) => {
  const title="Home";
  res.render(createPath("index"),{title});
});

app.get("/posts/:id", (req, res) => {
   const title="Post";
   const post =
    {
    id: '1',
    text: 'blabla',
    title: 'tralala',
    date: '09/09/09',
    author: 'Afinogen',
    };
    res.render(createPath("post"),{title, post});
  });


  app.get("/posts", (req, res) => {
    const title="Posts";
    const posts =[
      {
      id: '1',
      text: 'blabla',
      title: 'tralala',
      date: '09/09/09',
      author: 'Afinogen',
      },
      {
        id: '2',
        text: 'djxjdgjxjxjxj',
        title: 'djjdjd',
        date: '44/09/09',
        author: 'Javakharlal',
        }
    ];
    res.render(createPath("posts"),{title, posts});
  });
  app.get("/add-post", (req, res) => {
    const title="Add Post";
    res.render(createPath("add-post"),{title});
  });

app.get("/contacts", (req, res) => {
  const title="Contacts";
  const contacts = [
    {name: 'CSS & Bootstrap Example', link: 'http://stacey.co.il/studies_bootstrap/'},
    {name: 'SCSS Example', link: 'http://stacey.co.il/studies_plus/example/index.html'},
    {name: 'Digital Artist Portfolio', link: 'https://www.artstation.com/staceysteshin'}
  ];
  res.render(createPath("contacts"),{title, contacts});
});

app.get("/about", (req, res) => {
  res.redirect("/contacts");
});

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.get("/index", (req, res) => {
  res.redirect("/");
});

app.use((req, res) => {
  const title="Error";
  res.status(404).render(createPath("error"),{title});
});
