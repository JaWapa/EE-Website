// Fetch cookies
function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

// http://playerio-a.akamaihd.net/everybody-edits-su9rn58o40itdbnw69plyw/Everybody%20Edits%20Website/images/bgs/  can be used to pull background images from gamesnet.

$(document).ready(function load() {
	var backgrounds = ['Moonbase', 'Syssba', 'Veil', 'Caves', 'Farm', 'Samurai', 'Osiris', 'Mirage', 'Christmas'];
	var bg_random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
	var image_path = 'http://playerio-a.akamaihd.net/everybody-edits-su9rn58o40itdbnw69plyw/Everybody%20Edits%20Website/images/bgs/';
	var bg_cookie = getCookie('bgimage');
	var op_cookie = getCookie('opacity');

	// Set background from cookies or load random image
	$(function setBG() {
		if (document.cookie.indexOf('bgimage') >= 0) {
			$('.background').css('background-image', 'url(http://playerio-a.akamaihd.net/everybody-edits-su9rn58o40itdbnw69plyw/Everybody%20Edits%20Website/images/bgs/' + bg_cookie + '.png)');
		}
		if (document.cookie.indexOf('bgimage') <= 0 || bg_cookie == "random" || bg_cookie == "null") {
			$('.background').css('background-image', 'url(' + image_path + bg_random + '.png)');
		}
		var i = 0;
		while(i < backgrounds.length) {
			var option = document.createElement('option');
 			option.innerHTML = backgrounds[i];
  		option.value = backgrounds[i];
  		bgSelection.appendChild(option);
  		i++;
  	}
	});

	// Set opacity from cookies
	$(function setOP() {
		if (document.cookie.indexOf('opacity') >= 0) {
			$('.opacity').css('opacity', op_cookie);
			$('#opSelection').val(op_cookie);
		}
	});
});

// If settings menu is visible
$('#myModal').on('show.bs.modal', function (e) {
  $('#ee').css('visibility', 'hidden');
})

// If settings menu is not visible
$('#myModal').on('hide.bs.modal', function (e) {
  $('#ee').css('visibility', 'visible');
})

// Change the background
function changeBG() {
	var bgSelection = document.getElementById("bgSelection").value;
	var image_path = 'http://playerio-a.akamaihd.net/everybody-edits-su9rn58o40itdbnw69plyw/Everybody%20Edits%20Website/images/bgs/';
  if (bgSelection == "random") {
  	return;
  }
  else {
		$('#main').css('background-image', 'url(' + image_path + bgSelection + '.png)');
		return;
  }
}

// Change the opacity
function changeOP() {
	var opSelection = document.getElementById("opSelection").value;
	$('.opacity').css('opacity', opSelection);
  return;
}

// Save Settings
function save() {
	var date = new Date();
	date.setTime(date.getTime()+(14*24*60*60*1000));
	var expires = date.toUTCString();
	var bgimage = $('#bgSelection').val();
	var opacity = $('#opSelection').val();
	document.cookie = 'bgimage=' + bgimage + '; expires=' + expires + '; path=/';
	document.cookie = 'opacity=' + opacity + '; expires=' + expires + '; path=/';
}

// Delete saved settings
function reset() {
	document.cookie = 'bgimage=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
	document.cookie = 'opacity=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
	$('.opacity').css('opacity', '0.5');
	$('#opSelection').val('0.5');
	$('#bgSelection').val('random');
}