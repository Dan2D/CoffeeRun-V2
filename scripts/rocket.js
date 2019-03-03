(function(window){
'use strict';
var App = window.App || {};
var launchCount = 0;

function Spaceship(){
    //initialization code goes here
    console.log('Spaceship is prepping for launch...');
    
}

Spaceship.prototype.blastoff = function(){
    //Closure scope allows us to access the launchCount var here
    launchCount++;
    console.log('Spaceship Launched!');
}

Spaceship.prototype.reportLaunchCount = function(){
    console.log('Total number of launches: ' + launchCount);
}

App.Spaceship = Spaceship;
window.App = App;
window.launchCount = launchCount;
})(window);