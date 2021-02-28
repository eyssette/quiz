/* Définition des types de question */

function Question(id,regroupement,type,html) {
	this.id=id;
	this.regroupement=regroupement;
	this.type=type;
	this.html=html;
	if(type=="vf") {
		this.calculresultat=1;
	}
	if(type=="on") {
		this.calculresultat=2;
	}
}

function htmlVF(id,question) {
let html=`<div class="card block" id="quiz-q${id}">
<div class="card-content">
	<div class="content">
		${question}
	</div>
	<div class="control is-size-5 is-size-6-mobile">
		<label class="radio">
			<input type="radio" name="answer">
			Vrai
		</label>
		<label class="radio">
			<input type="radio" name="answer">
			Faux
		</label>
	</div>
</div>
</div>`;
return html;
}


q1= new Question(1,1,"vf",htmlVF(1,"Test question"));


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

