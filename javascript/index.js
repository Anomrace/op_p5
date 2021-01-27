// Récupération balise id Teddy pour afficher un élément container comprenant les donnés de l'application
const app = document.getElementById('teddy')
const container = document.createElement('section')
container.setAttribute('class', 'container')
app.appendChild(container)

// appel vers le serveur pour récuperer et afficher les données 
const getobj = async function () {
  let response = await fetch('http://localhost:3000/api/teddies')
  let data = await response.json()
  // création d'une boucle pour afficher les données renvoyées par le serveur
  for (let i = 0; i < data.length; i++) {

    let card = document.createElement('article')
    card.setAttribute('class', 'nounours' + i)

    let h2 = document.createElement('h2')
    h2.textContent = data[i].name
    h2.setAttribute('class', 'nounours_titre')

    let img = document.createElement('img')
    img.src = data[i].imageUrl

    let priceText = document.createElement('p')
    priceText.textContent = 'Prix'

    let priceNumber = document.createElement('p')
    priceNumber.textContent = `${data[i].price/100}€`

    let EnSavoirPlus = document.createElement('a')
    EnSavoirPlus.textContent = 'description'
    EnSavoirPlus.href = `produit.html?id=${data[i]._id}`

    container.appendChild(card)

    card.appendChild(img)

    card.appendChild(h2)

    card.appendChild(priceText)

    card.appendChild(priceNumber)

    card.appendChild(EnSavoirPlus)

  }





}

getobj()
// modifie le numéro du panier
const numberItems = document.querySelector('.nb')

let no = 0
if (JSON.parse(localStorage.getItem('items')) !== null) {
  JSON.parse(localStorage.getItem('items')).map(data => {
    no = no + data.no
    numberItems.innerHTML = no
  })
}