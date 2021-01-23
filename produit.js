// basiquement la même page mais pour 1 seul produit 
const app = document.getElementById('teddy')
const container = document.createElement('main')
container.setAttribute('class', 'container')

app.appendChild(container)
// on recherche l'élément id contenu dans l'url
const params = new URLSearchParams(window.location.search)
let i = params.get('id')

const getobj = async function () {
  let response = await fetch('http://localhost:3000/api/teddies/' + i)
  let data = await response.json()

  let card = document.createElement('article')
  card.setAttribute('class', 'nounours')

  let h2 = document.createElement('h2')
  h2.textContent = data.name
  h2.setAttribute('class', 'nounours_titre')

  let img = document.createElement('img')
  img.src = data.imageUrl

  let p = document.createElement('p')
  p.textContent = data.price

  let desc = document.createElement('p')
  desc.textContent = data.description
  // ajout de l'affichage d'un bouton pour ajouer au panier 
  let AjouterAuPanier = document.createElement('button')
  AjouterAuPanier.setAttribute('class', 'addToCart')
  AjouterAuPanier.textContent = 'Ajouter au panier'

  let select = document.createElement('select')
  select.setAttribute('id', 'colors')
  document.body.appendChild(select)

  let titrecouleur = document.createElement('p')
  titrecouleur.textContent = 'choisissez une couleur'
  
  // création de la bande déroulante pour le choix du produit 
  for (let z = 0; z < data.colors.length; z++) {
    let option = document.createElement('option')
    option.setAttribute('value', data.colors[z])
    let color = document.createTextNode(data.colors[z])
    option.appendChild(color)
    document.getElementById('colors').appendChild(option)
  }
// affichage
  container.appendChild(card)
  card.appendChild(img)
  card.appendChild(h2)
  card.appendChild(p)
  card.appendChild(desc)
  card.appendChild(titrecouleur)
  card.appendChild(select)
  card.appendChild(AjouterAuPanier)

// création de la fonctionnalité du bouton pour l'ajout au panier 
  const addToCartBtn = document.getElementsByClassName('addToCart')
  // tableau vide 
  let items = [];
  // création d'une foncationalité portable sur plusieurs produits si l'on veut par exemple ajouter des bouton de manière dynamique
  for (let i = 0; i < addToCartBtn.length; i++) {
    addToCartBtn[i].addEventListener("click", function (e) {

      if (typeof (Storage) !== 'undefined') {
        // on définie ce qu'il y a dans le tableau
        let item = {
          id: data._id,
          img: e.target.parentElement.children[0].src,
          name: e.target.parentElement.children[1].textContent,
          price: e.target.parentElement.children[2].textContent,
          color: e.target.parentElement.children[5].value,
          no: 1,
        }
        // on rentre les données s'il n'y a rien
        if (JSON.parse(localStorage.getItem('items')) === null) {
          items.push(item);
          localStorage.setItem("items", JSON.stringify(items))
          window.location.reload()
        } else {
          // sinon on vérifie ce qu'il s'y trouve et on ajoute en conséquence
          const localItems = JSON.parse(localStorage.getItem("items"))
          localItems.map(data => {
            if (item.id == data.id && item.color == data.color) {
              item.no = data.no + 1
              item.price = item.price * item.no
            } else {
              items.push(data)
            }
          })
          items.push(item)
          localStorage.setItem('items', JSON.stringify(items))
          window.location.reload()
        }
      } else {
        alert('local storage is not working on your browser');
      }
    })
  } 
  //  même chose que dans l'index
  const numberItems = document.querySelector('.nb')

  let no = 0
  JSON.parse(localStorage.getItem('items')).map(data => {
    no = no + data.no
  })
  numberItems.innerHTML = no

}
getobj()