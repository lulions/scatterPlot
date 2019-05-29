window.onload = function(){
    
   // type conversion
   function rowConverter(d) {
    return{
        sepLen: parseFloat(d["sepal length"]),
        sepWid: parseFloat(d["sepal width"]),
        petLen: parseFloat(d["petal length"]),
        petWid: parseFloat(d["petal width"]),
        species: d.class
        };
    }

    // variable used for x axis
    var x = "sepLen";

    // variable used for y axis
    var y = "sepWid";

    // variable used for fill circles
    var c = "species";

    // variable used for radius
    var r = "petLen";
    
    // opacity
    var alpha = 0.6;
    
    // set box model params
    var boxModel = {

        h : 500,
        w : 800,
        margin : {top: 20, right: 20, bottom: 20, left: 20},
        padding : {top: 10, right: 10, bottom: 20, left: 10}

    };

    // set distance between axes and data (in % of the variable's range)
    var innerPadding = 2.5;

    // load data and draw
    d3.csv("iris.csv", rowConverter).then(function(data){

        drawScatterplot(data, x, y, c, r, alpha, boxModel, innerPadding);
        
    })
    
}

