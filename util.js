
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
    function create_ul(name){
        var ul = document.createElement("li")
        ul.setAttribute("class", "list-group-item justify-content=between")
        ul.innerHTML = name + ' <span class="badge badge-default badge-pill">1</span>'
        return ul;
    }
    function update_list(data){
        list_of_names=  data.history.map(a=>a.name)
        var list = document.getElementById("thelist")
        list_of_names.forEach(function(name){
            li = create_ul(name)
            list.appendChild(li)
        })
        
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
    
    

