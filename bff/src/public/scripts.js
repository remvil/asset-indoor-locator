const translations = {
	it: {
		welcome: "Benvenuto nell'Asset Indoor Locator",
		description: `Benvenuto, <br>
        Questa è l'applicazione demo di Asset Indoor Locator, progettata per monitorare i tag associati agli asset aziendali all'interno di edifici o strutture. All'indirizzo <strong>localhost</strong>, potrai vedere l'applicazione in azione, utilizzando API che restituiscono dati simulati a scopo dimostrativo.`,
		buttonText: "Vai alla documentazione API",
	},
	en: {
		welcome: "Welcome to the Asset Indoor Locator",
		description: `Welcome, <br>
        This is the demo application of Asset Indoor Locator, designed to monitor tags associated with company assets within buildings or facilities. At <strong>localhost</strong>, you can see the application in action, using APIs that return mock data for demonstration purposes.`,
		buttonText: "Go to API documentation",
	},
};

function changeLanguage() {
	const selectedLanguage = $("#language").val();
	$("#welcome-message").html(translations[selectedLanguage].welcome);
	$("#description").html(translations[selectedLanguage].description);
	$("#documentation-button").html(translations[selectedLanguage].buttonText);
	$("#application-button").html(translations[selectedLanguage].buttonText);
}

$(document).ready(function () {
	// $("#language-button").on("click", function () {
	// 	$("#language").toggle();
	// });

	// // Gestione del cambio lingua
	// $("#language").change(function () {
	// 	var selectedLanguage = $(this).val();
	// 	console.log("Lingua selezionata:", selectedLanguage);
	// });

	componentHandler.upgradeDom();

	// Gestione del click sul pulsante per aprire il menu a tendina
	$("#language-button").on("click", function () {
		$(".mdl-menu").toggleClass("is-visible");
	});

	// Gestione della selezione della lingua
	$(".mdl-menu__item").on("click", function () {
		const selectedLanguage = $(this).data("lang");
		$("#welcome-message").html(translations[selectedLanguage].welcome);
		$("#description").html(translations[selectedLanguage].description);
		$(".mdl-menu").removeClass("is-visible"); // Chiude il menu a tendina dopo la selezione
	});

	$("#mobile-app-link").on("click", (event) => {
		event.preventDefault();
		window.open(event.currentTarget.href, "_blank", "height=600,width=400,top=100,left=100,resizable==none,location=false");
	});
});
