


const motsADeviner = ["lapin", "chat", "chien", "loup", "tortue"]

const motChoisi = motsADeviner[Math.round(Math.random()*4)]

const zonePlaceholder = document.querySelector("#word-display")
const zoneEssais = document.querySelector("#letters-used")

function createPlaceholder(zone, classe="i"){
    const newPlaceholder =  document.createElement('span')
    zone.appendChild(newPlaceholder)
    newPlaceholder.classList.add(classe)
}

for (let i = 0; i < motChoisi.length; i++){
    createPlaceholder(zonePlaceholder,'letter-placeholder')
    console.log(i)      
}

const lettersUsed = document.querySelector("#letters-used")

const controleLettres = new Set()
const bonMot = []

addEventListener('keydown', function(e){
    console.log(motChoisi)
    if (e.key.length == 1){
        if (controleLettres.has(e.key)){
            alert("Tu as déjà saisi cette lettre sale con ! 🖕")
            console.log("lettre déjà saisie")
            return
        }
        createPlaceholder(zoneEssais)
        document.querySelector(".i:last-child").innerHTML +=`${e.key}`
        for (let i = 0; i < motChoisi.length; i++){
            if (e.key == motChoisi[i] ) {
                
                document.querySelector(".i:last-child").classList.add("vert")
                console.log("bonne lettre")
                bonMot.push(e.key)
            }
            else {
                document.querySelector(".i:last-child").classList.add("rouge")
            }
        }
        
        controleLettres.add(e.key)
        console.log(controleLettres)
    }
        
    })
//document.querySelector(".letter-placeholder:first-child").textContent = "b"


// && !controleLettres.has(e.key)