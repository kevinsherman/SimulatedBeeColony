# Simulated Bee Colony

This is a port of the sample code from [James McCaffrey's](https://jamesmccaffrey.wordpress.com/) MSDN Article: [Natural Algorithms - Use Bee Colony Algorithms to Solve Impossible Problems](https://msdn.microsoft.com/en-us/magazine/gg983491.aspx).

The article is based on C# - but was written to be easily ported to other languages.

##Installation

###Prerequisites:
1. Make sure [Node & NPM](https://nodejs.org) are installed.
2. Install global dependencies:  
  Typescript: `npm install -g typescript`  
  Nodemon: `npm install -g nodemon`  
  Typings: `npm install -g typings`
  
###Clone Repository:
`git clone https://github.com/kevinsherman/SimulatedBeeColony` 

###Install package dependencies:
* `cd SimulatedBeeColony`  
* `npm install`  
* `typings install`

###Run Sample Application
Open a terminal/console and run `tsc -w simulatedBeeColony.js`. This will run the Typescript compiler in watch mode, and will regenerate the javascript file after any changes are made (such as updating the maxNumberCycles).  

Open a second terminal/console and enter `nodemon simulatedBeeColony.js`. This will run the JavaScript file emitted by the TypeScript compiler, and will reload it based on any changes. You can type `rs` at any time to re-run the file - instead of waiting for a file change.  Alternatively, you can run `npm start` and it will run the same command.  

All of the variables you will want to edit are in the `main` function at the bottom of the file. 
```
    var totalNumberBees : number = 100;
    var numberInactive : number = 20;
    var numberActive : number = 50;
    var numberScout : number = 30;
    var maxNumberVisits : number = 100;
    var maxNumberCycles : number = 3460; // <-- This usually needs to be increased to get a more accurate 'bestMeasureOfQuality' 
```
Go ahead and change `maxNumberCycles` to 50000 and see if you can get the optimal solution of 19. 


##Notes:

1. The 'test' method simply validates a few assumptions and prints to the console. The execution of this function is commented out - and is only for debugging purposes.
2. The 'main' method is where you can tweak the input parameters.
3. I made a slight tweak - and have the `Solve()` function return the number of iterations required to hit the known best `MeasureOfQuality` (19). Interestingly, sometimes it will find this value in less that 3,000 iterations - and other times, it will run through 50,000 iterations and *not* find it.

## Pull Requests Welcome! 
If I ported something incorrectly, or there is a better way to do this in Typescript, please let me know!

