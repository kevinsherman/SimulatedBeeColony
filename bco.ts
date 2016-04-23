class Bee {
    
}

class Hive {
    
    // Hive data fields here
    ToString(): string {
        return null;
    }
    
    constructor(totalNumberBees: number, numberInactive: number, numberActive: number, 
                numberScout: number, maxNumberVisits: number, maxNumberCycles: number, 
                citiesData: CitiesData) {
    }
    
    GenerateRandomMemoryMatrix(): string[]{
        return null;
    }
    
    GenerateNeighborMemorMatrix(memoryMatrix: string[]): string[]{
        return null;
    }
    
    MeasureOfQuality(memoryMatrix: string[]): number {
        return 0;
    }
    
    Solve(showProgress: boolean): void{
        
    }
    
    ProcessActiveBee(i: number) : void{
        
    }
    
    ProcessScoutnBee(i: number) : void{
        
    } 
    
    ProcessInactiveBee(i: number) : void{
        
    }
    
    DoWaggleDance(i: number) : void{
        
    }
}

class CitiesData {
    public cities: string[];
    public start: number = 65;

    constructor(numberCities: number) {
        this.cities = new Array(numberCities);
        for(var i : number = 0; i < this.cities.length; ++i ){
            this.cities[i] = String.fromCharCode(i + this.start);
        }
    }
    
    Distance(firstCity: string, secondCity: string): number {
        if(firstCity < secondCity){
            return 1 * (secondCity.charCodeAt(0) - firstCity.charCodeAt(0));
        } else {
            return 1.5 * (firstCity.charCodeAt(0) - secondCity.charCodeAt(0));
        }
    }
    
    ShortestPathLength() : number {
        return 1 * (this.cities.length - 1);
    }
    
    NumberOfPossiblePaths() : number {
        var n = this.cities.length;
        var answer : number = 1;
        
        for(var i: number = 1; i <= n; ++i){
            answer *= i;
        }
        return answer;
    }
    
    ToString() : string {
        var s : string = "";
        s += "Cities: ";
        for(var i : number = 0; i < this.cities.length; ++i){
            s += this.cities[i] + " ";
        }
        return s;
    }
}

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

function main(args: string[]):void {
    console.log("\nBegin Simulated Bee Colony algorithm demo\n");
    console.log("Loading cities data for SBC Traveling Salesman Problem analysis");
    var citiesData: CitiesData = new CitiesData(20);
    console.log(citiesData.ToString());
    console.log("Number of cities: " + citiesData.cities.length);
    console.log("Number of possible paths: " + citiesData.NumberOfPossiblePaths().toLocaleString());
    console.log("Best possible solution (shortest path) length = " + citiesData.ShortestPathLength().toLocaleString());
    
    var totalNumberBees : number = 100;
    var numberInactive : number = 20;
    var numberActive : number = 50;
    var numberScout : number = 30;
    var maxNumberVisits : number = 100;
    var maxNumberCycles : number = 3460;
    
    var hive: Hive = new Hive(totalNumberBees, numberInactive, numberActive, numberScout, maxNumberVisits, maxNumberCycles, citiesData);
    
    console.log("\nInitial random hive");
    console.log(hive.ToString());
    
    var doProgressBar: boolean = true;
    hive.Solve(doProgressBar);
    
    console.log("\nFinal hive");
    console.log(hive.ToString());
    
    
    console.log("End Simulated Bee Colony demo");
}

main(null);