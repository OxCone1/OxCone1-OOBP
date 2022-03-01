function generateItemList() {
    $.getJSON("./json/generated_list.json", function(json){
        document.querySelector(".target").innerHTML = ''

        let containerClassCreator = document.createElement("div")
        containerClassCreator.className = "container"
        document.querySelector(".target").appendChild(containerClassCreator)
      json.forEach(element  => {
          let divElement = document.createElement("div");
          divElement.id = "box";
          document.querySelector(".container").appendChild(divElement)
      });
      document.querySelectorAll("#box").forEach((element, index) => {
        let imageHolder = document.createElement("img");
        imageHolder.src = json[index].path
        element.appendChild(imageHolder)
        // -----------------------------------------
        let nameHolder = document.createElement("div");
        nameHolder.id = "name";
        nameHolder.innerText = json[index].itemNameVisible
        element.appendChild(nameHolder)
        // -----------------------------------------    
        let priceHolder = document.createElement("div");
        priceHolder.id = "price";
        priceHolder.innerText = json[index].value + "$"
        element.appendChild(priceHolder)
        // -----------------------------------------
        let availabeHolder = document.createElement("div");
        availabeHolder.id = "availabe";
        availabeHolder.innerText = json[index].availabe
        element.appendChild(availabeHolder)
        // -----------------------------------------
        let dummyHolder = document.createElement("div");
        dummyHolder.id = "dummy";
        element.appendChild(dummyHolder)
        // -----------------------------------------
        let buttonHolder = document.createElement("a");
        buttonHolder.id = "navigation";
        element.appendChild(buttonHolder)
        // -----------------------------------------
        // -----------------------------------------
        dummyHolder.onclick = function() {
          generateItemDescriptionPage(index)
        }
        imageHolder.onclick = function() {
          generateItemDescriptionPage(index)
        }
        availabeHolder.onclick = function() {
          generateItemDescriptionPage(index)
        }
        priceHolder.onclick = function() {
          generateItemDescriptionPage(index)
        }
        nameHolder.onclick = function() {
          generateItemDescriptionPage(index)
        }
        buttonHolder.onclick = function() {
          addItemsToArray(index, json)
        }
      });
      document.querySelectorAll("#navigation").forEach((element, index) => {
        var buttonHolder1 = document.createElement("div");
        buttonHolder1.id = "buttonswcl";
        buttonHolder1.innerText = "Add To Cart";
        element.appendChild(buttonHolder1)
      })
    })
  }
  function generateItemDescriptionPage(index) {
    $.getJSON("./json/generated_list.json", function(json){

        document.querySelector(".target").innerHTML = ''

        let containerClassCreator = document.createElement("div")
        containerClassCreator.className = "container_g"
        document.querySelector(".target").appendChild(containerClassCreator)
        let selector = document.querySelector(".container_g")

        let goBack = document.createElement("div")
        goBack.className = "navigate_back"
        goBack.innerText = "BACK"
        selector.appendChild(goBack)
        goBack.onclick = function() {
          generateItemList()
        }

        let picHolder = document.createElement("div")
        picHolder.className = "picture"
        selector.appendChild(picHolder)

          let name = document.createElement("div")
          name.id = "name"
          name.innerText = json[index].itemNameVisible
          picHolder.appendChild(name)

          let imgB = document.createElement("img")
          imgB.id = "picture_g"
          imgB.src = json[index].path
          picHolder.appendChild(imgB)

          let storage = document.createElement("div")
          storage.id = "availabe"
          storage.innerText = json[index].availabe 
          picHolder.appendChild(storage)

        let description = document.createElement("div")
        description.className = "description"
        selector.appendChild(description)

          let text = document.createElement("div")
          text.id = "text"
          text.innerText = json[index].description
          description.appendChild(text)

          let price = document.createElement("div")
          price.id = "price"
          price.innerText = json[index].value +"$"
          description.appendChild(price)

          let buttonswcl = document.createElement("div")
          buttonswcl.id = "buttonswcl"
          buttonswcl.innerText = "Add to cart"
          description.appendChild(buttonswcl)
          buttonswcl.onclick = function () {
            addItemsToArray(index, json)
          }
      })
  }