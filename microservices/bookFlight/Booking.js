//create a booking model in this file
const mongoose = require("mongoose");

mongoose.model("Booking", {
    
    UserID:{
        type:mongoose.SchemaTypes.ObjectId,
        required: true
    },

    flight: {
            flightCode:{
                type:String,
                required: true
            },
            airline:{
                type:String,
                required: true    
            },
            source:{
                type:String,
                required: true    
            },
            destination:{
                type:String,
                required: true    
            },
            fare : {
                type: Number,
                required: true
              }
        },
    user:{
        email :{
            type: String,
            required: true,
            //match: [/.+\@.+\..+/, 'Please fill a valid email address']
        },
        phoneNo:{
            type: Number,
            required: true           
        },
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        }
    },
BookingID:
 {
  type: Number,
  required: true
 },
    

 seatNo:
 {
  type: Number,
  required: true
 }

    
    
}); 













// FlightID:{
//     type:mongoose.SchemaTypes.ObjectId,
//     require: true    
// }

// flight: {
//     // airline:{
//     //     type:[String],
//     //     require: true    
//     // },
//     source:{
//         type:[String],
//         require: true    
//     },
//     destination:{
//         type:[String],
//         require: true    
//     }

// },
// user: {
//     name:{
//         type:[String],
//         require: true    
//     }
//     // age:{
//     //     type:[Number],
//     //     require: true    
//     // }

// }