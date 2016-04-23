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
function test2() {
    var cd = new CitiesData(10);
    for (var i = 0; i < cd.cities.length; i++) {
        console.log("CITY: " + i + " " + cd.cities[i]);
    }
    var x = cd.Distance(cd.cities[3], cd.cities[2]);
    console.log("DISTANCE: " + x);
    console.log("SHORTEST: " + cd.ShortestPathLength());
    console.log("NUM Paths: " + cd.NumberOfPossiblePaths());
    console.log("TOSTRING: " + cd.ToString());
}
test2();
