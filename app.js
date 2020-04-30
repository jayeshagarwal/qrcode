const express = require('express')
const app = express()
const qr = require('qrcode')
const fs = require('fs')
const crypto = require('crypto')

app.get('/' ,(req,res)=> {
    res.redirect('/qr')
})

app.get('/qr', async (req,res)=> {
    try {
        const id = crypto.randomBytes(20).toString('hex');
        const qrcode = await qr.toDataURL(id)
        let text = { id }
        text = JSON.stringify(text)
        fs.writeFileSync('qrcode.json', text)
        res.send(`<img src=${qrcode}>`)
    }
    catch(e)
    {
        console.log("fd")
        res.status(500).send(e)
    }
})

app.get('/qrcode', async (req,res)=> {
    try {
        const qr = await fs.readFileSync('qrcode.json')
        const qrJson = JSON.parse(qr)
        res.send(qrJson)
    }
    catch(e)
    {
        console.log("fd")
        res.status(500).send(e)
    }
})

app.listen(process.env.PORT, ()=> {
    console.log('server')
})