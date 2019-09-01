class Bee {
    public status: number;
    public memoryMatrix: string[];
    public measureOfQuality: number;
    public numberOfVisits: number;

    constructor(status: number, memoryMatrix: string[], measureOfQuality: number, numberOfVisits: number) {
        this.status = status;
        this.memoryMatrix = memoryMatrix.slice();
        this.measureOfQuality = measureOfQuality;
        this.numberOfVisits = numberOfVisits;
    }

    ToString(): string {
        var s: string = "";
        s += "Status = " + this.status + "\n";
        s += " Memory = " + "\n";
        for (var i = 0; i < this.memoryMatrix.length - 1; ++i) {
            s += this.memoryMatrix[i] + "->";
        }
        s += this.memoryMatrix[this.memoryMatrix.length - 1] + "\n";
        s += " Quality = " + this.measureOfQuality.toLocaleString();
        s += " Number visits = " + this.numberOfVisits;
        return s;
    }
}

class Hive {

    // Hive data fields here
    public random: number = null;
    public citiesData: CitiesData;

    public totalNumberBees: number;
    public numberInactive: number;
    public numberActive: number;
    public numberScout: number;

    public maxNumberCycles: number;
    public maxNumberVisits: number;

    public probPersuasion = 0.90;
    public probMistake = 0.01;

    public bees: Array<Bee>;
    public bestMemoryMatrix: string[];
    public bestMeasureOfQuality: number;
    public indexesOfInactiveBees: Array<number>;

    ToString(): string {
        var s: string = "Best Path Found: ";
        for (var i = 0; i < this.bestMemoryMatrix.length - 1; ++i) {
            s += this.bestMemoryMatrix[i] + "->";
        }
        s += this.bestMemoryMatrix[this.bestMemoryMatrix.length - 1]; // <- Add the last element without the trailing '->'
        s += "\nPath Quality: " + this.bestMeasureOfQuality;
        return s;
    }

    constructor(totalNumberBees: number, numberInactive: number, numberActive: number,
        numberScout: number, maxNumberVisits: number, maxNumberCycles: number,
        citiesData: CitiesData) {

        this.random = this.getRandomInt();
        this.totalNumberBees = totalNumberBees;
        this.numberInactive = numberInactive;
        this.numberActive = numberActive;
        this.numberScout = numberScout;
        this.maxNumberVisits = maxNumberVisits;
        this.maxNumberCycles = maxNumberCycles;
        this.citiesData = citiesData;

        this.bees = new Array(totalNumberBees);
        this.bestMemoryMatrix = this.GenerateRandomMemoryMatrix();
        this.bestMeasureOfQuality = this.MeasureOfQuality(this.bestMemoryMatrix);

        this.indexesOfInactiveBees = new Array<number>(numberInactive);

        for (var i: number = 0; i < this.totalNumberBees; ++i) {
            var currStatus: number;
            if (i < this.numberInactive) {
                currStatus = 0;
                this.indexesOfInactiveBees[i] = i;
            } else if (i < this.numberInactive + this.numberScout) {
                currStatus = 2; // scout
            } else {
                currStatus = 1; // active
            }

            var randomMemoryMatrix: string[] = this.GenerateRandomMemoryMatrix();
            var mq: number = this.MeasureOfQuality(randomMemoryMatrix);
            var numberOfVisits: number = 0;

            this.bees[i] = new Bee(currStatus, randomMemoryMatrix, mq, numberOfVisits);

            if (this.bees[i].measureOfQuality < this.bestMeasureOfQuality) {
                this.bestMemoryMatrix = this.bees[i].memoryMatrix.slice();
                this.bestMeasureOfQuality = this.bees[i].measureOfQuality;
            }
        }
    }

    GenerateRandomMemoryMatrix(): string[] {

        var result = this.citiesData.cities.slice();
        for (var i: number = 0; i < result.length; i++) {
            var r: number = this.getRandomInt(i, result.length);
            var temp: string = result[r];
            result[r] = result[i];
            result[i] = temp;
        }
        return result;
    }

    GenerateNeighborMemoryMatrix(memoryMatrix: string[]): string[] {
        var result = memoryMatrix.slice();
        var ranIndex: number = this.getRandomInt(0, result.length);
        var adjIndex: number;
        if (ranIndex == result.length - 1)
            adjIndex = 0;
        else
            adjIndex = ranIndex + 1;

        var tmp: string = result[ranIndex];
        result[ranIndex] = result[adjIndex];
        result[adjIndex] = tmp;
        return result;
    }

    MeasureOfQuality(memoryMatrix: string[]): number {
        var answer: number = 0.0;
        for (var i: number = 0; i < memoryMatrix.length - 1; ++i) {
            var c1: string = memoryMatrix[i];
            var c2: string = memoryMatrix[i + 1];
            var d: number = this.citiesData.Distance(c1, c2);
            answer += d;
        }
        return answer;
    }

    Solve(doProgressBar: boolean): number {
        var pb: boolean = doProgressBar;
        var numberOfSymbolsToPrint: number = 10;
        var increment = this.maxNumberCycles / numberOfSymbolsToPrint;
        if (pb) console.log("\nEntering SBC Traveling Salesman Problem algorithm main processing loop\n");
        if (pb) console.log("Progress: |==========|");
        if (pb) process.stdout.write("           ");
        var cycle: number = 0;

        while (cycle < this.maxNumberCycles) {
            for (var i: number = 0; i < this.totalNumberBees; ++i) {
                if (this.bees[i].status == 1) {
                    this.ProcessActiveBee(i);
                }
                else if (this.bees[i].status == 2) {
                    this.ProcessScoutBee(i);
                }
                else if (this.bees[i].status == 0) {
                    this.ProcessInactiveBee(i);
                }
            }
            ++cycle;

            if (pb && cycle % increment == 0) {
                process.stdout.write("^");
            }

            if (this.bestMeasureOfQuality == 19) {
                // short circuit if we hit known best measure
                break;
            }
        }
        if (pb) console.log("");
        return cycle;
    }

    ProcessActiveBee(i: number): void {
        var neighbor: string[] = this.GenerateNeighborMemoryMatrix(this.bees[i].memoryMatrix);
        var neighborQuality: number = this.MeasureOfQuality(neighbor);
        var prob = this.getRandomDouble();
        var memoryWasUpdated: boolean = false;
        var numberOfVisitsOverLimit: boolean = false;

        if (neighborQuality < this.bees[i].measureOfQuality) { // better
            if (prob < this.probMistake) { // mistake
                ++this.bees[i].numberOfVisits;
                if (this.bees[i].numberOfVisits > this.maxNumberVisits) {
                    numberOfVisitsOverLimit = true;
                }
            }
            else { // No mistake
                this.bees[i].memoryMatrix = neighbor;
                this.bees[i].measureOfQuality = neighborQuality;
                this.bees[i].numberOfVisits = 0;
                memoryWasUpdated = true;
            }
        }
        else { // Did not find better neighbor
            if (prob < this.probMistake) { // Mistake
                this.bees[i].memoryMatrix = neighbor;
                this.bees[i].measureOfQuality = neighborQuality;
                this.bees[i].numberOfVisits = 0;
                memoryWasUpdated = true;
            }
            else { // No mistake
                ++this.bees[i].numberOfVisits;
                if (this.bees[i].numberOfVisits > this.maxNumberVisits) {
                    numberOfVisitsOverLimit = true;
                }
            }
        }

        if (numberOfVisitsOverLimit == true) {
            this.bees[i].status = 0;
            this.bees[i].numberOfVisits = 0;
            var x: number = this.getRandomInt(0, this.numberInactive); //equivalent to random.Next(this.numberInactive); 
            this.bees[this.indexesOfInactiveBees[x]].status = 1;
            this.indexesOfInactiveBees[x] = i;
        }
        else if (memoryWasUpdated == true) {
            if (this.bees[i].measureOfQuality < this.bestMeasureOfQuality) {
                this.bestMemoryMatrix = this.bees[i].memoryMatrix;
                this.bestMeasureOfQuality = this.bees[i].measureOfQuality
            }
            this.DoWaggleDance(i);
        }
        else {
            return;
        }
    }

    ProcessScoutBee(i: number): void {
        var randomFoodSource: string[] = this.GenerateRandomMemoryMatrix();
        var randomFoodSourceQuality: number = this.MeasureOfQuality(randomFoodSource);

        if (randomFoodSourceQuality < this.bees[i].measureOfQuality) {
            this.bees[i].memoryMatrix = randomFoodSource;
            this.bees[i].measureOfQuality = randomFoodSourceQuality;
            if (this.bees[i].measureOfQuality < this.bestMeasureOfQuality) {
                this.bestMemoryMatrix = this.bees[i].memoryMatrix;
                this.bestMeasureOfQuality = this.bees[i].measureOfQuality;
            }

            this.DoWaggleDance(i);
        }
    }

    ProcessInactiveBee(i: number): void {
        return;
    }

    DoWaggleDance(i: number): void {
        for (var ii: number = 0; ii < this.numberInactive; ++ii) {
            var b: number = this.indexesOfInactiveBees[ii];
            if (this.bees[i].measureOfQuality < this.bees[b].measureOfQuality) {
                var p: number = this.getRandomDouble();
                if (this.probPersuasion > p) {
                    this.bees[b].memoryMatrix = this.bees[i].memoryMatrix;
                    this.bees[b].measureOfQuality = this.bees[i].measureOfQuality;
                }
            }
        }
    }

    getRandomInt(minVal?: number, maxVal?: number) {

        var min: number = minVal || 0; //-2147483648;
        var max: number = maxVal || 2147483647;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getRandomDouble(): number {
        return Math.random();
    }
}

class CitiesData {
    public cities: string[];
    public start: number = 65;

    constructor(numberCities: number) {
        this.cities = new Array(numberCities);
        for (var i: number = 0; i < this.cities.length; ++i) {
            this.cities[i] = String.fromCharCode(i + this.start);
        }
    }

    Distance(firstCity: string, secondCity: string): number {
        if (firstCity < secondCity) {
            return 1 * (secondCity.charCodeAt(0) - firstCity.charCodeAt(0));
        } else {
            return 1.5 * (firstCity.charCodeAt(0) - secondCity.charCodeAt(0));
        }
    }

    ShortestPathLength(): number {
        return 1 * (this.cities.length - 1);
    }

    NumberOfPossiblePaths(): number {
        var n = this.cities.length;
        var answer: number = 1;

        for (var i: number = 1; i <= n; ++i) {
            answer *= i;
        }
        return answer;
    }

    ToString(): string {
        var s: string = "";
        s += "Cities: ";
        for (var i: number = 0; i < this.cities.length; ++i) {
            s += this.cities[i] + " ";
        }
        return s;
    }
}

// TEST 
function test() {
    var cd: CitiesData = new CitiesData(10);

    for (var i = 0; i < cd.cities.length; i++) {
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

//test(); 

/*
In terms of ratios, there's some research that suggests the best percentages of active, inactive and scout bees are often
roughly 75 percent, 10 percent and 15 percent respectively.
 */

function main(args: string[]): void {
    console.log("\nBegin Simulated Bee Colony algorithm demo\n");
    console.log("Loading cities data for SBC Traveling Salesman Problem analysis");
    var citiesData: CitiesData = new CitiesData(20);
    console.log(citiesData.ToString());
    console.log("Number of cities: " + citiesData.cities.length);
    console.log("Number of possible paths: " + citiesData.NumberOfPossiblePaths().toLocaleString());
    console.log("Best possible solution (shortest path) length = " + citiesData.ShortestPathLength().toLocaleString());

    var totalNumberBees: number = 200;
    var numberInactive: number = 20;
    var numberActive: number = 150;
    var numberScout: number = 30;
    var maxNumberVisits: number = 1000;
    var maxNumberCycles: number = 34600; // <-- This usually needs to be increased to get a more accurate 'bestMeasureOfQuality' 

    var hive: Hive = new Hive(totalNumberBees, numberInactive, numberActive, numberScout, maxNumberVisits, maxNumberCycles, citiesData);

    console.log("\nInitial random hive");
    console.log(hive.ToString());

    var doProgressBar: boolean = true;
    var best: number = hive.Solve(doProgressBar);

    console.log("\nFinal hive");
    console.log("Number of Iterations: " + best);
    console.log(hive.ToString());

    console.log("End Simulated Bee Colony demo");
}

main(null);