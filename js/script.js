/* Définition des types de question */




/* Comportement de la boîte modale */

var quiz=localStorage.getItem('quiz');
if (quiz) {
	document.getElementById("contenuDuQuiz").value=quiz;
}

var closeButton = document.querySelector(".modal .delete");
var validationButton = document.querySelector(".modal .is-success");
var cancelButton = document.querySelector(".modal .modal-card-foot .button:nth-of-type(2)");

var modal = document.querySelector(".modal");

var menuModal = document.getElementById("menu")
menuModal.onclick = toggleModal;
closeButton.onclick = toggleModal;
cancelButton.onclick = toggleModal;
validationButton.onclick = changeContenuQuiz;

function toggleModal(e) {
	modal.classList.toggle("is-active");
}
function changeContenuQuiz(e) {
	var quiz=document.getElementById("contenuDuQuiz").value;
	if(quiz) {
		localStorage.setItem('quiz', quiz);
	}
	toggleModal();
}

