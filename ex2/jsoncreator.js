const fs = require('fs')
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
class Test {
  constructor(item, itemNameVisible, value, description, availabe, path){
    this.item = item,
    this.itemNameVisible = itemNameVisible,
    this.value = value,
    this.description = description,
    this.availabe = availabe
    this.path = path
  }
}

let CCR2004_1G_2XS_PCIe = new Test("CCR2004-1G-2XS-PCIe", "CCR2004-1G-2XS-PCIe", 199.00, "A smart PCIe network interface card that adds full-fledged router capabilities to your servers. The smart and easy way to create 25 Gigabit networks if you want to save space in your server room!", "Availabe in 5-7 days", "./Design/pictures/1.png")
let R11e_LR2 = new Test("R11e-LR2", "R11e-LR2",69.00,"R11e-LR2 enables 2.4 GHz LoRa® connectivity for any MikroTik product that has a mini PCIe slot with connected USB lines. It supports 4 different RX channels and 1 TX channel. 2.4 GHz for LoRa® means significantly higher bandwidth, higher data rate, and less air time. And because of the Chirp modulation technology, it doesn’t interfere with the 2.4 GHz WLAN signal! A perfect solution for industrial setups with a high density of sensors.", "Availabe in 5-7 days","./Design/pictures/2.png")
let KNOT_LR8_kit = new Test("KNOT LR8 kit","KNOT LR8 kit", 199.00,"An out-of-the-box 863-870 MHz IoT Gateway solution for LoRa® technology. For ultimate versatility and cost-effectiveness. The first gateway with a CAT-M interface for LoRa®!","Availabe in 5-7 days", "./Design/pictures/3.png")
let G1040A_60WF = new Test("G1040A-60WF","G1040A-60WF", 49,"CCR2004-16G-2S+ comes with two hot-swap dual redundant power supplies. If one of them goes out of order at some point, the other one will take over. Then you can use this kit to replace the old power supply – and you don’t even have to restart the router!","Availabe in 5-7 days", "./Design/pictures/4.png")
let cAP_XL_ac = new Test("cAP XL ac","cAP XL ac", 99.00,"The ceiling AP on steroids! Our bestseller cAP is back – juiced up and stronger than ever. Compared to the previous cAP models, the improved high-gain antenna increases the covered area by up to 100%!","Availabe in 5-7 days","./Design/pictures/5.png")
let LDF_5 = new Test("LDF 5","LDF 5", 39.00,"The LDF (Lite Dish Feed) is an outdoor wireless system with a built in antenna, meant to be installed on satellite offset dish antennas. The dish will act as a reflector, amplifying the signal.","Availabe in 5-7 days", "./Design/pictures/6.png")
let LHG_XL_52_ac = new Test("LHG XL 52 ac","LHG XL 52 ac", 189.00,"Need a reliable and strong long-distance connection that never goes down? The new LHG XL 52 ac will provide just that with its dual-band capability. You can easily setup the 5 GHz channel as the main one with speed up to 600 Mbps and use the 2.4 GHz channel as an automatic backup connection with speed up to 260 Mbps.","Availabe in 5-7 days", "./Design/pictures/7.png")
let hAP_mini = new Test("hAP mini","hAP mini", 22.95,"The hAP mini is a small 2GHz wireless access point for home or small offices. It has three ports, which are configured as one Internet port and two LAN ports, but can be reconfigured as desired, using the powerful RouterOS configuration options.","Availabe in 5-7 days", "./Design/pictures/8.png")
let hAP_ac_lite_TC = new Test("hAP ac lite TC","hAP ac lite TC", 49.95,"The hAP ac lite is a Dual-concurrent Access Point, that provides WiFi coverage for 2.4GHz and 5GHz frequencies at the same time.\nUnit is equipped with a 650MHz CPU, 64MB RAM, five 10/100Mbps Ethernet ports (PoE output on port #5), dual-chain 802.11b/g/n 2.4GHz wireless, single chain 802.11a/n/ac 5GHz wireless, USB port for 3G/4G modem and a RouterOS L4 license.","Availabe in 5-7 days", "./Design/pictures/9.png")
let LtAP_mini = new Test("LtAP mini","LtAP mini", 89.00,"The LtAP mini is a small weatherproof wireless access point with integrated LTE antennas (with two u.fl pigtails) and miniPCI-e slot, so you can use your own LTE modem of your choice.","Availabe in 5-7 days", "./Design/pictures/10.png")
let aaaarau = [CCR2004_1G_2XS_PCIe, R11e_LR2, KNOT_LR8_kit, G1040A_60WF, cAP_XL_ac, LDF_5, LHG_XL_52_ac, hAP_mini, hAP_ac_lite_TC, LtAP_mini]
let newtest = JSON.stringify(aaaarau,null, 1).toString()
fs.writeFile("C:/Users/KoKoS/Documents/HTML&CSS&JS/HTML_Assignment/json/generated_list.json",newtest, err => {
  if (err) {
    console.error(err)
    return
  }
})