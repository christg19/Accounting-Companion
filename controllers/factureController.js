const { invoiceModel } = require('../mongo/model/companyModel');
const { companyModel } = require('../mongo/model/companyModel');
const { ObjectId } = require('mongoose').Types;

exports.newInvoice = async (req, res, next) => {
  const companyId = req.params.companyId;
  const { month, description, payment } = req.body;

  const newInvoice = new invoiceModel({
    month,
    description,
    payment,
    companyOwner: new ObjectId(companyId)
  });
      const company = await companyModel.findById(companyId).exec();
      if (!company) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }

      if (newInvoice.description === 'Mensual') {
        const totalPayment = newInvoice.payment;
        const difference = company.monthlyPayment - totalPayment;
        if (difference > 0) {
          company.debt += difference;
        }
        if (company.debt > 0 & totalPayment > company.monthlyPayment) {
          const monthlyDiff = totalPayment - company.monthlyPayment
          company.debt -= monthlyDiff
          if (company.debt < 0) {
            company.extra += Math.abs(company.debt)
          }
        }
      } else if (newInvoice.description === 'Extra') {
        if (company.debt > 0) {
          company.debt -= newInvoice.payment;
          if (company.debt < 0) {
            company.extra += Math.abs(company.debt);
            company.debt = 0;
          }
        } else {
          company.extra += newInvoice.payment;
        }
      }

      if (newInvoice.payment > company.monthlyPayment) {
        req.flash('error', 'El pago no puede ser mayor al estipulado');
        setTimeout(() => {
          res.redirect('/test/' + companyId);
        }, 1000);
      } else {
        await company.save();
        await newInvoice.save();
    
        setTimeout(() => {
          res.redirect('/test/' + companyId);
        }, 1000);
      }
    };




exports.getCompaniesEdit = async (req, res) => {

  const companyId = req.params.id;

  // Consulta las facturas por companyId
  invoiceModel.find({ companyOwner: companyId }).lean()
    .then(invoices => {
      const modifiedResult = invoices.map(invoice => ({
        ...invoice,
        month: formatDate(invoice.month)
      }));

      res.render('test', { companyId: companyId, invoices: modifiedResult });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error al obtener las facturas de la compañía');
    });
};


exports.apiInvoice = async (req, res) => {
  try {
    const invoices = await invoiceModel.find();
    res.json(invoices);
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
    res.status(500).json({ error: 'Error al obtener las facturas' });
  }
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};

exports.invoicePatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment } = req.body;
    const updatedInvoice = await invoiceModel.findByIdAndUpdate(
      id,
      { payment },
      { new: true }
    );

    if (updatedInvoice) {
      const invoice = await invoiceModel.findById(id).exec();
      const company = await companyModel.findById(invoice.companyOwner).exec();

      if (!company) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }

      const diferencia = company.monthlyPayment - payment;
      company.debt = diferencia;

      await company.save();
      console.log(company.debt)
      return res.redirect(`/editInvoice/${id}`);
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("No se pudo actualizar el pago de la factura");
  }
};



exports.getEditInvoice = (req, res) => {
  const id = req.params.id;
  res.render('editFacture', { id })
}

exports.deleteFacture = async (req, res) => {
  try {
    const id = req.params.id;
    await invoiceModel.findByIdAndDelete(id);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).send("No se pudo eliminar la empresa");
  }
};
