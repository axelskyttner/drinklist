
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function createUserHtmlElement(userData){
    var li = document.createElement("li")
        li.setAttribute("class", "list-group-item justify-content=between")
        li.innerHTML = userData.username + 
        ', enheter: ' +
        ' <span class="badge badge-default badge-pill">' + 
        userData.units + 
        '</span>' +
             ', väntevärde:' + userData.avarageDiff + ', Standardavvikelse: ' + userData.standardDeviation + ', senaste streck: '+ userData.time
        
    return li;

}

function truncate(val){

    return Math.round(val*100)/100
}
function createHeaderForAdvancedUserData(username){
    var header = document.createElement("h2")
    header.innerHTML = "Avancerad data för " + username

    return header

}
function createAdvancedUserData(nrBeer, nrCider, nrSnaps){
    var div = document.createElement("div")

    var data = [{
        values: [nrBeer, nrCider, nrSnaps],
        labels: ['Öl', 'Cider', 'Snaps'],
        type: 'pie'
    }];

    var layout = {
        height: 480,
        width: 320
    };

    Plotly.newPlot(div, data, layout, {displayModeBar:false}  );
    return div
}
function createGaugePlot(){
    var div = document.createElement("div")
    
    const topScore = 0.0011
    const  worstScore = 0
    const userScore = 0.0005556
    // Enter a speed between 0 and 180
    var level = userScore/(topScore)*180;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
    
    const total = 4
    var data = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'text+name'},
        { values: [total/6, total/6, total/6, total/6, total/6, total/6, total],
          rotation: 90,
          text: ['Kanonkul!', 'Helt okej kul', 'Heh', 'Ska träffa föräldrar',
          'Ska träffa svärföräldrar', 'Ska träffa barnen', ''],
          textinfo: 'text',
          textposition:'inside',
          marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
              'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
              'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
              'rgba(255, 255, 255, 0)']},
          labels: ['151-180', '121-150', '91-120', '61-90', '1-60', '0-1', ''],
          hoverinfo: 'label',
          hole: .5,
          type: 'pie',
          showlegend: false
        }];


    var layout = {
shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
color: '850000'
      }
       }],
       title: 'Enhetsfrekvens 0-0.016Hz',
       height: 320,
       width: 280,
       xaxis: {zeroline:false, showticklabels:false,
           showgrid: false, range: [-1, 1]},
       yaxis: {zeroline:false, showticklabels:false,
           showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot(div, data, layout, {displayModeBar:false});

    return div;
}

function create_listis(name, value){
    var li = document.createElement("li")
        li.setAttribute("class", "list-group-item justify-content=between")
        li.innerHTML = name;
    return li;
}

function update_list(list_of_names, corresponding_values){
    const elements = list_of_names.map(function(name, index){
            value = corresponding_values[index] 
            li = createUserHtmlElement(name, value)
            return li
            })
    return elements;

}

function compose () {
    var fns = arguments;

    return function (result) {
        for (var i = fns.length - 1; i > -1; i--) {
            result = fns[i].call(this, result);
        }

        return result;
    };
};

function parseTime(timeString){
    var times = timeString.split(":")
    var hours = parseInt(times[0])
    var minutes = parseInt(times[1])
    return hours*60 + minutes
}
function avarage(list){
    return list.reduce((avg, val, index, arr)=>avg+val/arr.length,0)

}


function calculateStandardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return truncate(stdDev);
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}
function calculateMeanDifference(list){
    if(list.length <= 1){
        return 0
    }
    else {

        const startOfList = list.slice(0,-1) 
        const endOfList = list.slice(1) 
        const differences = startOfList.map((val,index)=>Math.abs(val-endOfList[index]) )
        return truncate(avarage(differences))
    }
}
/*
module.exports ={

    calculateMeanDifference: calculateMeanDifference,
    parseTime: parseTime
}
*/
