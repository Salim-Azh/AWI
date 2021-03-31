const mongoose = require("mongoose")

const invoiceSchema = new mongoose.Schema(
    {
        reservation: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        send_date: {
            type: Date,
        },
        pay_date: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
)

const InvoiceModel = mongoose.model('invoice', invoiceSchema)
module.exports = InvoiceModel
