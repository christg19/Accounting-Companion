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
    const options = { new: true };

    let currentDate = new Date(req.body.dateClose);
    currentDate.setDate(currentDate.getDate() + 1);
    req.body.dateClose = currentDate;

    req.body.itbs = req.body.itbs ? true : false;
    req.body.f606 = req.body.f606 ? true : false;
    req.body.f607 = req.body.f607 ? true : false;

    const updatedCompany = await companyModel.findByIdAndUpdate(
      companyId,
      req.body,
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