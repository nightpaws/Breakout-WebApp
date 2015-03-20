/*jslint node: true, browser: true */
"use strict";

function Controller() {

    var model = new Model(this);
    var view = new View(model);
    var rate = 30;//rate of update
    var runStatus = false; //game state
    var gamma = 0;

    this.update = function() {
     //Will kill browser console.log("Controller: update called!");

        if(runStatus){
            model.update(gamma);
            view.update();
        }
    };


    /*Show/hide display functions*/
    this.showMainMenu = function() {
        // console.log("Controller: showMainMenu called!");

        var pauseMnu = document.getElementById("pause");
        pauseMnu.className = "noDisplay";

        var gameplay = document.getElementById("gameplay");
        gameplay.className = "noDisplay";

        var menu = document.getElementById("menu");
        menu.className = "";

    };
    this.hideMainMenu = function() {
        // console.log("Controller: hideMainMenu called!");

        var menu = document.getElementById("menu");
        menu.className = "noDisplay";

    };

    this.play = function() {
        // console.log("Controller: play called!");

        runStatus = true;
    };

    this.pause = function() {
        // console.log("Controller: pause called!");
        runStatus = false;
    };
    this.showPauseMenu = function() {
      var controller = this;
       // console.log("Controller: showPauseMenu called!");

        controller.pause();
        var pauseMnu = document.getElementById("pause");
        pauseMnu.className = "";

    };
    this.hidePauseMenu = function() {
        var controller = this;
        // console.log("Controller: hidePauseMenu called!");

        var pauseMnu = document.getElementById("pause");
        pauseMnu.className = "noDisplay";
        controller.play();
    };

    this.getUpdateRate = function() {
        // console.log("Controller: getUpdateRate called!");
        return rate;
    };


    /*Once I've finished initialising all the functions I need,
    I can begin the main controllers. This attaches the listeners
    to objects*/
      this.control = function() {

        var newGame = document.getElementById("start"),
            controller = this;//because JS can't self-reference... :\
        newGame.addEventListener("click", function() {

            var game = document.getElementById("gameplay");
            game.className = "";

            var menu = document.getElementById("menu");
            menu.className += "noDisplay";

            controller.play();
        });

        var quitGame = document.getElementById("exit");
        quitGame.addEventListener("click", function() {
            console.log("Attempting to Quit...");
            window.close(); //attempt quitting in Chrome
            //In browser
            alert("Application is attempting to quit! But can't because your device won't let it! Going to Google instead!");
            window.location = "https://encrypted.google.com/";

        });


        //Top of gameplay view
        var pauseBtn = document.getElementById("pauseButton");
        pauseBtn.addEventListener("click", function() {
            controller.pause();
            controller.showPauseMenu();
        });

        var resumeBtn = document.getElementById("resume");
        resumeBtn.addEventListener("click", function() {
            controller.hidePauseMenu();
            controller.play();
        });

        var leaveBtn = document.getElementById("quit");
        leaveBtn.addEventListener("click", function() {
            controller.hidePauseMenu();
            model.gameReset();
            controller.showMainMenu();
        });

        window.setInterval(this.update, rate);
        

        //The all important movement Code
        if(window.DeviceOrientationEvent){
            /*if the device is detected as moving
             take the gamma value and store it*/
            window.addEventListener("deviceorientation", function(eventData){
                gamma = eventData.gamma;
            });
        }
    };

    this.control(); //loop!
    /*CAUTION: This loop has a fun side effect of locking up
     your device if you fiddle with code whilst it's still running.
      If you're running with 1GB RAM or less use caution playing
       with this... As learned from my partners netbook...*/
}

document.addEventListener("load", new Controller());