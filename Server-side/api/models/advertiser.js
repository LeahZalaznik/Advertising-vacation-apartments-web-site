import mongoose from "mongoose";
const advertiserSchema = new mongoose.Schema({  
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber2:{
        type: String
    },
    aepartments: [{
        type: mongoose.Types.ObjectId,
        ref: "Apartment"
    }]
});

export default mongoose.model("Advertiser", advertiserSchema);