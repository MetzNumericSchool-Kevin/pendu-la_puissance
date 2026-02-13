//initialisation des variables et constantes :

let jeuTermine = false
const motsADeviner = ["lapin", "chat", "chien", "loup", "tortue"] // on doit trouver un moyen de mieux randomiser les mots lol
const motChoisi = motsADeviner[Math.round(Math.random()*4)]

const zonePlaceholder = document.querySelector("#word-display")
const zoneEssais = document.querySelector("#letters-used")
const lettersUsed = document.querySelector("#letters-used")

const controleLettres = new Set()
const bonMot = []
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] // on pourrait essayer de faire mieux mdr

// ici utilisation de localStorage pour garder en mémoire le nombre de victoires d'affilée + le record plus grand nombre de victoires d'affilée
let erreur = 0
let victoires = parseInt(window.localStorage.getItem("chaineVictoires") || 0)
console.log(`valeur de victoire : ${victoires}`)
let record = parseInt(window.localStorage.getItem("record") || 0)
console.log(`valeur de record : ${record}`)

// boucle qui va générer le nombre de placeholders en fonction du nombre de lettre dans le mot choisi

for (let i = 0; i < motChoisi.length; i++){
    const newPlaceholder =  document.createElement('span')
    zonePlaceholder.appendChild(newPlaceholder)
    newPlaceholder.classList.add('letter-placeholder')
    console.log(i)      
}

// apparition de la valeur de record : soit 0 au tout début ou quand on reset de record, ou alors la valeur prise au cours des parties jouées
// document.querySelector("#record").textContent = window.localStorage.getItem("record")
document.querySelector("#record").textContent = record

// écouteur d'évènement focalisé sur la saisie sur clavier
addEventListener('keydown', function(e){
    if (jeuTermine) { // pour cesser l'écoute du clavier quand une partie est terminée
        return
    }
    console.log(motChoisi)
    if (alphabet.indexOf(e.key) != -1){ // vérifie que la saisie est une lettre de l'alphabet, on ne prend pas les caractères spéciaux en compte
        if (controleLettres.has(e.key)){ // vérifie que la lettre n'a pas déjà été proposée
            alert(`Tu as déjà saisi la lettre "${e.key}" ! ☝️`)
            console.log("lettre déjà saisie")
            return
        }
        controleLettres.add(e.key) //si elle n'a pas déjà été proposée, elle est ajoutée à un set de controle des lettres saisies
        //console.log(controleLettres) -- c'était pour controler l'entrée dans la condition
        
        const newEssai =  document.createElement('span') // on crée un span dans le code html pour la lettre saisie
        zoneEssais.appendChild(newEssai)
    
        zoneEssais.querySelector("span:last-child").innerHTML +=`${e.key}` // on ajoute la lettre dans le span précédemment créé
        if (motChoisi.indexOf(e.key) == -1){ // cas où la lettre n'est pas dans le mot à deviner, la letttre apparait rouge et le compteur d'erreur est incrémenté de 1
            zoneEssais.querySelector("span:last-child").classList.add("rouge")
            erreur += 1
            document.querySelector(`#hangman>g:nth-child(${erreur+1})`).classList.remove('hidden')
            document.querySelector("#errors").textContent = `${erreur}/5`
        }
        else{
            zoneEssais.querySelector("span:last-child").classList.add("vert") // cas où la lettre est dans le mot a deviner, la lettre apparait verte
        }
        
        if (erreur >= 5){ // contrôle du nombre d'erreurs -> si >5 , partie terminée et réinitialisation de la chaine de victoires
            jeuTermine = true
            document.querySelector("#game-over-modal  p").textContent = `Vous avez perdu, le bon mot était ${motChoisi}...`
            document.querySelector("#game-over-modal").showModal()
            window.localStorage.setItem("chaineVictoires", 0)
            console.log(`valeur de victoire : ${victoires}`)
        }
        
        for (let i = 0; i < motChoisi.length; i++){ // pour placer les lettres dans les placeholder si elles sont dans le mot à deviner + controler si on a toutes les lettres
            if (e.key == motChoisi[i] ) {
                bonMot.push(e.key)
                document.querySelector(`.letter-placeholder:nth-child(${i+1})`).textContent = e.key
                //return
            }
        }
        
        //console.log(`liste avec les bonnes lettres ${bonMot}`) -- controle de l'ajout des lettres
    }
    
    if (motChoisi.length === bonMot.length) { // fin de la partie quand le mot est deviné + vérif si on a battu le record
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

document.querySelector("dialog button").addEventListener("click", () => { // si on clique sur bouton de zone de dialogue, reload de la page
    window.location.reload()
 } )

document.querySelector("#new-game").addEventListener("click", () => { // si on clique sur le bouton nouvelle partie, reload de la page
    window.location.reload()
 } )

 document.querySelector("#reset").addEventListener("click", () => { // si on clique sur ce bouton, reset du record pour repartir de 0
    window.localStorage.setItem("chaineVictoires", 0)
    window.localStorage.setItem("record", 0)
    victoires = 0
    record = 0
    document.querySelector("#record").textContent = "-"
 } )


 // test branches git
// test merge franck