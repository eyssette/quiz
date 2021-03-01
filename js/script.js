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


/**/

var el1 = document.getElementById('quiz-q22-z1');
var el2 = document.getElementById('quiz-q22-z2');
var el0 = document.getElementById('quiz-q22-z0');
new Sortable(el1, {
    group: 'quiz-q22'
});
new Sortable(el2, {
    group: 'quiz-q22'
});
new Sortable(el0, {
    group: 'quiz-q22'
});

var ordre1 = document.getElementById('quiz-q23-z0');
new Sortable(ordre1);

var association0 = document.getElementById('quiz-q24-z0');
var association1 = document.getElementById('quiz-q24-z1');
var association2 = document.getElementById('quiz-q24-z2');
new Sortable(association0, {
    group: 'quiz-q24'
});
new Sortable(association1, {
	group: {
		name: 'quiz-q24',
		put: function (to) {
		  return to.el.children.length < 1;
		}
	  },
});
new Sortable(association2, {
	group: {
		name: 'quiz-q24',
		put: function (to) {
		  return to.el.children.length < 1;
		}
	  },
});

var associationq250 = document.getElementById('quiz-q25-z0');
var associationq251 = document.getElementById('quiz-q25-z1');
var associationq252 = document.getElementById('quiz-q25-z2');
new Sortable(associationq250, {
    group: 'quiz-q25'
});
new Sortable(associationq251, {
	group: {
		name: 'quiz-q25',
		put: function (to) {
		  return to.el.children.length < 1;
		}
	  },
});
new Sortable(associationq252, {
	group: {
		name: 'quiz-q25',
		put: function (to) {
		  return to.el.children.length < 1;
		}
	  },
});


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

