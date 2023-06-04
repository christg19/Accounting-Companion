const {companyModel} = require('../mongo/model/companyModel');
const express = require('express');
const router = express.Router();

function getYesNoValue(value) {
  return value ? 'Sí' : 'No';
};

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};

exports.renderDashboardAndTest = (req, res) => {
  companyModel.find().lean()
    .then((result) => {
      const modifiedResult = result.map(company => ({
        ...company,
        itbs: getYesNoValue(company.itbs),
        f606: getYesNoValue(company.f606),
        f607: getYesNoValue(company.f607),
        dateClose: formatDate(company.dateClose),
        cardColor: checkDebtColor(company.itbs, company.f606, company.f607)
      }));

      res.render('dashboard', { companies: modifiedResult });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error al obtener los datos de la base de datos' })
    });
};

function checkDebtColor(itbs, f606, f607) {
  if (itbs && f606 && f607) {
    return 'card-header bg-success';
  } else {
    return 'card-header bg-danger';
  }
}


exports.getDashboard = async (req, res) => {
    try {
      const companies = await companyModel.find();
      res.render('dashboard', { companies });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al cargar el dashboard');
    }
  };
