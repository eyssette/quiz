# Quiz

Voici une sélection de quiz créés avec [Text2Quiz](https://text2quiz.vercel.app/).

N'hésitez pas à m'envoyer les quiz que vous avez créés pour que je les ajoute à cette page !

<form action="https://api.staticforms.xyz/submit" method="post">
	<input type="hidden" name="accessKey" value="f261cf48-214e-49b4-9749-d7d3e97ea456"> <!-- Required -->
	<ul>
	<li><label>Votre nom<input type="text" name="name"></label></li>
	<li><label>Votre mail<input type="text" name="email"></label></li>
	<li><label>Lien vers votre quiz<input type="text" name="$Link"></label></li>
	</ul>
	<textarea name="message">Précision sur le contenu de ce quiz</textarea>
	<!-- If we receive data in this field submission will be ignored -->
	<input type="hidden" name="redirectTo" value="https://eyssette.github.io/quiz/">
	<input type="text" name="honeypot" style="display: none;"> <!-- Optional -->
	<input type="submit" value="Submit" />
</form>
