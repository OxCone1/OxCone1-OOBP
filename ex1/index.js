//Copyright by Vadim "OxCone" Lyapin
//With given in task requirements mob and player settings and my game implementation there is only 1/200 chance of completing the game!
//If you want to test the game, consider changing Gigant Dragon's hit probability, which could be found in line 235 as the last value!
//Good luck!
const prompts = require('prompts');
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isArrayEmpty(givenArray){
    if (givenArray.length == 0) {
        return true
    }
    else {
        return false
    }
}
function returnFinalArrayItemIndex(finalIndexArray) {
    if (isArrayEmpty(finalIndexArray) == false) {
        return finalIndexArray.length-1
    }
}
function returnSearchedArrayIndex(arrayToBeSearched, arrayValue) {
    return arrayToBeSearched.indexOf(arrayValue)
}
function defineHidden(hiddenRooms) {
    
}
function importConnections(...args) {
    let dungeonName = arguments[0]
    for (let i = 1; i < arguments.length; i++) {
        arguments[i].connectionsAll = dungeonName.connectionRule
        arguments[i].connectionsRoomSpecific = dungeonName.connectionRule[i-1]
        let temp = arguments[i].connectionsRoomSpecific
        temp.shift()
        arguments[i].connectionsRoomSpecific = temp
    }
    for (let i = 1; i < arguments.length; i++) {
        for (let g = 1; g < arguments.length; g++) {
            arguments[i].allRoomObjectStorage[g-1] = arguments[g] 
        }
    }
    for (let i = 1; i <= arguments.length-1; i++) {
        for (let g = 0; g <= arguments[i].connectionsRoomSpecific.length-1; g++) {
            arguments[i].connectionsRoomSpecificAsObject[g] = arguments[arguments[i].connectionsRoomSpecific[g]+1]
        }
    }
}
function findNumberInArrayAndReturnIndex(array) {
    for (let i = 0; i <= array.length-1; i++) {
        if (isNaN(array[i]) == false) {
            return i
        }
    }
}
function findNotANumberValueAndReturnIndex(array) {
    for (let i = 0; i <= array.length-1; i++) {
        if (isNaN(array[i]) == true) {
            return i
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class Base {
    constructor(name, hp, initialDamage, hitChance) {
        this.name = name;
        this.hp = hp;
        this.initialDamage = initialDamage;
        this.hitChance = hitChance;
        this.aliveStatus = true;
    }
    getHp() {return this.hp}
    getAttackValue() {return this.initialDamage}
    checkHp() {
        console.log("\n------------------------------------------")
        console.log("\x1b[36m" + "\x1b[1m" + this.name + " has " + this.hp +" HP" +"\x1b[0m")
        console.log("------------------------------------------\n")
    }
    decreaseHp(hpValue, attackerName) {
        this.hp -= hpValue;
        if (this.hp <= 0) {
            this.kill()
            console.log("\x1b[32m"+ "\x1b[1m" +this.name +"\x1b[0m" + " was killed by " + "\x1b[31m" + "\x1b[1m" + attackerName +"\x1b[0m" + "!")
        }
        else{
            console.log("\x1b[32m"+ "\x1b[1m" +this.name + "\x1b[0m" + " has " + "\x1b[1m" + "\x1b[31m" + this.getHp() + " HP left."+"\x1b[0m")
        }
    }
    increaseHp(hpValue) {
        this.hp += hpValue;
        if (this.hp > 0) {
            this.resurect()
        }
    }
    kill() {this.aliveStatus = false}
    resurect() {this.aliveStatus = true}
    hitResult() {
        if (getRandomIntInclusive(0, 100) <= this.hitChance){
            return true
        }
        else {return false}
    }
    attack(target) {
        if (getRandomIntInclusive(0,100) <= this.hitChance) {
            // console.log("\n------------------------------------------\n")
            console.log("\x1b[31m" + "\x1b[1m" + this.name+"\x1b[0m" + " attacked " + "\x1b[32m" + "\x1b[1m" + target.name +"\x1b[0m" + " for "+"\x1b[31m" + "\x1b[1m" + this.getAttackValue() + " HP."+"\x1b[0m")
            target.decreaseHp(this.getAttackValue(), this.name)
            console.log("\n------------------------------------------\n")
        }
        else {
            console.log("\x1b[31m" + "\x1b[1m" + this.name +"\x1b[0m" + " attack against " + "\x1b[32m" + "\x1b[1m" + target.name + "\x1b[31m"+ " failed."+"\x1b[0m")
            console.log("\x1b[32m" + "\x1b[1m" + target.name + " survived! " + "\x1b[0m"+ "(0 Damage inflicted)")
            console.log("\n------------------------------------------\n")
        }
    }
}
class Dungeon {
    constructor() {
        this.roomArray = new Array();
        this.connectionRule = new Array()
    }
    getRoomWithPlayer() {
        for (let i = 0; i <= this.roomArray.length-1; i++) {
            if (this.roomArray[i].playerInRoom == true) {
                return this.roomArray[i]
            }
        }
    }
    getRoomWithPlayerIndex() {
        for (let i = 0; i <= this.roomArray.length-1; i++) {
            if (this.roomArray[i].playerInRoom == true) {
                return i
            }
        }
    }
    movePlayerFromThisRoom() {
        this.roomArray[this.getRoomWithPlayerIndex()].playerInRoom = false
    }
    movePlayerToRoom(toRoom) {
        this.roomArray[returnSearchedArrayIndex(this.roomArray, toRoom)].playerInRoom = true
    }
    addRooms() {
        for (let i = 0; i < arguments.length; i++) {
            this.roomArray.push(arguments[i]);
        }
    }
    getConnectionRule() {return this.connectionRule}
    createConnectionRuleTable() {
        for (let i = 0; i < this.roomArray.length; i++) {
            let newarray = []
            newarray[0] = this.roomArray[i].roomName
            this.connectionRule[i]= newarray
            
        }
    }       
    makeRoomConnection(room1, room2) {
        for (let i = 0; i <= this.connectionRule[returnSearchedArrayIndex(this.roomArray, room1)].length; i++) {
            if (this.connectionRule[returnSearchedArrayIndex(this.roomArray, room1)][i] == returnSearchedArrayIndex(this.roomArray, room2)) {
                return console.table("This connection already exists")
            }
        }
        this.connectionRule[returnSearchedArrayIndex(this.roomArray, room1)][returnFinalArrayItemIndex(this.connectionRule[returnSearchedArrayIndex(this.roomArray, room1)])+1] = returnSearchedArrayIndex(this.roomArray, room2);
        this.connectionRule[returnSearchedArrayIndex(this.roomArray, room2)][returnFinalArrayItemIndex(this.connectionRule[returnSearchedArrayIndex(this.roomArray, room2)])+1] = returnSearchedArrayIndex(this.roomArray, room1);
    }
}
class Room {
    constructor(roomName, description) {
        this.roomName = roomName;
        this.description = description;
        this.levelEndRoom = false;
        this.playerInRoom = false;
        this.allHiddenElementPool = new Array();
        this.hiddenElements = new Array();
        this.hiddenMobs = new Array();
        this.dicoveredElements = new Array();
        this.connectionsAll = new Array();
        this.connectionsRoomSpecific = new Array();
        this.connectionsRoomSpecificAsObject = new Array();
        this.allRoomObjectStorage = new Array();
        this.search = false;
        this.allMobsDead = false;
    }
    getCreaturesToAttack(target) {
        if (this.checkIfAllMobsDied() == false) {
            for (let i = 0; i <= this.hiddenMobs.length-1; i++) {
                this.hiddenMobs[i].attack(target)
            }
        }
    }
    mobKilling(target) {
        if (target.aliveStatus == false) {
            this.hiddenMobs.splice([this.hiddenMobs.indexOf(target)],1)
        }
    }
    checkIfAllMobsDied() {
        if (this.hiddenMobs.length == 0) {return true}
        else{return false}}
    searchRoom() {this.search = true}
    returnHiddenElements() {return this.hiddenElements}
    returnHiddenMobs() {return this.hiddenMobs}
    removePlayerFromRoom() {this.playerInRoom = false}
    setRoomWithPlayer() {this.playerInRoom = true}
    setLevelEndRoom() {this.levelEndRoom = true}
    addToAllPool() {
        let x  = this.hiddenElements
        let y  = this.hiddenMobs
        for (let i = 0; i <= x.length-1; i++) {
            this.allHiddenElementPool.push(x[i])
        }
        for (let i = 0; i <= y.length-1; i++) {
            this.allHiddenElementPool.push(y[i])
        } 
    }
    addConnectionsToHidden() {
        let x = this.connectionsRoomSpecific
        for (let i = 0; i <= x.length-1; i++) {
            this.hiddenElements.push(x[i])
        }
    }
    addMonsters(monsterName) {this.hiddenMobs.push(monsterName)}
    addRoomItems(itemName) {this.hiddenElements.push(itemName)}
    makeEndRoom() {this.levelEndRoom = true}
}

let dungeon = new Dungeon()
let enterance = new Room("The dungeon entrance" , "A crack in the ceiling above the middle of the north wall allows a trickle of water to flow down to the floor. The water pools near the base of the wall, and a rivulet runs along the wall an out into the hall. The water smells fresh.")
let hallway = new Room("Hallway" , "This hall is choked with corpses. The bodies of orcs and ogres lie in tangled heaps where they died, and the floor is sticky with dried blood. It looks like the orcs and ogres were fighting. Some side was the victor but you're not sure which one. The bodies are largely stripped of valuables, but a few broken weapons jut from the slain or lie discarded on the floor.")
let chamber = new Room("Chamber" , "The manacles set into the walls of this room give you the distinct impression that it was used as a prison and torture chamber, although you can see no evidence of torture devices. One particularly large set of manacles -- big enough for an ogre -- have been broken open.")
let portal = new Room("Portal room" , "You can hear the crackling of a fire as you enter a homely room with ancient brick walls. Rodent's scurry from your sight across the tile floor. Torches in the room are already lit. There is a huge portal on the opposite wall.")
let player = new Base("Player", 10, 2, 75);
let rat = new Base("Sewer Rat", 2, 1, 50);
let giantDragon = new Base("Giant Dragon", 4, 8, 90);
dungeon.addRooms(enterance, hallway, chamber, portal)
enterance.setRoomWithPlayer()
dungeon.createConnectionRuleTable()
dungeon.makeRoomConnection(enterance, hallway)
dungeon.makeRoomConnection(hallway, chamber)
dungeon.makeRoomConnection(chamber, portal)
portal.setLevelEndRoom()
importConnections(dungeon, enterance, hallway, chamber, portal)
hallway.addMonsters(rat)
chamber.addMonsters(giantDragon)
// enterance.addMonsters(cringe)
enterance.addConnectionsToHidden()
enterance.addToAllPool()
hallway.addConnectionsToHidden()
hallway.addToAllPool()
chamber.addConnectionsToHidden()
chamber.addToAllPool()
portal.addConnectionsToHidden()
portal.addToAllPool()


async function gameLoop() {
    let gameRunning = true;
    const initialActionChoices = [
        { title: 'Look Around', value: 'lookAround' },
        { title: 'Move to room', value: 'moveToRoom' },
        { title: 'Attack', value: 'attack'},
        { title: 'Check Hp', value: 'hpCheck' },
        { title: 'Exit minigame', value: 'exit'}
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'What do you want to do?',
      hint: "\x1b[1m"+'Remember that you need to search room before attacking monsters/moving to other rooms!\nYou need to administer search only once to dicover what is in the room!\nAlso, you need to kill all enemies to get possibility to move to other rooms!'+"\x1b[0m",
      choices: initialActionChoices
    });

    switch(response.value) {
        case 'lookAround':
            playerRoom = dungeon.getRoomWithPlayer()
            playerRoomIndex = dungeon.getRoomWithPlayerIndex()
            console.log("------------------------------------------\n")
            console.log("\x1b[36m" + "\x1b[1m" + playerRoom.description + "\x1b[0m" + "\n")
            console.log("------------------------------------------\n")
            await sleep(800)
            console.log("\x1b[1m" +"You looked around and found something...\n"+ "\x1b[0m")
            console.log("------------------------------------------\n")
            await sleep(800)
            for (let i = 0; i <= playerRoom.hiddenElements.length-1; i++) {
                console.log("\x1b[32m" + "\x1b[1m" + "--- Enterance to " + playerRoom.allRoomObjectStorage[playerRoom.hiddenElements[i]].roomName+ " ---"+"\x1b[0m")
                await sleep(420)
            }
            await sleep(400)
            console.log("\n------------------------------------------")
            if (playerRoom.checkIfAllMobsDied() == false) {
                console.log()
                for (let i = 0; i <= playerRoom.hiddenMobs.length-1; i++) {
                    console.log("\x1b[31m"+"\x1b[1m" + playerRoom.hiddenMobs[i].name +"\x1b[0m")
                }
            }
            playerRoom.searchRoom()
            if (playerRoom.checkIfAllMobsDied() == false) {
                console.log("\n------------------------------------------\n"+"\x1b[31m"+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"+"!!!!!!"+"\x1b[1m"+"Incoming attacks from enemies"+"\x1b[0m"+"\x1b[31m"+"!!!!!!!\n"+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"+"\x1b[0m"+"------------------------------------------\n");
                await sleep(1000)
                dungeon.getRoomWithPlayer().getCreaturesToAttack(player)
            }
            
        break;
      
        case 'moveToRoom':
            playerRoom = dungeon.getRoomWithPlayer()
            playerRoomIndex = dungeon.getRoomWithPlayerIndex()
            if (playerRoom.search == false || playerRoom.checkIfAllMobsDied() == false ) {
                if (playerRoom.checkIfAllMobsDied() == false) {
                    console.log("You haven't defeated all the mobs")
                }
                if (playerRoom.search == false) {
                    console.log("You haven't searched the room yet")
                }
            }
            else {
                function getArrayOfObjectsSeparately(array) {
                    let newarray =[]
                    for (let i = 0; i < array.length; i++) {
                        let room = array[i]
                        let objectCreation = { title: room.roomName, value: room }
                        newarray[i] = objectCreation
                    }
                    return newarray
                }
                const moveRoomSelector = await prompts({
                    type: 'select',
                    name: 'selectedRoom',
                    message: 'Choose a room ehere you want to go',
                    choices: getArrayOfObjectsSeparately(playerRoom.connectionsRoomSpecificAsObject)
                });
                dungeon.movePlayerFromThisRoom()
                dungeon.movePlayerToRoom(moveRoomSelector.selectedRoom)
                playerRoom = dungeon.getRoomWithPlayer()
                if (playerRoom.checkIfAllMobsDied() == false) {
                    console.log("\n------------------------------------------\n"+"\x1b[31m"+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"+"!!!!!!"+"\x1b[1m"+"Incoming attacks from enemies"+"\x1b[0m"+"\x1b[31m"+"!!!!!!!\n"+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"+"\x1b[0m"+"------------------------------------------\n");
                    await sleep(1200)
                    dungeon.getRoomWithPlayer().getCreaturesToAttack(player)
                }
            }
            
        break;
      
        case 'attack':
            playerRoom = dungeon.getRoomWithPlayer()
            playerRoomIndex = dungeon.getRoomWithPlayerIndex()
            if (playerRoom.checkIfAllMobsDied() == true || playerRoom.search == false ) {
                if (playerRoom.search == false) {
                    console.log("You haven't searched the room yet")
                }
                else{
                    if (playerRoom.checkIfAllMobsDied() == true & playerRoom.search  == true) {
                    console.log("There are no creatures left in this room!")
                }}
            }
            else {
                function getArrayOfObjectsSeparately(array) {
                    let newarray =[]
                    for (let i = 0; i < array.length; i++) {
                        let mobs = array[i]
                        let objectCreation = { title: mobs.name, value: mobs }
                        newarray[i] = objectCreation
                    }
                    return newarray
                }
                const mobAttackSelecetor = await prompts({
                    type: 'select',
                    name: 'selectedEnemy',
                    message: 'Choose who you want to attack',
                    choices: getArrayOfObjectsSeparately(playerRoom.hiddenMobs)
                });
                await sleep(700)
                console.log("------------------------------------------\n")
                player.attack(mobAttackSelecetor.selectedEnemy)
                playerRoom.mobKilling(mobAttackSelecetor.selectedEnemy)
                await sleep(1250)
            }
        break;
        case 'hpCheck':
            player.checkHp()
        break;
        case 'exit':
            gameRunning = false
        break;
    }
    if (dungeon.getRoomWithPlayer().levelEndRoom == true || player.aliveStatus == false) {
        gameRunning = false
        if (dungeon.getRoomWithPlayer().levelEndRoom == true) {
            await sleep(250)
            console.log("Congratulations, "+ player.name +"!");
            await sleep(1200)
            console.log("\nYou managed to sneak through the portal to different reality!\n")
            await sleep(1800)
            console.log("You won!");
        }
    }
    //If gameRunning is true, it'll loop the game
    if(gameRunning) {
      gameLoop();
    }
}

process.stdout.write('\033c'); // clear screen on windows

console.log("\x1b[1m"+'Welcome to the Dungeon of the Dragon Lord')
console.log('=========================================')
console.log('=========================================')
console.log("\n"+"\x1b[1m"+'You walk down the stairs to the dungeons'+"\n")
console.log("\x1b[1m"+'You are standing in '+dungeon.getRoomWithPlayer().roomName+"\n")
gameLoop();
