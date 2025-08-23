// models/Employee.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    empid: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    hra: { type: Number, default: 0 },  // House Rent Allowance
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, default: 0 },
    // any other fields if needed
}, { timestamps: true });

// Middleware or method to calculate net salary
employeeSchema.methods.calculateSalary = function () {
    // Simple calculation: netSalary = baseSalary + hra - deductions
    this.netSalary = this.baseSalary + this.hra - this.deductions;
};

module.exports = mongoose.model('Employee', employeeSchema);
