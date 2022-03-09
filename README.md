# Quiz

Voici une sélection de quiz créés avec [Text2Quiz](https://text2quiz.vercel.app/).

N'hésitez pas à m'envoyer les quiz que vous avez créés pour que je les ajoute à cette page !

<form action="https://api.staticforms.xyz/submit" method="post">
	<input type="hidden" name="accessKey" value="f261cf48-214e-49b4-9749-d7d3e97ea456"> <!-- Required -->
	<label>Votre nom :<input type="text" name="name"></label><br>
	<label>Votre mail :<input type="text" name="email"></label><br>
	<label>Lien vers votre quiz :<input type="text" name="$Link"></label><br>
	<label>Discipline et niveau concernés :<input type="text" name="$Discipline_et_niveau"></label><br>
	<label>Précisions sur le contenu de ce quiz :<br>
	<textarea name="message" rows="5" cols="33"></textarea></label><br>
	<!-- If we receive data in this field submission will be ignored -->
	<input type="hidden" name="redirectTo" value="https://eyssette.github.io/quiz/">
	<input type="text" name="honeypot" style="display: none;"> <!-- Optional -->
	<input type="submit" value="Envoyer" />
</form>

<style>
	input {margin-left:1em; }
	label {margin-top:0.5em;}
</style>