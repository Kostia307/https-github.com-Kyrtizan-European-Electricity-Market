const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProviderModel = require("./models/Providers");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/EuropeanElectricityMarket");

app.get('/', (req, res) => {
    ProviderModel.find({})
        .then(providers => res.json(providers))
        .catch(err => res.json(err));
});

app.get('/getProvider/:id', (req, res) => {
    const id = req.params.id;
    ProviderModel.findById({_id: id})
        .then(providers => res.json(providers))
        .catch(err => res.json(err));
});

app.put('/updateProvider/:id', (req, res) => {
    const id = req.params.id;
    ProviderModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name, 
        country: req.body.country, 
        marketshare: req.body.marketshare, 
        renewbleenergypercentage: req.body.renewbleenergypercentage, 
        yearlyrevenue: req.body.yearlyrevenue
    })
    .then(providers => res.json(providers))
    .catch(err => res.json(err));
});

app.delete('/deleteProvider/:id', (req, res) => {
    const id = req.params.id;
    ProviderModel.findByIdAndDelete({_id: id})
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post("/createProvider", (req, res) => {
    const { name, country, marketshare, renewbleenergypercentage, yearlyrevenue } = req.body;

    ProviderModel.findOne({ name })
        .then(existingProvider => {
            if (existingProvider) {
                return res.status(400).json({ message: 'Provider with this name already exists' });
            }

            const newProvider = new ProviderModel({ name, country, marketshare, renewbleenergypercentage, yearlyrevenue });
            newProvider.save()
                .then(provider => res.status(201).json(provider))
                .catch(err => res.status(500).json({ message: 'Error adding provider', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Error checking provider', error: err }));
});

app.listen(3001, () => {
    console.log("Server is running");
});
