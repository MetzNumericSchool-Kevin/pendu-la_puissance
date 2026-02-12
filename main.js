


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
    //createPlaceholder(zonePlaceholder,'letter-placeholder')
    const newPlaceholder =  document.createElement('span')
    zonePlaceholder.appendChild(newPlaceholder)
    newPlaceholder.classList.add('letter-placeholder')
    console.log(i)      
}

const lettersUsed = document.querySelector("#letters-used")

const controleLettres = new Set()
const bonMot = []
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let erreur = 0
addEventListener('keydown', function(e){
    console.log(motChoisi)
    //if (e.key.length == 1 )){
    if (alphabet.indexOf(e.key) != -1){
        if (controleLettres.has(e.key)){
            alert(`Tu as déjà saisi la lettre "${e.key}" ! ☝️`)
            console.log("lettre déjà saisie")
            return
        }
        controleLettres.add(e.key)
        console.log(controleLettres)
        
        const newEssai =  document.createElement('span')
        zoneEssais.appendChild(newEssai)
    
        zoneEssais.querySelector("span:last-child").innerHTML +=`${e.key}`
        if (motChoisi.indexOf(e.key) == -1){
            erreur += 1
            document.querySelector(`#hangman>g:nth-child(${erreur+1})`).classList.remove('hidden')
        }
        
        if (erreur >= 5){
            alert(`Fin du jeu, le bon mot était ${motChoisi} !`)
            //exit
        }
        
        for (let i = 0; i < motChoisi.length; i++){
            if (e.key != motChoisi[i] ) {
                zoneEssais.querySelector("span:last-child").classList.add("rouge")

            } else {
              
                zoneEssais.querySelector("span:last-child").classList.add("vert")
                //console.log("bonne lettre")

                bonMot.push(e.key)
                document.querySelector(`.letter-placeholder:nth-child(${i+1})`).textContent = e.key
                //return
            }
        }
        
        console.log(`liste avec les bonnes lettres ${bonMot}`)
        console.log(`longueur du mot choisi ${motChoisi.length}`)
    }
    
    if (motChoisi.length === bonMot.length) {
        alert(`Bravo ! Le bon mot était bien ${motChoisi}`)
    }  
    })
//document.querySelector(".letter-placeholder:first-child").textContent = "b"


// && !controleLettres.has(e.key)