const fs = require("fs")
//let data = require("./data.json")
//et users = require("./users.json")

const data = {
    history: []

}
const users = {
    users : []
}
append_data = (name)=>{
    data.history.push({name:name, unit:"beer"})
}

write_to_file = (data ,fileName)=>{
    fs.writeFile(fileName, JSON.stringify(data), function (err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(data));
      console.log('writing to ' + fileName);
    });
}

write_to_file(data, "data.json")
write_to_file(users, "users.json")
