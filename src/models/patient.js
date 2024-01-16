import mongoose, { Schema, model } from 'mongoose'

const Patient = new Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    nationalCode: {
        type: String
    },

    mobile: {
        type: String
    },

    mobile2: {
        type: String
    },

    tel: {
        type: String
    },

    Address: {
        type: String
    },

    patientCode: {
        type: Number,
    },

    referral: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Referrals"
    }],

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


export default model('Patients', Patient);