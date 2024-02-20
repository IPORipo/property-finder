function underscoreToCamelCase(inputString){
    return inputString.replace(/_./g, (match) => match.charAt(1).toUpperCase())
  }
  
const data1 = require("./sta-capability-management-configs_19-02-2024.json")
const data2 = require("./sta-data-dictionary-configs_20-02-2024.json")
const properties = require("./properties.json")

const final = JSON.stringify(data1) + JSON.stringify(data2)

const res = properties.filter((x) => {
  return final.includes(underscoreToCamelCase(x))
})

res.forEach((x) => console.log(x))

