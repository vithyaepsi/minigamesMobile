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

$(".begin_04").on("click", function(){
	$(".game_frame").html('');
	$(".game_container").css("display", "none");
	$(".game_frame").css('display', "block");

	game_04();

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


/*
**	Point the right direction
**	Le jeu détermine une position aléatoire sur l'axe alpha et beta de l'accéléromètre (yaw et pitch)
**	(on pourrait utiliser également gamma, le roll)
**	Plus on s'approche de la position aléatoire, plus le téléphone vibre
**	Il faut verrouiller la position pendant 5 secondes pour gagner
*/
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
**	Keep the rhythm
**
**	Un rythme est choisi aléatoirement entre 80 et 160 BPM
**	Il est joué pendant X ticks
**	Le rythme n'est après ce délai plus représenté sur l'écran/audio/vibration
**	Il doit être maintenu par l'utilisateur en appuyant sur l'écran pendant X secondes
**	On tiendra compte de la somme du décalage pour déterminer le score
*/
function game_03(){

}



/*
**	Quiz
**	Plusieurs types de questions sont disponibles
**		-Identifier le sujet de la photo
**			4 réponses possibles sont choisies parmi les réponses de la base
**			L'une d'elle est le sujet de la photographie
**			La photo est ensuite révélée (vérifier qu'elle est chargée pour tout le monde ?)
**			La bonne réponse est révélée lorsque tout le monde a répondu (ou timeout)
**		-Trouver l'intrus
**			3 réponses sont choisies dans la même catégorie (chanteurs, humoristes... )
**			1 autre réponse est choisie dans une catégorie aléatoire autre que la première
**			Les 4 réponses sont révélées en même temps
**			
**
*/
function game_04(){
	var json_q = 
	{
		"id":"001",
		"match_name":"Jean Luc",
		"rounds":{
			0 : {
				"question" : {
					"name" : "Quel est l'intrus ?",
					"type" : "intrus"
				},
				"reponses" : {
					"01" : {
						"id" : "18",
						"text": "Choucroute"
					},
					"02" : {
						"id" : "184",
						"text": "Choux à la crème"
					},
					"03" : {
						"id" : "22",
						"text": "Tarte à la poire"
					},
					"04" : {
						"id" : "16",
						"text": "Fondant au chocolat"
					}
				}
			},
			1 : {
				"question" : {
					"name" : "Quel est le sujet de l'image ?",
					"type" : "image", 
					"img" : "topinambour.jpg"
				},
				"reponses" : {
					"01" : {
						"id" : "362",
						"text": "Tournevis"
					},
					"02" : {
						"id" : "4851",
						"text": "Roquefort"
					},
					"03" : {
						"id" : "961",
						"text": "Chien-loup"
					},
					"04" : {
						"id" : "212",
						"text": "Vitrier"
					}
				}
			}

		}
	};

	var quiz_end = function(){
		//	end the quiz, get the right answer, print it, award points
		console.log("time's up");

	};

	var play_round = function(round){
		console.log(round);
		$(".game_frame").html('');

		var div = $('<div class="game_04_container"></div>');
		$(".game_frame").append(div);

		var wrapper = $('<div class="wrapper"></div>');
		div.append(wrapper);

		var inner1 = $('<div class="inner1 centerer"><h1 class="title">'+ round.question.name +'</h1></div>');
		wrapper.append(inner1);


		console.log(typeof(round.question.img));
		if( typeof(round.question.img) != "undefined" && round.question.type == "image"){
			var inner12 = $('<div class="inner2 image_container centerer"></div></div>');
			wrapper.append(inner12);

			var innerdiv = $('<div></div>');
			inner12.append(innerdiv);

			var innerimage = new Image();
			$(innerimage).addClass("image_quiz");

			innerimage.onload = function(){
				//	send image loaded signal

				innerdiv.append(innerimage);
			}; 
			//	Déclenche le chargement de l'image
			innerimage.src = round.question.img;

		}

		var inner2 = $('<div class="inner3 answers_container"></div>');
		wrapper.append(inner2);


		var clicked = 1;
		$.each(round.reponses, function(key, value){
			

			var dudur = $('<h3>'+ value.text +'</h3>');
			dudur.on('click', function(){
				if(clicked == 1){
					$(this).css("border", "1px solid black");
					clicked--;
				}
				
			});
			inner2.append(dudur);

		});


	}

	var quiz_start = function(){
		var rounds = json_q["rounds"];

		//	Foreach rounds, play round, award points
		$.each(rounds, function(key, value){
			play_round(value);
			
			var foottimer = $('<span class="game_04_countdown"></span>');
			$(".footer_container").html(foottimer);

			console.log("ouate le fuque");
			countdown(10000, quiz_end, ".game_04_countdown");
			

		});

		//	Show leaderboards ?

	};

	//	Init match

	//	Print match name
	var div  = $('<div class="game_04_container"></div>');
	var div2 = $('<div class="wrapper"></div>');
	div.append(div2);

	var inner1 = $('<div class="centerer"><h1 class="title">'+ json_q["match_name"] +'</h1></div>');
	div2.append(inner1);

	var inner2 = $('<h2 class="title">La partie commence dans : <span class="game_04_countdown"></span> secondes</h2>');
	div2.append(inner2);

	$(".game_frame").append(div);

	//	Countdown to match start
	countdown(1000, quiz_start, ".game_04_countdown");

	//	Match start
	
	


}

/*
**	
**
*/
function game_05(){

}




/*
**	Valide la proximité entre deux angles allant de -179 à 180°
**	ARGS :
**	angl1 et angl2 deux int entre -179 et 180
**	prox la distance angulaire max entre les deux angles (entre -1 et 1)
**	
**	INUTILEMENT COMPLIQUÉ
*/
/*
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
}*/

/*
**	Calcule la distance entre les angles
**	angl1 et angl2 des valeurs de l'accéléromètre, entre -179 et 180.
*/
function angleDistance(angl1, angl2){
	//	on rend positif toutes les valeurs en décalant de 180 
	//	angl1 et angl2 sont entre 1 et 360
	//angl1 += 180;
	//angl2 += 180;

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

/*
**	countdown démarre un timer, et lance l'exécution de fund à la fin du timer
**	On peut mettre à jour un élément HTML à l'aide de target, représentant une classe CSS
**	time est en ms, doit être multiple de 1000
*/
function countdown(time, func, target){
	
	var countdownInterval;
	if(target !== null){
		$(target).html(time/1000);
		countdownInterval = setInterval(function() {
			time = time - 1000;
			$(target).html(time/1000);
			if(time == 0){
				clearInterval(countdownInterval);
				func();
				
			}
			else{
				console.log("not up");
			}
	    }, 1000);
	}
	else{
		setTimeout(func, time);
	}
}