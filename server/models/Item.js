const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Electronics, Plastic, Glass, Organic
    estimatedValue: { type: Number, required: true }, // Recyclable value in currency
    disposalChannel: { type: String, required: true }, // e.g., E-Waste Recycling Center, Composting Bin
    pickupScheduled: { type: Boolean, default: false }, // Has the user booked a pickup?
    pickupDate: { type: String, default: "Not Scheduled" }
}, { timestamps: true }); // Automatically adds creation date

module.exports = mongoose.model('Item', itemSchema);