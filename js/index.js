//https://s.codepen.io/Shoggoth/debug/xOvKGq
$(document).ready(function($) {
  var lon;
  var lat;
  var url;
  var tempC;
  var tempF;
  var weather;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      url = "http://api.wunderground.com/api/e0d2eea912148f9a/geolookup/conditions/q/" + lat + "," + lon + ".json";
    //url = "http://api.wunderground.com/api/e0d2eea912148f9a/geolookup/conditions/q/82.273400599999995,-62.7088739.json";
      
      $.ajax({
        url: url,
        dataType: "jsonp",
        success: function(parsed_json) {
          var location = parsed_json['location']['city'] + ", " + parsed_json['location']['country_name'];
          tempC = parsed_json['current_observation']['temp_c'];
          tempF = parsed_json['current_observation']['temp_f'];
          weather = parsed_json['current_observation']['weather'];
          $("#temp").html(tempC + " &#8451");
          $("#city").text(location);
          $("#weather").text(weather);
          
          if (tempC > 30) {
            $("#temp").css({"background": "#dc6016", "border": "15px solid #ff8030"});
          } else if (tempC > 20 && tempC <= 30) {
            $("#temp").css({"background": "#F79824", "border": "15px solid #ffb030"});
          } else if (tempC > 10 && tempC <= 20) {
            $("#temp").css({"background": "#FDCA40", "border": "15px solid #fdd773"});
          } else if (tempC > 0 && tempC <= 10) {
            $("#temp").css({"background": "#f9e08e", "border":"15px solid #ffefa5"});
          } else if (tempC > -10 && tempC <= 0) {
            $("#temp").css({"background": "#acc9e8", "border": "15px solid #bdddff"});
          } else if (tempC > -20 && tempC < -10) {
            $("#temp").css({"background": "#33A1FD", "border": "15px solid #acc9e8"});
          } else if (tempC > -30 && tempC <= -20) {
            $("#temp").css({"background": "#2176FF", "border": "15px solid #4089ff"});
          } else if (tempC < -30) {
            $("#temp").css({"background": "#435cc8", "border": "15px solid #4f6dec"});
          }
          
          $("#location").css({"background": "#96C5F7", "border": "15px solid #A9D3FF"});
          
          if (weather == "Mostly Cloudy" || weather == "" || weather == "Overcast") {
            $("#weather").css({"background": "#c5c9c1", "border": "15px solid #F1F7ED"});
            $("#weather").html("<img src='http://image.flaticon.com/icons/svg/178/178338.svg'>");
          } else if (weather == "Mostly Sunny" || weather == "Mostly Clear" || weather == "Partly Sunny" || weather == "Partly Cloudy") {
            $("#weather").css({"background": "#F1F7ED", "border": "15px solid #ffffff"});
            $("#weather").html("<img src='http://image.flaticon.com/icons/svg/178/178342.svg'>");
          } else if (weather == "Sunny" || weather == "Clear") {
            $("#weather").css({"background": "#33A1FD", "border": "15px solid #acc9e8"});
            $("#weather").html("<img src='http://image.flaticon.com/icons/svg/178/178325.svg'>");
          } else if (weather == "Rain") {
            $("#weather").css({"background": "#c5c9c1", "border": "15px solid #F1F7ED"});
            $("#weather").html("<img src='http://image.flaticon.com/icons/svg/178/178340.svg'>");
          } else if (weather == "Snow") {
            $("#weather").css({"background": "white", "border": "15px solid #F1F7ED"});
            $("#weather").html("<img src='http://image.flaticon.com/icons/svg/178/178330.svg'>");
          } else if (weather == "Hail") {
            $("#weather").css({"background": "#c5c9c1", "border": "15px solid #F1F7ED"});
            $("#weather").html("<img src='http://image.flaticon.com/icons/svg/178/178341.svg'>");
          } else if (weather == "Thunderstorm") {
            $("#weather").css({"background": "#2665ca", "border": "15px solid #2c74e8"});
            $("#weather").html("<img src='http://image.flaticon.com/icons/svg/178/178343.svg'>");
          }
        }
      });
    });
  }
  
  $(".celsius").click(function() {
    $(".fahrenheit").removeClass("active");
    $(this).addClass("active");
    $("#temp").html(tempC + " &#8451");
  });
  $(".fahrenheit").click(function() {
    $(".celsius").removeClass("active");
    $(this).addClass("active");
    $("#temp").html(tempF + " &#8457");
  });
});
