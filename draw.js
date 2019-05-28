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

    var boxModel = {

        h : 500,
        w : 800,
        margin : {top: 20, right: 20, bottom: 20, left: 20},
        padding : {top: 10, right: 10, bottom: 20, left: 10}

    };

    var innerPadding = 2.5;

    // circles attr
    var r = 5;
    var alpha = 1;

    // load data and draw
    d3.csv("iris.csv", rowConverter).then(function(data){

        drawScatterplot(data, x, y, c, boxModel, innerPadding, r, alpha);
        
    })
    
}

