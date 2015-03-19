/*jslint node: true, browser: true */
"use strict";

function Controller() {
    var model = new Model(this);
    var running = false;

    /*Play/Pause*/
    this.play = function() {
        console.log("Controller: play called!");
        running = true;
    };

    this.pause = function() {
        console.log("Controller: pause called!");
        running = false;
    };


    /*Show/hide functions*/
    this.showMainMenu = function() {
        console.log("Controller: showMainMenu called!");

    };
    this.hideMainMenu = function() {
        console.log("Controller: hideMainMenu called!");

    };
    this.showPauseMenu = function() {
        console.log("Controller: showPauseMenu called!");

    };
    this.hidePauseMenu = function() {
        console.log("Controller: hidePauseMenu called!");

    };


    /*Once I've finished initialising all the functions I need, I can begin the main control method.*/
    this.control = function() {

        var playBtn = document.getElementById("start");

        playBtn.addEventListener("click", function() {

            var game = document.getElementById("game");
            game.className = "";

            var menu = document.getElementById("menu");
            menu.className += "noDisplay";

        });

        var quitBtn = document.getElementById("quit");
        
        quitBtn.addEventListener("click", function() {

            console.log("Attempting to Quit...");
            window.close();
            alert("Application is attempting to quit! But can't because it's in a web browser, Going to Google instead!");
            window.location = "https://encrypted.google.com/";

        });
    };
    this.control();
};
document.addEventListener("load", new Controller());