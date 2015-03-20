/*jslint node: true, browser: true */
"use strict";

function Controller() {
    var model = new Model(this);
    var running = false;


    if (running) {
        model.update();
        view.update();
    }
    /*Play/Pause*/
    this.play = function() {
        console.log("Controller: play called!");
        running = true;
    };

    this.pause = function() {
        console.log("Controller: pause called!");
        running = false;
    };


    /*Show/hide display functions*/
    this.showMainMenu = function() {
        console.log("Controller: showMainMenu called!");

        var pauseMnu = document.getElementById("pause");
        pauseMnu.className = "noDisplay";

        var gameplay = document.getElementById("gameplay");
        gameplay.className = "noDisplay";

        var menu = document.getElementById("menu");
        menu.className = "";

    };
    this.hideMainMenu = function() {
        console.log("Controller: hideMainMenu called!");

        var menu = document.getElementById("menu");
        menu.className = "noDisplay";

    };
    this.showPauseMenu = function() {
        console.log("Controller: showPauseMenu called!");
        running = false;
        var pauseMnu = document.getElementById("pause");
        pauseMnu.className = "";

    };
    this.hidePauseMenu = function() {
        console.log("Controller: hidePauseMenu called!");
        var pauseMnu = document.getElementById("pause");
        pauseMnu.className = "noDisplay";
        running = true;
    };


    /*Once I've finished initialising all the functions I need,
    I can begin the main controllers. This attaches the listeners
    to objects*/
    this.control = function() {
        var playBtn = document.getElementById("start");
        var controller = this; //because JS can't self-reference... :\
        
        //Main Menu buttons
        playBtn.addEventListener("click", function() {
            var game = document.getElementById("gameplay");
            game.className = "";
            controller.hideMainMenu();

        });

        var exitBtn = document.getElementById("exit");
        exitBtn.addEventListener("click", function() {
            console.log("Attempting to Quit...");
            window.close();
            alert("Application is attempting to quit! But can't because it's in a web browser, Going to Google instead!");
            window.location = "https://encrypted.google.com/";
        });
        //Top of gameplay view
        var pauseBtn = document.getElementById("pauseButton");
        pauseBtn.addEventListener("click", function() {
            controller.showPauseMenu();
        });

        //In Game Pause Options
        var resumeGameBtn = document.getElementById("resume");
        resumeGameBtn.addEventListener("click", function() {
            controller.hidePauseMenu();
            //controller.run();
        });

        var quitGameBtn = document.getElementById("quit");
        quitGameBtn.addEventListener("click", function() {
            //model.clearModel();

            controller.showMainMenu();
        });
    };
    this.control(); //loop
};
document.addEventListener("load", new Controller());