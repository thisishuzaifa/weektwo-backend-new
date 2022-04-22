require ('dotenv').config()


const express = require('express')
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'images/' })
const app = express()
const database = require('./database')



app.get('/images/:imageName', (req, res) => {

  const imageName = req.params.imageName
  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)

})

app.post('/api/images', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path
  const description = req.body.description
  const image = await database.addImage(imagePath, description)

  res.send({image})
})


app.get('/api/images', async (req, res) => {
    const images = await database.getImages()
    res.send({images})
})



app.listen(8080, () => console.log("listening on port 8080"))