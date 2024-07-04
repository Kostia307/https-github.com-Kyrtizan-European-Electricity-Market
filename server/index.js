const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ProviderModel = require("./models/Providers")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/EuropeanElectricityMarket")

app.get('/', (req, res) => {
    ProviderModel.find({})
    .then(providers => res.json(providers))
    .catch(err => res.json(err))
})

app.get('/getProvider/:id', (req,res) => {
    const id = req.params.id;
    ProviderModel.findById({_id:id})
    .then(providers => res.json(providers))
    .catch(err => res.json(err))
})

app.put('/updateProvider/:id', (req,res) => {
    const id = req.params.id;
    ProviderModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name, 
        country: req.body.country, 
        marketshare: req.body.marketshare, 
        renewbleenergypercentage: req.body.renewbleenergypercentage, 
        yearlyrevenue: req.body.yearlyrevenue})
    .then(providers => res.json(providers))
    .catch(err => res.json(err))
})

app.delete('/deleteProvider/:id', (req,res) => {
    const id = req.params.id;
    ProviderModel.findByIdAndDelete({_id: id })
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createProvider", (req,res) => {
    ProviderModel.create(req.body)
    .then(providers => res.json(providers))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})