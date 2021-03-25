/* Définition des types de question */

function Question(id, regroupement, type, html) {
	this.id = id;
	this.regroupement = regroupement;
	this.type = type;
	this.html = html;
	if (type == "vf") {
		this.calculresultat = 1;
	}
	if (type == "on") {
		this.calculresultat = 2;
	}
}

function htmlVF(id, question) {
	let html = `<div class="card block" id="quiz-q${id}">
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


let q1 = new Question(1, 1, "vf", htmlVF(1, "Test question"));


/* Gestion des éléments SORTABLE */

let el1 = document.getElementById('quiz-q22-z1');
let el2 = document.getElementById('quiz-q22-z2');
let el0 = document.getElementById('quiz-q22-z0');
new Sortable(el1, {
	group: 'quiz-q22'
});
new Sortable(el2, {
	group: 'quiz-q22'
});
new Sortable(el0, {
	group: 'quiz-q22'
});

let ordre1 = document.getElementById('quiz-q23-z0');
new Sortable(ordre1);

let association0 = document.getElementById('quiz-q24-z0');
let association1 = document.getElementById('quiz-q24-z1');
let association2 = document.getElementById('quiz-q24-z2');
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

let associationq250 = document.getElementById('quiz-q25-z0');
let associationq251 = document.getElementById('quiz-q25-z1');
let associationq252 = document.getElementById('quiz-q25-z2');
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

let bonnesReponses = {
	"quiz-q1": "1",
	"quiz-q4-r1": "A",
	"quiz-q7": "1",
	"quiz-q10-r1": "1",
	"quiz-q10-r2": "1",
	"quiz-q13": "A",
	"quiz-q16-r1": "1",
	"quiz-q16-r2": "1",
	"quiz-q16-r3": "1",
	"quiz-q19": "A",
};

/* Calcul de la similarité entre deux objets */
const findSimilarity = (first, second) => {
	const firstLength = Object.keys(first).length;
	const secondLength = Object.keys(second).length;
	const smaller = firstLength < secondLength ? first : second;
	const greater = smaller === first ? second : first;
	const count = Object.keys(smaller).reduce((acc, val) => {
		if (Object.keys(greater).includes(val)) {
			if (greater[val] === smaller[val]) {
				return ++acc;
			};
		};
		return acc;
	}, 0);
	return count;
	/*return (count / Math.min(firstLength, secondLength)) * 100;*/
};



/* Test résultats du formulaire */
let validationForm = document.getElementById('validation');
validationForm.onclick = resultats;

let affichageResultats = document.getElementById('resultats');
let refaireLeQuiz = document.getElementById('refaireLeQuiz');
let modifierSesReponses = document.getElementById('modifierSesReponses');

refaireLeQuiz.onclick = refaireQuiz;
modifierSesReponses.onclick = modifierReponses;


function resultats(e) {
	/* Traitement des questions issues du formulaire */
	let myForm = document.getElementById('form-quiz');
	formData = new FormData(myForm);

	/* Traitement des QCM */
	/*var questionQCM = document.getElementsByClassName('quiz-type-QCM');
	for (let index = 0; index < questionQCM.length; index++) {
		let idElement=questionQCM[index]['id'];
		let reponsesQCM=formData.getAll(idElement);
		formData.append(idElement, reponsesQCM);
	}*/

	/* Ajout au formulaire des réponses aux questions de type SORTABLE */
	let sortables = document.getElementsByClassName('quiz-type-sortable');
	for (let index = 0; index < sortables.length; index++) {
		let idElement = sortables[index]['id'];
		let classElement = sortables[index]['classList'];
		/* Traitement des questions de type ORDRE */
		if (classElement.contains('quiz-type-ordre')) {
			let reponse = Array.from(document.getElementById(idElement + "-z0").getElementsByTagName("p")).map(element => {
				const contenu = element.innerHTML;
				return contenu;
			});;
			formData.append(idElement, reponse);
		} else {
			/* Traitement des questions de type ETIQUETTE + ASSOCIATION + ANNOTATIONS */
			let zones = document.querySelectorAll('#' + idElement + ' .quiz-zone');
			for (let index = 0; index < zones.length; index++) {
				let zoneId = zones[index]['id'];
				let reponse = Array.from(document.getElementById(zoneId).getElementsByTagName("p")).map(element => {
					const contenu = element.innerHTML;
					return contenu;
				});;
				if (reponse != "") {
					formData.append(zoneId, reponse);
				}
			}
		}
	}

	let tableauResultats = Object.fromEntries(formData.entries());


	/* Comparaison résultats et bonnes réponses*/

	const nombreReponsesJustes = findSimilarity(tableauResultats, bonnesReponses);
	const nombreReponses = Object.keys(tableauResultats).length;
	const pourcentageReponsesJustes = Math.round((nombreReponsesJustes / nombreReponses) * 100);

	document.getElementById("nombreReponsesJustes").innerHTML = nombreReponsesJustes;
	if (nombreReponsesJustes > 1) {
		document.getElementById("syntagmeReponse").innerHTML = 'réponses justes';
	}
	document.getElementById("nombreReponses").innerHTML = nombreReponses;
	document.getElementById("pourcentageReponsesJustes").innerHTML = pourcentageReponsesJustes;
	document.getElementById("barreReponsesJustes").value = pourcentageReponsesJustes;

	affichageResultats.style.visibility = 'visible';

}

function refresh(e) {
	/* fonction pour remettre le quiz à zéro */
}

function refaireQuiz(e) {
	refresh();
	affichageResultats.style.visibility = 'hidden';
	window.scrollTo(0, 0);
}

function modifierReponses(e) {
	window.scrollTo(0, 0);
}

/* Gestion du codage du Quiz */

if (window.location.hash.slice(1)) {
	let quizEncodage=window.location.hash.slice(1);
	let quiz=decodeURI(quizEncodage);
	document.getElementById("contenuDuQuiz").value = quiz;
} else {
	let quiz = localStorage.getItem('quiz');
	document.getElementById("contenuDuQuiz").value = quiz;
}


/* Comportement de la boîte modale */

let closeButton = document.querySelector(".modal .delete");
let validationButton = document.querySelector(".modal .is-success");
let cancelButton = document.querySelector(".modal .modal-card-foot .button:nth-of-type(2)");

let modal = document.querySelector(".modal");

let menuModal = document.getElementById("menu")

menuModal.onclick = toggleModal;
closeButton.onclick = toggleModal;
cancelButton.onclick = toggleModal;
validationButton.onclick = changeContenuQuiz;

function toggleModal(e) {
	modal.classList.toggle("is-active");
}

function changeContenuQuiz(e) {
	let quiz = document.getElementById("contenuDuQuiz").value;
	if (quiz) {
		localStorage.setItem('quiz', quiz);
	}
	toggleModal();
}