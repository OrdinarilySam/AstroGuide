const fs = require('fs')

module.exports = (client) => {
  client.writeJSON = async (newData) => {
    const existingData = client.fetchJSON()
    const data = {...existingData, ...newData}
    console.log(newData)
    console.log(existingData)
    console.log(data)
    fs.writeFile("src/data.json", JSON.stringify(data, null, 4), ()=> console.log("updated json"))
  }
}