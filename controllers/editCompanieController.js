const {companyModel} = require('../mongo/model/companyModel');
const express = require('express');
const router = express.Router();

exports.getCompaniesEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await companyModel.findById(id).lean();
    res.render('edit', { company: company });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al cargar el dashboard');
  }
};

  exports.formPut = async (req, res) => {
    try {
      const companyId = req.params.id;
      const newData = req.body;
      const options = { new: true };
  
      let currentDate = new Date(newData.dateClose);
  
      currentDate.setDate(currentDate.getDate() + 1);
      newData.dateClose = currentDate;
  
      const updatedCompany = await companyModel.findByIdAndUpdate(
        companyId,
        newData,
        options
      );
  
      if (updatedCompany) {
        return res.redirect("/dashboard");
      } else {
        res.json({ success: false });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("No se pudo actualizar la data");
    }
  };