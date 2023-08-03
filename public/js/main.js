// Data de atlas
async function fetchCompanieData() {
  try {
    const response = await fetch('/api/companies');
    const companyData = await response.json();

    console.log(companyData);

  } catch (error) {
    console.error('Error al obtener los datos de las compañías:', error);
  }
}

// data de atlas (facturas)
async function fetchInvoiceData() {
  try {
    const response = await fetch('/api/invoices');
    const invoiceData = await response.json();

    console.log(invoiceData);
    // calcularDeuda(invoiceData);

  } catch (error) {
    console.error('Error al obtener los datos de factura:', error);
  }
}

fetchInvoiceData();
fetchCompanieData();

// Funciones de la página

function reminderDateClose(companyData) {
  if (companyData) {
    // Verifica si los datos están disponibles
    for (let i = 0; i < companyData.length; i++) {
      let companiesDate = new Date(companyData[i].dateClose);
      companiesDate.setDate(companiesDate.getDate() - 15);
      const actualDate = new Date();

      if (companiesDate.getTime() === actualDate.getTime()) {
        M.toast({
          html: `El pago de ${companyData[i].companyName} está pendiente`,
          classes: 'rounded blue lighten-2'
        });
      } else {
        M.toast({
          html: `${companyData[i].companyName} no tiene pagos pendientes`,
          classes: 'rounded blue lighten-2'
        });
      }
    }
  } else {
    console.log('No se han obtenido los datos de las compañías todavía.');
  }
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}