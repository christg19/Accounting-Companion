var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// Funciones para manejar el modal
const openModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
};

// modal
btn.onclick = openModal;
span.onclick = closeModal; 

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
};