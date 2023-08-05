async function fetchCompanieData() {
    try {
      const response = await fetch('/api/companies');
      const companyData = await response.json();
  
      console.log(companyData);
  
    } catch (error) {
      console.error('Error al obtener los datos de las compañías:', error);
    }
  }