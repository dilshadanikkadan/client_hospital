import mongoose from "mongoose"

const notificationRoom = mongoose.Schema({
    users:[
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', 
                unique:true
            },
            lastMessage: {
                type: String
            }
        }
    ]
},{ timestamps: true})

const NotificationRoom = mongoose.model("notificationRoom",notificationRoom)

export default NotificationRoom