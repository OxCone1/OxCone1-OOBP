let itemArray = []
  class Items{
    constructor(name, value, count){
      this.name = name,
      this.value = value,
      this.count = count
    }
  }
var request = new XMLHttpRequest();
request.open("GET", "./json/generated_list.json", false);
request.send(null)
var json = JSON.parse(request.responseText);

function addItemsToArray(index,array) {
  let checker = true
  itemArray.forEach((element) => {
    if (array[index].itemNameVisible === element.name) {
      checker = false
      element.count = element.count+1
    }
  })
  if (checker == true) {
    let item = new Items(array[index].itemNameVisible, array[index].value, 1)
    itemArray.push(item)
  }
  function getTotalAmountOfItems() {
    let outputCount = 0
    for (let i = 0; i < itemArray.length; i++) {
      outputCount += itemArray[i].count
    }
    return outputCount
  }
  document.querySelector("#cartcount").innerText = getTotalAmountOfItems()
}