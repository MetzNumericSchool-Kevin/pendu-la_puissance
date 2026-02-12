let jeuTermine = false
const motsADeviner = ["lapin", "chat", "chien", "loup", "tortue"]
const motChoisi = motsADeviner[Math.round(Math.random()*4)]

const zonePlaceholder = document.querySelector("#word-display")
const zoneEssais = document.querySelector("#letters-used")
const lettersUsed = document.querySelector("#letters-used")

const controleLettres = new Set()
const bonMot = []
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

let erreur = 0
let victoires = parseInt(window.localStorage.getItem("chaineVictoires") || 0)
console.log(`valeur de victoire : ${victoires}`)
let record = parseInt(window.localStorage.getItem("record") || 0)
console.log(`valeur de record : ${record}`)


for (let i = 0; i < motChoisi.length; i++){
    const newPlaceholder =  document.createElement('span')
    zonePlaceholder.appendChild(newPlaceholder)
    newPlaceholder.classList.add('letter-placeholder')
    console.log(i)      
}

document.querySelector("#record").textContent = window.localStorage.getItem("record")

addEventListener('keydown', function(e){
    if (jeuTermine) {
        return
    }
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
            zoneEssais.querySelector("span:last-child").classList.add("rouge")
            erreur += 1
            document.querySelector(`#hangman>g:nth-child(${erreur+1})`).classList.remove('hidden')
            document.querySelector("#errors").textContent = `${erreur}/5`
        }
        else{
            zoneEssais.querySelector("span:last-child").classList.add("vert")
        }
        
        if (erreur >= 5){
            jeuTermine = true
            document.querySelector("#game-over-modal  p").textContent = `Vous avez perdu, le bon mot était ${motChoisi}...`
            document.querySelector("#game-over-modal").showModal()
            window.localStorage.setItem("chaineVictoires", 0)
            console.log(`valeur de victoire : ${victoires}`)
        }
        
        for (let i = 0; i < motChoisi.length; i++){
            if (e.key == motChoisi[i] ) {
                //zoneEssais.querySelector("span:last-child").classList.add("vert")
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
            jeuTermine = true
            document.querySelector("#game-over-modal  p").textContent = `Bravo ! le mot à deviner était bien ${motChoisi} ! 👏`
            document.querySelector("#game-over-modal").showModal()
            victoires += 1
            console.log(`valeur de victoire : ${victoires}`)
            window.localStorage.setItem("chaineVictoires", victoires)
            if (victoires > record){
                record = victoires
                window.localStorage.setItem("record", record)
            }
    }  
    })

document.querySelector("dialog button").addEventListener("click", () => {
    window.location.reload()
 } )

document.querySelector("#new-game").addEventListener("click", () => {
    window.location.reload()
 } )

 document.querySelector("#reset").addEventListener("click", () => {
    window.localStorage.setItem("chaineVictoires", 0)
    window.localStorage.setItem("record", 0)
    victoires = 0
    record = 0
    document.querySelector("#record").textContent = "-"
 } )