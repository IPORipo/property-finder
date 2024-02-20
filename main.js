


function underscoreToCamelCase(inputString){
    return inputString.replace(/_./g, (match) => match.charAt(1).toUpperCase())
  }
  
import data1 from "./sta-capability-management-configs_19-02-2024.json"
import  data2 from "./sta-data-dictionary-configs_20-02-2024.json"
import properties from "./properties.json"

const final = JSON.stringify(data1) + JSON.stringify(data2)

let res = properties.filter((x) => {
  return final.includes(underscoreToCamelCase(x))
})

res = res.map(x=>underscoreToCamelCase(x))
document.querySelector('#app').innerHTML = res.join("<br>")