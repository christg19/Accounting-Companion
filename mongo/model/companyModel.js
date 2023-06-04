const mongoose = require('mongoose');
const { Schema } = mongoose;


const companySchema = new Schema({
    rnc: {
      type: Number,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    itbs: {
      type: Boolean,
      required: true,
      default: false
    },
    f606: {
      type: Boolean,
      required: true,
      default: false
    },
    f607: {
      type: Boolean,
      required: true,
      default: false
    },
    dateClose: {
      type: Date,
      required: true
    },
    monthlyPayment: {
      type: Number,
      required: true,
      default: 0
    },
    debt: {
      type: Number,
      required: true,
      default: 0
    }
  });

  const invoiceSchema = new Schema({
    month: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    payment: {
      type: Number,
      required: false
    },
    companyOwner: { type: mongoose.Types.ObjectId, ref: "Companies" }
  });
  
const companyModel = mongoose.model('Companies',companySchema);
const invoiceModel = mongoose.model('Invoices', invoiceSchema)
module.exports = { companyModel, invoiceModel }
