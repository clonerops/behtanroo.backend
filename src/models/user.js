import { Schema, model } from 'mongoose'

const User = new Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String 
    },

    userName: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },

    email: {
        type: String
    },
    
    mobile: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

export default model("User", User)