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
	div.append(img);
	$('.game_frame').append(div);

	img.on("load", function(){
	for(var i = 0; i < 10; i++){
		//$(".game_frame").append($('<div class="game_floating_animal furet_'+ i +'"><img src="furet.png" /></div>'));
		var img = $('<img src="furet.png" />');
		var div = $('<div class="game_floating_animal furet_'+ i +'"></div>');

		
			//var image_height = getRandomInt(50, 150);

			var image_height = img.height();
			var image_width = img.width();
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

	}
	});

			

			


}