const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    firstName: {
        type: String,
        maxlength: 255,
        required: true
    },
    lastName: {
        type: String,
        maxlength: 255,
        required: true
    },
    profession: {
        type: String,
        maxlength: 255,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
    },
    image:{
        type: String
    }
});
const Employers = mongoose.model('employers', StaffSchema, 'employers');

module.exports = {
    allEmployer: async () =>{
        return await Employers.find();
    },
    getEmployerById: async (id)=>{
        return await Employers.findById(id);
    },
    addEmployer: async (image, userInput)=>{
        const employer = {
            firstName: userInput.firstname,
            lastName: userInput.lastname,
            profession: userInput.profession,
            description: userInput.description,
            image: image
          }
          await new Employers(employer).save();
    },
    updateEmployer: async (id, image, userInput) => {
        const employer = await Employers.findById(id);
        employer.image = image
        employer.firstName = userInput.firstname;
        employer.lastName = userInput.lastname;
        employer.profession = userInput.profession;
        employer.description = userInput.description;
        await employer.save();
    },
    deleteEmployer: async (id)=> {
      return await Employers.deleteOne({_id: id});
    }
}



