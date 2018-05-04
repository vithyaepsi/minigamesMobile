function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(".begin").on("click", function(){
	$(".game_container").css("display", "none");
	$(".game_frame").css('display', "block");

	game_01();

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