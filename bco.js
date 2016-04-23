var Bee = (function () {
    function Bee(status, memoryMatrix, measureOfQuality, numberOfVisits) {
        this.status = status;
        this.memoryMatrix = new Array(memoryMatrix.length);
        //Array.Copy(memoryMatrix, this.memoryMatrix, memoryMatrix.length);
        this.measureOfQuality = measureOfQuality;
        this.numberOfVisits = numberOfVisits;
    }
    Bee.prototype.ToString = function () {
        var s = "";
        s += "Status = " + this.status + "\n";
        s += " Memory = " + "\n";
        for (var i = 0; i < this.memoryMatrix.length - 1; ++i) {
            s += this.memoryMatrix[i] + "->";
        }
        s += this.memoryMatrix[this.memoryMatrix.length - 1] + "\n";
        s += " Quality = " + this.measureOfQuality.toLocaleString();
        s += " Number visits = " + this.numberOfVisits;
        return s;
    };
    return Bee;
}());
var Hive = (function () {
    function Hive(totalNumberBees, numberInactive, numberActive, numberScout, maxNumberVisits, maxNumberCycles, citiesData) {
    }
    // Hive data fields here
    Hive.prototype.ToString = function () {
        return null;
    };
    Hive.prototype.GenerateRandomMemoryMatrix = function () {
        return null;
    };
    Hive.prototype.GenerateNeighborMemorMatrix = function (memoryMatrix) {
        return null;
    };
    Hive.prototype.MeasureOfQuality = function (memoryMatrix) {
        return 0;
    };
    Hive.prototype.Solve = function (showProgress) {
    };
    Hive.prototype.ProcessActiveBee = function (i) {
    };
    Hive.prototype.ProcessScoutnBee = function (i) {
    };
    Hive.prototype.ProcessInactiveBee = function (i) {
    };
    Hive.prototype.DoWaggleDance = function (i) {
    };
    return Hive;
}());
var CitiesData = (function () {
    function CitiesData(numberCities) {
        this.start = 65;
        this.cities = new Array(numberCities);
        for (var i = 0; i < this.cities.length; ++i) {
            this.cities[i] = String.fromCharCode(i + this.start);
        }
    }
    CitiesData.prototype.Distance = function (firstCity, secondCity) {
        if (firstCity < secondCity) {
            return 1 * (secondCity.charCodeAt(0) - firstCity.charCodeAt(0));
        }
        else {
            return 1.5 * (firstCity.charCodeAt(0) - secondCity.charCodeAt(0));
        }
    };
    CitiesData.prototype.ShortestPathLength = function () {
        return 1 * (this.cities.length - 1);
    };
    CitiesData.prototype.NumberOfPossiblePaths = function () {
        var n = this.cities.length;
        var answer = 1;
        for (var i = 1; i <= n; ++i) {
            answer *= i;
        }
        return answer;
    };
    CitiesData.prototype.ToString = function () {
        var s = "";
        s += "Cities: ";
        for (var i = 0; i < this.cities.length; ++i) {
            s += this.cities[i] + " ";
        }
        return s;
    };
    return CitiesData;
}());
/* TEST
function test() {
    var cd : CitiesData = new CitiesData(10);
    
    for(var i = 0; i < cd.cities.length; i++){
        console.log("CITY: " + i + " " + cd.cities[i]);
    }
    
    var x = cd.Distance(cd.cities[3], cd.cities[2]);
    console.log("DISTANCE (D->C):  " + x);
    
    var y = cd.Distance(cd.cities[2], cd.cities[3]);
    console.log("DISTANCE (C->D):  " + y);
    
    console.log("SHORTEST: " + cd.ShortestPathLength());
    console.log("NUM Paths: " + cd.NumberOfPossiblePaths())
    console.log("TOSTRING: " + cd.ToString());
}

test(); */
/*
In terms of ratios, there's some research that suggests the best percentages of active, inactive and scout bees are often
roughly 75 percent, 10 percent and 15 percent respectively.
 */
function main(args) {
    console.log("\nBegin Simulated Bee Colony algorithm demo\n");
    console.log("Loading cities data for SBC Traveling Salesman Problem analysis");
    var citiesData = new CitiesData(20);
    console.log(citiesData.ToString());
    console.log("Number of cities: " + citiesData.cities.length);
    console.log("Number of possible paths: " + citiesData.NumberOfPossiblePaths().toLocaleString());
    console.log("Best possible solution (shortest path) length = " + citiesData.ShortestPathLength().toLocaleString());
    var totalNumberBees = 100;
    var numberInactive = 20;
    var numberActive = 50;
    var numberScout = 30;
    var maxNumberVisits = 100;
    var maxNumberCycles = 3460;
    var hive = new Hive(totalNumberBees, numberInactive, numberActive, numberScout, maxNumberVisits, maxNumberCycles, citiesData);
    console.log("\nInitial random hive");
    console.log(hive.ToString());
    var doProgressBar = true;
    hive.Solve(doProgressBar);
    console.log("\nFinal hive");
    console.log(hive.ToString());
    console.log("End Simulated Bee Colony demo");
}
main(null);
