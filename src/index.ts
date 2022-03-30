import express, { Request, Response } from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()
const port = 5000

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]
app.use(cors())

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response ) => {
    res.send('hello there')
})

app.get('/videos', (req, res)=> {
    res.send(videos)
})

app.get('/videos/:id', (req, res)=> {
   const id = req.params.id;
   const video = videos.find(v=> v.id === Number(id))
    if(!video){
        res.send(`No such video with id  ${id}. Please try again later`)
    }
    else {
        res.send(404)
    }
})

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

app.delete('/videos/:id', (req, res)=> {
    const id = req.params.id;
    videos = videos.filter(v=> v.id !== Number(id));
    res.send(204)

})

app.put('/videos/:id', (req, res)=>{
    const id = req.params.id;
    const video = videos.find(v=> v.id === Number(id))
    if(video) {
        video.title = req.body.title;
        res.send(video)
    }
    else {
        res.send(404)
    }

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
