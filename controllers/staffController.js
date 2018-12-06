const {
    allEmployer,
    getEmployerById,
    addEmployer,
    updateEmployer,
    deleteEmployer
  } = require('../models/Staff');

  const asyncMiddleware = require('../helper/asyncMiddleware');

  module.exports = {
    renderStaffPage: 
        asyncMiddleware(async (req, res) => {
              const employersAll = await allEmployer();
              res.render('staff/staff', {
                employers: employersAll
              })
          }, 'staff'),
    renderAddStaffPage: (req, res) => {
        res.render('staff/addStaff');
      },
    renderUpdateStaffPage:  
        asyncMiddleware(async (req, res) => {
              const employer = await getEmployerById(req.params.id);
              if (!employer) {
                throw err
              }
              res.render('staff/updateStaff', {
                employer: employer
              });
          }, 'staff'),
    addNewEmployer:
          asyncMiddleware(async (req, res) => {
              if (req.file == undefined) {
                req.flash('error_msg', 'Please select an image')
                res.redirect('/staff/addstaff');
              } else {
                let image = req.file.filename;
                let userInput = req.body;
                await addEmployer(image, userInput);
                req.flash('success_msg', 'New employer added successfully!')
                res.redirect('/staff');
              }
          }, 'staff/addstaff'),
    editEmployer:
          asyncMiddleware(async (req, res) => {
            const id = req.params.id;
              if (req.file == undefined) {
                req.flash('error_msg', 'Please select an image')
                res.redirect(`/staff/updatestaff/${id}`);
              }else{
                const image = req.file.filename;
                const userInput = req.body;
                await updateEmployer(id, image, userInput);
                req.flash('success_msg', 'Employer edited successfully!')
                res.redirect('/staff');
              }
          }, 'staff'),
    removeEmployer: 
        asyncMiddleware(async (req, res) => {
              await deleteEmployer(req.params.id);
              req.flash('success_msg', 'Employer removed');
              res.redirect('/staff');
          }, 'staff')
  }