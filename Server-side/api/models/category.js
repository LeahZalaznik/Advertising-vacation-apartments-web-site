import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
  name: {
    type: String, 
    required: true},
    
  apartments: [{
    type: mongoose.Types.ObjectId,
     ref: 'Apartment'}]  
})

export default mongoose.model('Category', categorySchema)

