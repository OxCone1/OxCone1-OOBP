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
function getTotalAmountOfItems() {
  let outputCount = 0
  for (let i = 0; i < itemArray.length; i++) {
    outputCount += itemArray[i].count
  }
  return outputCount
}
function getTotalPriceOfAllItems() {
  let outputCount = 0
  for (let i = 0; i < itemArray.length; i++) {
    outputCount += itemArray[i].count*itemArray[i].value
  }
  return outputCount
}
function removeItemFromArray(index) {
  itemArray.splice(index, 1)
  document.querySelector("#cartcount").innerText = getTotalAmountOfItems()
  displayCart()
}
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

  document.querySelector("#cartcount").innerText = getTotalAmountOfItems()
}
function displayCart() {
  document.querySelector(".target").innerHTML = ''
  let targetDest = document.querySelector(".target")
  let tableGen = document.createElement("table")
  tableGen.id = "itemTable"
  targetDest.appendChild(tableGen)
  
  let tableRowGen = document.querySelector("#itemTable")
  let tableHeaderRow = document.createElement("tr")
  tableHeaderRow.id = "strowelems"
  tableRowGen.appendChild(tableHeaderRow)

  let thElementDest = document.querySelector("#strowelems")
  let NAME = document.createElement("th")
  NAME.innerText = "Item Name"
  thElementDest.appendChild(NAME)
  let QTY = document.createElement("th")
  QTY.innerText = "QTY"
  thElementDest.appendChild(QTY)
  let OWNPRICE = document.createElement("th")
  OWNPRICE.innerText = "Price"
  thElementDest.appendChild(OWNPRICE)
  let TOTAL = document.createElement("th")
  TOTAL.innerText = "Total Price"
  thElementDest.appendChild(TOTAL)

  itemArray.forEach(element => {
    let generate = document.querySelector("#itemTable")
    let newElemRow = document.createElement("tr")
    generate.appendChild(newElemRow)

    let itemName = document.createElement("td")
    itemName.innerText = element.name
    newElemRow.appendChild(itemName)

    let itemQTY = document.createElement("td")
    itemQTY.innerText = element.value +"$"
    newElemRow.appendChild(itemQTY)

    let itemCount = document.createElement("td")
    itemCount.innerText = element.count
    newElemRow.appendChild(itemCount)

    let itemTotal = document.createElement("td")
    itemTotal.innerText = element.value*element.count+"$"
    newElemRow.appendChild(itemTotal)

    let remover = document.createElement("td")
    remover.innerText = "X"
    remover.id = "removeButtonTable"
    remover.onclick = function() {
      removeItemFromArray(itemArray.indexOf(element))
    }
    newElemRow.appendChild(remover)
  });

  let endElems = document.createElement("tr")
  endElems.id = "endElems"
  tableRowGen.appendChild(endElems)

  let lastRow = document.querySelector("#endElems")

  let backButton = document.createElement("td")
  backButton.innerText = "BACK"
  backButton.id = "backButton"
  backButton.onclick = function() {
    generateItemList()
  }
  lastRow.appendChild(backButton)

  let priceandamount = document.createElement("td")
  priceandamount.setAttribute("colspan",2)
  priceandamount.innerText = "Total amount of items in cart: "+ getTotalAmountOfItems() +"\nTotal pirce of all items: "+ getTotalPriceOfAllItems()+ "$"
  lastRow.appendChild(priceandamount)

  let purchaseButton = document.createElement("td")
  purchaseButton.id = "buttonswcltd"
  lastRow.appendChild(purchaseButton)

  let orderButtonDiv = document.querySelector("#buttonswcltd")
  let purchaseButtonDiv = document.createElement("div")
  purchaseButtonDiv.innerText = "Order now"
  purchaseButtonDiv.id = "buttonswcldiv"
  orderButtonDiv.appendChild(purchaseButtonDiv)

}