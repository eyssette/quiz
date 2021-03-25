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


/* Gestion des éléments SORTABLE */

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



/* Tableau des bonnes réponses*/

var bonnesReponses={"quiz-q1": "1","quiz-q4":"A,C"};

/* Calcul de la similarité entre deux objets */
const findSimilarity = (first, second) => {
	const firstLength = Object.keys(first).length;
	const secondLength = Object.keys(second).length;
	const smaller = firstLength < secondLength ? first : second;
	const greater = smaller === first ? second : first;
	const count = Object.keys(smaller).reduce((acc, val) => {
	   if(Object.keys(greater).includes(val)){
		  if(greater[val] === smaller[val]){
			 return ++acc;
		  };
	   };
	   return acc;
	}, 0);
	return count;
	/*return (count / Math.min(firstLength, secondLength)) * 100;*/
 };



/* Test résultats du formulaire */
var validationForm=document.getElementById('validation');
validationForm.onclick = resultats;

function resultats(e) {
	/* Traitement des questions issues du formulaire */
	var myForm = document.getElementById('form-quiz');
	formData = new FormData(myForm);

	/* Traitement des QCM */
	var questionQCM = document.getElementsByClassName('quiz-type-QCM');
	for (let index = 0; index < questionQCM.length; index++) {
		let idElement=questionQCM[index]['id'];
		let reponsesQCM=formData.getAll(idElement);
		formData.append(idElement, reponsesQCM);
	}

	/* Ajout au formulaire des réponses aux questions de type SORTABLE */
	var sortables = document.getElementsByClassName('quiz-type-sortable');
	for (let index = 0; index < sortables.length; index++) {		
		idElement=sortables[index]['id'];
		classElement=sortables[index]['classList'];
		/* Traitement des questions de type ORDRE */
		if (classElement.contains('quiz-type-ordre')){
			var reponse = Array.from(document.getElementById(idElement+"-z0").getElementsByTagName("p")).map(element => {
				contenu = element.innerHTML;
			   return contenu;
			 });;
			 formData.append(idElement, reponse);
		} else {
			/* Traitement des questions de type ETIQUETTE + ASSOCIATION + ANNOTATIONS */
			var zones = document.querySelectorAll('#'+idElement + ' .quiz-zone');
			for (let index = 0; index < zones.length; index++) {
				var zoneId = zones[index]['id'];
				var reponse = Array.from(document.getElementById(zoneId).getElementsByTagName("p")).map(element => {
					contenu = element.innerHTML;
				   return contenu;
				 });;
				 formData.append(zoneId, reponse);
			}
		}
	}

	var tableauResultats=Object.fromEntries(formData.entries());
	
	console.log(tableauResultats);

/* Comparaison résultats et bonnes réponses*/
console.log(findSimilarity(tableauResultats,bonnesReponses));

}




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

