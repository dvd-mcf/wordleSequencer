window.onload = function() {

    // Play modes
    var pendulumForward = false;
    var shouldUseUbergrid = true;
	var newGrid =  [];            
    var bpm = 120;
	var input = document.getElementById('wordleInput');
	
	
	var tonesLoaded = false
	var drumsLoaded = false
	var clicked = false
	
	var toneUrls = new Tone.Players({
		            urls: {
				        "6g": "assets/g6.wav",
						"6y":  "assets/y6.wav",
						
						"5g": "assets/g5.wav",
						"5y": "assets/y5.wav",
						
						"4g": "assets/g4.wav",
						"4y": "assets/y4.wav",
						
						"3g": "assets/g3.wav",
						"3y": "assets/y3.wav",
						
						"2g": "assets/g2.wav",
						"2y": "assets/y2.wav",
						
						"1g": "assets/g1.wav",
						"1y": "assets/y1.wav",
				       
		            }, 
					onload: [tonesLoaded = true, start()],
		            fadeOut: "64n",
				        }).toDestination();
						
						
	var drumUrls = new Tone.Players({
		            urls: {
				        "6g": "assets/808_Cowbell.wav",
						"6y": "assets/808_Cymbal.wav",

						"5g": "assets/808_TomHi.wav",
						"5y": "assets/808_TomMid.wav",

						"4g": "assets/808_Clave.wav",
						"4y": "assets/808_Clap.wav",

						"3g": "assets/808_HHClosed.wav",
						"3y": "assets/808_HHOpen.wav",

						"2g": "assets/808_Rim.wav",
						"2y": "assets/808_Snare.wav",

						"1g": "assets/808_TomLo.wav",
						"1y": "assets/808_Kick.wav",

		            },
					onload: [drumsLoaded = true, start()],
		            fadeOut: "64n",
				        }).toDestination();
						
						
	
	
	var playerUrls = toneUrls;
	

	var	drumTab = document.querySelector('#drumTab')
	
	drumTab.addEventListener('click', function()
	{		
        if (drumsLoaded == true && tonesLoaded == true && clicked == true) {
		
		playerUrls.stopAll(0);
		    playerUrls = drumUrls 
		
		setupPlayers();
	}
	
		
	});
	
	var	toneTab = document.querySelector('#toneTab')
	
	toneTab.addEventListener('click', function()
	
    if (drumsLoaded == true && tonesLoaded == true && clicked == true) {
	
	{		
		console.log("Just measured:" + toneTab.textContent)
	
		    playerUrls = toneUrls 
		
		setupPlayers();
	}
		
	});
	
	//Wraparound toggle
    var wrapAround = document.querySelector('#wrapAroundCheck');
	wrapAround.addEventListener('input', function()
	{		
		wrapAround = !wrapAround;
	});
	
	
	//Wraparound toggle
	//Wraparound toggle
	var playing = true;
    pausePlay = document.querySelector('#pausePlay');
	pausePlay.addEventListener('click', function()
	
	{		
        if (drumsLoaded == true && tonesLoaded == true && clicked == true) {
		
			console.log(pausePlay.textContent)
		
		if (playing == true) {
			console.log("Stop")
			Tone.Transport.stop();
			playerUrls.stopAll(0);
			playing = false;
			
		}else if (playing == false){
						console.log("Start")
				Tone.Transport.start();
				playing = true;
			}
		}
		});
		
	
	
	
	//BPM changes
	var newBPM = document.querySelector('#bpmInput');
	newBPM.addEventListener('input', function()
	{
		newBpmDouble = newBPM.value * 2
		bpm = newBpmDouble
        Tone.Transport.bpm.value = newBpmDouble;
	});
	

	
	
	
	
//Input new Wordle
	input.addEventListener('input', function()
	{		
		// split at newlines
		inputValue = input.value.split('\n');		
		//
		inputValue = inputValue.splice(2, 6);
		
		newGrid = [];
		
        for (var i=0; i<inputValue.length; i++) {

			word = inputValue[i];
			var newGridLine = []
			for (var w=0; w< word.length; w++) {
							letter = word.charAt(w);


							codePoint = letter.codePointAt(0)
							if (codePoint == 11035 || codePoint == 11036) {
								newGridLine.push("b")
								
								
							} else if (codePoint == 57320){
								newGridLine.push("y")
								
							} else if (codePoint == 57321){
								newGridLine.push("g")
							} 
							
							//console.log(p.replace('dog', 'monkey'));
							
			}
			newGrid.push(newGridLine);
			console.log(newGridLine);
			

        }
		
		populateGrid();
	});



    // Grid
    var grid =     ["b", "b", "b", "y", "y"];;

    if (typeof(window.getGrid) === "function") {
        grid = window.getGrid(shouldUseUbergrid); // Defined in grid.js
    }

    // Audio



		
    

    var players = [];

    var currGridIdx = -1;

    var hasStarted = false;

    var bpmIncrementStep = 0;

    // ================================================================

    // Setup players based on asset URLs
    function setupPlayers() {
        for (var i=0; i<playerUrls.length; i++) {
            var urls = playerUrls[i];
			
            var rowPlayers = {
                "y": new Tone.Player(urls["y"]).toDestination(),
                "g": new Tone.Player(urls["g"]).toDestination()
            };
			
			var newPlayers = {
				"y": new Tone.Player
			}
			
			
            players[i] = rowPlayers;
        }

        console.log(players);
    }

    // Populate the grid display
    function populateGrid() {
        var gridDisp = $("#grid");
		playerUrls.stopAll(0);
		

		const blackElements = document.getElementsByClassName("black");
		    while(blackElements.length > 0){
		        blackElements[0].parentNode.removeChild(blackElements[0]);
			}
			const yellowElements = document.getElementsByClassName("yellow");
			    while(yellowElements.length > 0){
			        yellowElements[0].parentNode.removeChild(yellowElements[0]);
				}
				const greenElements = document.getElementsByClassName("green");
				    while(greenElements.length > 0){
				        greenElements[0].parentNode.removeChild(greenElements[0]);
					}
					
        if (shouldUseUbergrid) {
            gridDisp.addClass("ubergrid");
        }

		grid = newGrid
		
        for (var i=0; i<grid.length; i++) {
            var row = grid[i];
            var rowDisp = $("<div></div>").addClass("row");

            for (var j=0; j<row.length; j++) {
                var cell = $("<div></div>").addClass("sq inactive").attr("id", "sq-"+i+"-"+j); // sq
                var color = row[j];

                if (color == "b") {
                    cell.addClass("black");
                } else if (color == "y") {
                    cell.addClass("yellow");
                } else if (color == "g") {
                    cell.addClass("green");
                }

                rowDisp.append(cell);
            }

            gridDisp.append(rowDisp);
        }
    }

    // Start the step sequencer (and setup step function)
    function startSequencer() {

        // Step
        var loopStep = new Tone.Loop(time => {
  
            console.log(currGridIdx);
            
            // Play the current cell samples
            var playersIdxOffset = players.length - grid.length; // To account for grids being shorter
            for (var i=0; i<grid.length; i++) {
                var row = grid[i];
                var cell = row[currGridIdx];

                for (var j=0; j<row.length; j++) {
                    var cellId = "#sq-" + i + "-" + j;
                    var cellSound = (grid.length - i) + cell;

                    if (j == currGridIdx) {
                        if (cell != "b") {
							if (cell == "y"){
//								playersIdx = playersIdx + 6
							}
                     //       console.log("Playing " + i + "," + j);
                            playersIdx = i + playersIdxOffset;
//                            players[playersIdx][cell].start(time, 0);
		 playerUrls.player(cellSound).start(0, 0)
							 // Pass time in for better accuracy
                        }
                        $(cellId).addClass("active");
                        $(cellId).removeClass("inactive");
                    } else {
                        $(cellId).removeClass("active");
                        $(cellId).addClass("inactive");
                    }
                }             

            }

            // Grid index updating:

            if (!wrapAround) {   
                 currGridIdx = (currGridIdx + 1) % grid[0].length;

            } else {
                if (pendulumForward) {
                    currGridIdx++;
                    if (currGridIdx >= grid[0].length - 1) {
                        currGridIdx = grid[0].length - 1;
                        pendulumForward = false;
                    }
                } else {
                    currGridIdx--;
                    if (currGridIdx <= 0) {
                        currGridIdx = 0;
                        pendulumForward = true;
                    }
                }
            }

        }, "4n").start(0);

        // Set BPM and start playing
        Tone.Transport.bpm.value = bpm;
        Tone.Transport.start();
    }
	
	
	// Wraparound Checkbox
	

	function start (){

		if (grid){
			console.log("trying");
			console.log(hasStarted);
			console.log(grid.length);
			console.log("Loaded?" + drumsLoaded + tonesLoaded + clicked);
			
        if (!hasStarted && grid.length >= 1) {
			console.log("starting");
			console.log(drumsLoaded + tonesLoaded + clicked);
	        if (drumsLoaded == true && tonesLoaded == true && clicked == true) {
			
            Tone.start();
            startSequencer();
            hasStarted = true;
		}
        } 
	}
	}
	

    // ================================================================

    // Setup
    setupPlayers();
    populateGrid();

    // Start on user click
    $("body").click(function() {
		
		 clicked = true
	
		start();
 
		
    });


};





