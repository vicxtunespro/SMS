const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        studentData: {    firstName: {
                type: String,
                required: true
            },
            middleName: {
                type: String
            },
            lastName: {
                type: String,
                required: true
            },
            religion: {
                type: String,
                required: true
            },
            level: {
                type: String,
                required: true
            },
            dateOfBirth: {
                type: Date,
                required: true
            }},
            residence: {
                country: {
                    type: String,
                    required: true,
                },
                district: {
                    type: String,
                    require: true,
                },
                town: {
                    type: String,
                    require: true,
                }
            },

        parentsData: {    
            father: {
                fullName: {
                    type: String,
                    required: true
                },
                contact: {
                    type: String,
                    required: true
                },
                otherContact: {
                    type: String
                },
                email: {
                    type: String,
                    required: true
                },
                occupation: {
                    type: String,
                    required: true
                }
            },

            mother: {
                fullName: {
                    type: String,
                    required: true
                },
                contact: {
                    type: String,
                    required: true
                },
                otherContact: {
                    type: String
                },
                email: {
                    type: String,
                    required: true
                },
                occupation: {
                    type: String,
                    required: true
                }
            }
        }

    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student