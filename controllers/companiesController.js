const { companyModel } = require('../mongo/model/companyModel');
const express = require('express');
const router = express.Router();

exports.newModel = (req, res, next) => {
  const { rnc, companyName, itbs, f606, f607, dateClose, monthlyPayment } = req.body;

  let currentDate = new Date(dateClose);

  currentDate.setDate(currentDate.getDate() + 1);

  const newCompany = new companyModel({
    rnc,
    companyName,
    itbs,
    f606,
    f607,
    dateClose: currentDate,
    monthlyPayment 
  });
  console.log(`Fecha de cierre test: ${currentDate}`)
  newCompany
    .save()
    .then(() => {
      setTimeout(() => {
        res.redirect('/dashboard');
      }, 1000);
    })
    .catch((error) => {
      next(error); // Llamar a next con el error para pasar al siguiente middleware de manejo de errores
    });
};


  exports.jsonUser = async (req, res) => {
    try {
      const companies = await companyModel.find()
      res.json(companies);
    } catch (error) {
      console.error('Error al obtener las empresas:', error);
      res.status(500).json({ error: 'Error al obtener las empresas' });
    }
  }

  exports.createCompany = (req, res) => {
    const newData = req.body;
  
    companyModel.create(newData)
      .then(createdCompany => {
        res.json(createdCompany);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error al crear la compañía' });
      });
  };

exports.apiCompanies = async (req, res) => {
  try {
    const companies = await companyModel.find();
    res.json(companies);
  } catch (error) {
    console.error('Error al obtener las empresas:', error);
    res.status(500).json({ error: 'Error al obtener las empresas' });
  }
}

exports.deleteCompanies = async (req, res) => {
  try {
    const id = req.params.id;
    await companyModel.findByIdAndDelete(id);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).send("No se pudo eliminar la empresa");
  }
};



