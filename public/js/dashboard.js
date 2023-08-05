function confirmDelete() {

    const isConfirmed = confirm("¿Estás seguro de que deseas eliminar este elemento?");

    return isConfirmed;
}

async function fetchCompanieData() {
    try {
        const response = await fetch('/api/companies');
        const companyData = await response.json();

        console.log(companyData);

        reminderDateClose(companyData);

    } catch (error) {
        console.error('Error al obtener los datos de las compañías:', error);
    }
}

function reminderDateClose(companyData) {
    if (companyData) {
        const modalMessageElement = document.getElementById('modalMessage');
        modalMessageElement.innerHTML = ''; // Limpiamos el contenido anterior

        for (let i = 0; i < companyData.length; i++) {
            let companiesDate = new Date(companyData[i].dateClose);
            companiesDate.setDate(companiesDate.getDate() - 15);
            const actualDate = new Date();

            if (companiesDate.getDate() === actualDate.getDate()) {
                const message = companyData[i].companyName;
                // Usamos insertAdjacentHTML para insertar HTML renderizable
                modalMessageElement.insertAdjacentHTML('beforeend', `🔔 La fecha de cierre de <strong>${message}</strong> es en 15 días.<br><br>`);
                setTimeout(() => {
                    const icon = document.getElementById('icon');
                    icon.style.color = 'red';
                    icon.classList.add('animated-icon');
                }, 1000);
            } else {
                // ...
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