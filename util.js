
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
    function create_ul(name, value){
        var li = document.createElement("li")
        li.setAttribute("class", "list-group-item justify-content=between")
        li.innerHTML = name + 
                       ' <span class="badge badge-default badge-pill">' + 
                        value + 
                        '</span>';
        return li;
		
    }
	
	  function create_listis(name, value){
        var li = document.createElement("li")
        li.setAttribute("class", "list-group-item justify-content=between")
        li.innerHTML = name;
        return li;
    }
	
    function update_list(list_of_names, corresponding_values){
        var list = document.getElementById("thelist")
        list_of_names.forEach(function(name, index){
            value = corresponding_values[index] 
            li = create_ul(name, value)
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
    
    

