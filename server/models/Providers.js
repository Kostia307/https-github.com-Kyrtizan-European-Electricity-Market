const mongoose = require("mongoose")

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name is too short'],
        maxLength: [30, 'Name is too long'],
        required: true,
        unique: true
    },
    country: {
        type: String,
        minLength: [4, 'Country name is too short'],
        maxLength: [30, 'Country name is too long'],
        required: true
    },
    marketshare: {
        type: Number,
        min: [0, 'Market share can not be less than 0'],
        max: [100, 'Market share can not be higher than 100'],
        required: true
    },
    renewbleenergypercentage: {
        type: Number,
        min: [0, 'Renewble energy percentage can not be less than 0'],
        max: [100, 'Renewble energy percentage can not be higher than 100'],
        required: true
    },
    yearlyrevenue: {
        type: Number,
        min: [0, 'Yealy revenue can not be less than 0'],
        required: true
    }
})

const ProviderModel = mongoose.model("providers", ProviderSchema)
module.exports = ProviderModel