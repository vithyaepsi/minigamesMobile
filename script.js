function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(".begin").on("click", function(){
	$(".game_frame").html('');
	$(".game_container").css("display", "none");
	$(".game_frame").css('display', "block");

	game_01();

});

$(".begin_02").on("click", function(){
	$(".game_frame").html('');
	$(".game_container").css("display", "none");
	$(".game_frame").css('display', "block");

	game_02();

});


/*
**	Click the animals !
**	Des animaux apparaissent sur l'écran aléatoirement, il faut cliquer sur tous les animaux cible pour les faire disparaître
**	Si vous cliquez incorrectement 3 fois de suite, vous perdez des points.
**	Le jeu se termine lorsque tous les animaux cibles ont été trouvés.
**	Plus vite vous complèterez le jeu, plus vous gagnerez de points.
*/
function game_01(){

	var gameinit = function(){
		$("body").on("click", ".game_floating_animal.clickable", function(){
		   $(this).css("display", "none");
		});

		gameGeneration("furet.png", true, 30);
		gameGeneration("ecureuil.png", false, 30);
		gameGeneration("fouine.png", false, 20);
	};

	var gameGeneration = function(image_path, clickable, nb_images){
		var imagen = new Image();		
		imagen.image_path = image_path;
		imagen.clickable = clickable;
		imagen.nb_images = nb_images;

		imagen.onload = function(){
			imageGeneration(this);
		}; 
		//	Déclenche le chargement de l'image
		imagen.src = image_path;
	};

	var imageGeneration = function(imagen){
		var src_image_height = imagen.height;
		var src_image_width = imagen.width;
		
		var window_height = $(".game_frame").height();
		var window_width = $(".game_frame").width();

		for(var i = 0; i < imagen.nb_images; i++){
			var img = $('<img src="'+ imagen.image_path +'" />');
			var div = $('<div class="game_floating_animal furet_'+ i +'"></div>');

			if(imagen.clickable === true){
				div.addClass("clickable");
			}
			else{
				div.addClass("unclickable");
			}

			var image_height = getRandomInt(50, 150);
			var image_width = ( image_height * src_image_width ) / src_image_height;


			/*console.log("img_w " + image_width);
			console.log("win_w " + window_width);*/

			//	Generate random position to place animal
			var random_posx = getRandomInt(0, window_width-image_width);

			console.log(random_posx+" posx");
			var random_posy = getRandomInt(0, window_height-image_height);

			div.css('margin-top', random_posy+"px");
			div.css('margin-left', random_posx+"px");

			div.append(img);
			$('.game_frame').append(div);

			img.css("width", image_width);
			img.css("height", image_height);
		}
	}
	gameinit();

}

function game_02(){
	var gameinit = function(){
		var x_dir = 0;
		var y_dir = getRandomInt(-180, 179);

		var winner = false;
		var winner_ticks = 0;
		var current_x = 0;
		var current_y = 0;
		
		var vibrationIntensity = 0;



		function handleOrientation(event) {
			current_x = event.alpha;
			current_y = event.beta;

			console.log( "beta : " + current_y + " | alpha : "+ current_x );

		}

		window.addEventListener('deviceorientation', handleOrientation);

		var interval = setInterval(function() { 
			
			if(winner_ticks >= 10) { 
		   		console.log("You're winner");
		    	clearInterval(interval);
		    	stopVibration();
		   	}
		   	else if (winner_ticks < 10) { 
		   		stopVibration();

			   	vibrationIntensity = 0;
			   	vibrationIntensity += calculateIntensity(angleDistance(x_dir, current_x), 33);
			   	vibrationIntensity += calculateIntensity(angleDistance(y_dir, current_y), 33);

				vibration(vibrationIntensity);

		    	if(	
		    		angleDistance(x_dir, current_x) < 5 && 
		    		angleDistance(y_dir, current_y) < 5 

		    		){
		    		winner_ticks += 1;
		    	}
		   	}
		   	

		   	//console.log("ouineur ticks : " + winner_ticks);
		}, 500);
	};

	gameinit();
}

/*
**	Valide la proximité entre deux angles allant de -179 à 180°
**	ARGS :
**	angl1 et angl2 deux int entre -179 et 180
**	prox la distance angulaire max entre les deux angles (entre -1 et 1)
**	
**
*/
function Angles(angl1, angl2, prox){
	//if()
	var sin1 = radToSin(degreesToRad(angl1));
	var sin2 = radToSin(degreesToRad(angl2));
	var cos1 = radToCos(degreesToRad(angl1));
	var cos2 = radToCos(degreesToRad(angl2));

	console.log( (sin1 - sin2) > -prox );
	if( 
		( 
			(sin1 - sin2) > -prox && 
			(sin1 - sin2) < prox 
		) 
		&&
		(
			(cos1 - cos2) > -prox && 
			(cos1 - cos2) < prox
		)
	){
		console.log("close enough");
	}
	else{
		console.log("sucky sucky");
	}
}

/*
**	Calcule la distance entre les angles
**	angl1 et angl2 des valeurs de l'accéléromètre, entre -179 et 180.
*/
function angleDistance(angl1, angl2){
	//	on rend positif toutes les valeurs en décalant de 180 
	//	angl1 et angl2 sont entre 1 et 360
	angl1 += 180;
	angl2 += 180;

	//	Si les angles, pour une raison inconnue, dépassent 360, on utilise le modulo pour récupérer une valeur entre 1 et 360
	angl1 = angl1 % 360;
	angl2 = angl2 % 360;

	if(angl1 < angl2){
		var temp = angl1;
		angl1 = angl2;
		angl2 = temp;
	}

	var dist = angl1 - angl2;

	//	Si la distance angulaire entre les deux angles est supérieure à 180°,
	//	la distance sera plus courte en tenant compte de la continuité des angles
	if( dist > 180 ){
		dist = 360 - dist;
	}

	return dist;
}

function degreesToRad(test){
	var rad = ( (test * Math.PI) / 180 );
	return rad;
}
function radToSin(input){
	var num = Math.sin(input);
	num = Math.round(num * 1000) / 1000;
	return num;
}
function radToCos(input){
	var num = Math.cos(input);
	num = Math.round(num * 1000) / 1000;
	return num;
}

/*
**	Fait vibrer le téléphone par rapport à la var intensity, un int entre 0 et 100
**	Si intensity = 100, le téléphone vibrera continuellement
**	intensity ne représente pas réellement l'intensité, mais la durée de vibration
*/
var vibrateInterval;
function vibration(intensity){
	var interval = 100;

	vibrateInterval = setInterval(function() {
        navigator.vibrate(intensity);
        console.log("I'm vibrating at " + intensity + " / "+ interval);
    }, interval);
}

/*
**	Arrête toute vibration
*/
function stopVibration(){
	// Vide l'intervalle et annule les vibrations persistantes
    if(vibrateInterval) clearInterval(vibrateInterval);
    navigator.vibrate(0);
}

/*
**	proximity un int entre 0 et 180, représente la distance entre deux angles
**	maxVal un int entre 0 et 100
**	L'intensité est incrémentée à partir de seuils, plus la distance est basse, plus l'intensité est élevée.
*/
function calculateIntensity(proximity, maxVal){
	if(proximity < 5){
		increment = 100;
	}
	else if(proximity < 15){
		increment = (2/3)*100;
	}
	else if(proximity < 30){
		increment = (1/3)*100;
	}
	else{
		increment = 0;
	}
	//console.log("increment is " + increment);

	return Math.round(((increment / 100) * maxVal));
}
