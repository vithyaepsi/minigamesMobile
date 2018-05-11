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

function game_01(){

	var image_path = "furet.png";


	$("body").on("click", ".game_floating_animal", function(){
	   $(this).css("display", "none");
	});

	var imagen = new Image();

	var gameinit = function(){
		var src_image_height = imagen.height;
		var src_image_width = imagen.width;

		for(var i = 0; i < 40; i++){
			var img = $('<img src="'+ image_path +'" />');
			var div = $('<div class="game_floating_animal furet_'+ i +'"></div>');

			var image_height = getRandomInt(50, 150);
			var image_width = ( image_height * src_image_width ) / src_image_height;

			
			var window_height = $(".game_frame").height();
			var window_width = $(".game_frame").width();

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
	};

	imagen.onload = gameinit;

	//	Déclenche le chargement de l'image
	imagen.src = image_path;

}

function game_02(){
	var gameinit = function(){
		var x_dir = getRandomInt(-180, 179);
		var y_dir = 0;

		var winner = false;
		var winner_ticks = 0;

		var interval = setInterval(function() { 
			


		   	if (winner != false && winner_ticks > 10) { 
		    	
		   	}
		   	else { 
		    	clearInterval(interval);
		   	}
		}, 5000);

	};
}

/*
**	Valide la proximité entre deux angles allant de -179 à 180°
**	ARGS :
**	angl1 et angl2 deux int entre -179 et 180
**	prox la distance angulaire max entre les deux angles 
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
		( (sin1 - sin2) > -prox && 
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

function degreesToRad(test){
	var rad = ( (test * Math.PI) / 180 );
	//console.log(rad);
	return rad;
	//console.log(num);
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


function unitTest(){
	for(var i = -210; i < 190; i += 10){
		console.log("angle = "+ i);
		Angles(180, i, 0.20);
	}
}