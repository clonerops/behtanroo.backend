import mongoose, { model, Schema } from 'mongoose'

const Referral = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patients"
    },
    referralDate: {
        type: Date
    },
    referralReason: {
        type: String
    },
    description: {
        type: String
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

export default model('Referrals', Referral)