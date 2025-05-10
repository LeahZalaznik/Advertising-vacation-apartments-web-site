import mongoose from "mongoose";

const apartmentSchema=mongoose.Schema({
    name: {type: String},
    description: {type: String, required: true},
    img: [{type: String, required: false}],
    category: {
        type: mongoose.Types.ObjectId, 
        ref: 'Category'  },
    city: {type: mongoose.Types.ObjectId, 
        ref: 'City' },
    address: {type: String, required: true},
    Numbers_beds: {type: Number, required: true},
    additives:[{type:String}],
    price: {type: Number, required: true},
    advertiser: {
        type: mongoose.Types.ObjectId, 
        ref: 'Advertiser' },   
})

export default mongoose.model('Apartment', apartmentSchema)

