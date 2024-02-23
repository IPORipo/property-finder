function underscoreToCamelCase(inputString) {
  return inputString.replace(/_./g, (match) => match.charAt(1).toUpperCase())
}
function find(where, what) {
  return new RegExp("\\b" + what + "\\b").test(where)
  // return where.includes(what);
}
function findInCategory(category, prop, categoryName) {
  const res = data1[category]?.reduce((acc, cur) => {
    if (find(JSON.stringify(cur), prop))
      acc += `${cur.id} ${category == 'tables' && cur.definition?.apiOptions?.path ? '(<em><bold>' + cur.definition.apiOptions.path + '</bold></em>)' : ""} <br>`
    return acc;
  }, '')
  return res ? `<div class="category"><em><h5>${(categoryName || category).toUpperCase()}:</h5></em>${res}</div>`
    : ''
}

// import properties from "./properties.json"
import data1 from "./sta-capability-management-configs_19-02-2024.json"
import data2 from "./sta-data-dictionary-configs_20-02-2024.json"

// Debounce function to delay execution
function debounce(fn, delay) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay);
  };
}

// Get the textarea element
const textarea = document.getElementById("propertyNames");

// Attach the debounced function to the input event
const debouncedFn = debounce(main, 500);
textarea.addEventListener("input", debouncedFn);

function main() {
  const inputText = textarea.value.trim(); // Remove leading/trailing spaces

  // Split the input text by spaces or new lines to create an array
  const properties = inputText.split(/\s+/);

  const final = JSON.stringify(data1) + JSON.stringify(data2)

  const transformedProps = properties.map((x) => underscoreToCamelCase(x))
  let usedProperties = transformedProps.filter((x) => {
    return find(final, x)
  })

  let res = `
<strong>Found ${usedProperties.length || 0} used properties out of ${properties.length || 0} :</strong>
<br>
<em>${usedProperties.join("<br>")}</em>

<h2>See details of categories and corresponding config Id's</h2>
`;

  res += usedProperties.reduce((acc, curProp) => {
    let propInfo = ''
    propInfo += findInCategory("tableFields", curProp, 'Table Fields')
    propInfo += findInCategory("tables", curProp)
    propInfo += findInCategory("grids", curProp)
    propInfo += findInCategory("charts", curProp)
    propInfo += findInCategory("filters", curProp)
    propInfo += findInCategory("capabilities", curProp)

    if (propInfo) {
      acc += `<div><h2>${curProp} is used in </h2><div class="categories">${propInfo}</div></div><hr>`
    }
    return acc
  }, '')



  document.querySelector("#app").innerHTML = res
}


// function underscoreToCamelCase(inputString){
//   return inputString.replace(/_./g, (match) => match.charAt(1).toUpperCase())
// }

// import data1 from "./sta-capability-management-configs_19-02-2024.json"
// import  data2 from "./sta-data-dictionary-configs_20-02-2024.json"
// import properties from "./properties.json"

// const final = JSON.stringify(data1) + JSON.stringify(data2)

// let res = properties.filter((x) => {
// return final.includes(underscoreToCamelCase(x))
// })

// res = res.map(x=>underscoreToCamelCase(x))
// document.querySelector('#app').innerHTML = res.join("<br>")