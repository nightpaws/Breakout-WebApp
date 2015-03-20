/*jslint node: true, browser: true */
"use strict";

function Controller() {

    var model = new Model(this);
    var view = new CanvasDrawer(model);
    var rate = 30;//rate of update
    var run = false; //game state
    var gamma = 0;

    this.update = function() {
     //Will kill browser console.log("Controller: update called!");

        if(run){
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
        // console.log("Controller: run called!");

        run = true;
    };

    this.pause = function() {
        // console.log("Controller: pause called!");
        run = false;
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
        // pauseMnu.className = "noDisplay";
        controller.run();
    };

    this.getUpdateTime = function() {
        // console.log("Controller: getUpdateTime called!");

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
            gameplay.className = "";

            var menu = document.getElementById("menu");
            menu.className += "noDisplay";

            controller.play();
        });

        var quitGame = document.getElementById("exit");
        quitGame.addEventListener("click", function() {
            console.log("Attempting to Quit...");
            model.shutDown();
            window.close();
            //In browser
            alert("Application is attempting to quit! But can't because it's in a web browser, Going to Google instead!");
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
            model.resetModel();
            controller.showMainMenu();
        });


        //Rotation Checking Code
        if(window.DeviceOrientationEvent){

            window.addEventListener("deviceorientation", function(eventData){

                var gameArea = document.getElementById("gameArea");
                gamma = eventData.gamma;

            });

        }
        //Resize check! Stops us losing where everything is
        window.addEventListener("resize", model.getVars);

        window.setInterval(this.update, rate);

    };

    this.control(); //loop!
}

document.addEventListener("load", new Controller());