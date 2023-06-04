const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const companiesController = require('../controllers/companiesController');
const editCompanieController = require('../controllers/editCompanieController');
const factureController = require('../controllers/factureController');

router.use(express.urlencoded({ extended: true }));

// Obtener todas las empresas en formato JSON
router.get('/api/companies', companiesController.apiCompanies);

// Obtener facturas formato JSON
router.get('/api/invoices', factureController.apiInvoice);

// Obtener todas las empresas en formato JSON
router.get('/companies', companiesController.jsonUser);

// Crear una nueva empresa
router.post('/create-company', companiesController.createCompany);

// Obtener data de atlas
router.post('/dashboard', companiesController.newModel);

// Borrar empresa
router.delete('/dashboard/:id', companiesController.deleteCompanies);

// Borrar factura
router.delete('/test/:id', factureController.deleteFacture)

// Renderizar la página de dashboard
router.get('/dashboard', dashboardController.renderDashboardAndTest);

// Obtener empresa para editar
router.get('/edit/:id', editCompanieController.getCompaniesEdit);

// Agregar factura a empresa
router.post('/test/:companyId/', factureController.newInvoice);

// Obtener empresa para editar en la página de test
router.get('/test/:id', factureController.getCompaniesEdit);

//Editar factura vista
router.get('/editInvoice/:id', factureController.getEditInvoice)

// Actualizar empresa
router.put('/edit/:id', editCompanieController.formPut);

//Actualizar factura 
router.patch('/editInvoice/:id', factureController.invoicePatch)
module.exports = router;
