function confirmDelete() {

    const isConfirmed = confirm("¿Estás seguro de que deseas eliminar este elemento?");

    return isConfirmed;
}

async function fetchCompanieData() {
    try {
        const response = await fetch('/api/companies');
        const companyData = await response.json();

        console.log(companyData);

        // Llamar a reminderDateClose con los datos de compañias obtenidos
        reminderDateClose(companyData);

    } catch (error) {
        console.error('Error al obtener los datos de las compañías:', error);
    }
}

function reminderDateClose(companyData) {
    if (companyData) {
        const modalMessageElement = document.getElementById('modalMessage');
        modalMessageElement.textContent = '';

        for (let i = 0; i < companyData.length; i++) {
            let companiesDate = new Date(companyData[i].dateClose);
            companiesDate.setDate(companiesDate.getDate() - 15);
            const actualDate = new Date();

            if (companiesDate.getDate() === actualDate.getDate()) {
                modalMessageElement.textContent += `🔔 Recuerda que la fecha de cierre de ${companyData[i].companyName} es en 15 días.\n \n`;
                setTimeout(() => {
                    const icon = document.getElementById('icon');
                    icon.style.color = 'red';
                    icon.classList.add('animated-icon');
                }, 1000);


            } else {
                // modalMessageElement.textContent += `🔔 Recuerda que la fecha de cierre de ${companyData[i].companyName} es en 15 días.\n \n`;
                console.log(`Date actual: ${actualDate}`)
                console.log(companiesDate)
                const icon = document.getElementById('icon');
                icon.style.color = '';
                icon.classList.remove('animated-icon');
            }
        }
    } else {
        console.log('No se han obtenido los datos de las compañías todavía.');
    }
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

fetchCompanieData();