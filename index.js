
const app = document.getElementById('teddy')
const container = document.createElement('section')
container.setAttribute('class', 'container')
app.appendChild(container)
const getobj = async function() {
  let response = await fetch('http://localhost:3000/api/teddies')
  let data = await response.json()
  for(let i = 0; i < data.length; i++){
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
    priceNumber.textContent = `${data[i].price}€`
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
  
  
  /*const addToCartBtn = document.getElementsByClassName('addToCart')
  let items = [];
  for(let i=0; i<addToCartBtn.length; i++){
    addToCartBtn[i].addEventListener("click", function(e){
     
      if(typeof(Storage) !== 'undefined'){
        let item = {
          id:data[i]._id,
          name:e.target.parentElement.children[1].textContent,
          price:e.target.parentElement.children[3].textContent,
          no:1,
        }
        if(JSON.parse(localStorage.getItem('items')) === null){
          items.push(item);
          localStorage.setItem("items",JSON.stringify(items))
          
          window.location.reload()
        }else{
          const localItems = JSON.parse(localStorage.getItem("items"))
          localItems.map(data=>{
            if(item.id == data.id){
              item.no = data.no + 1
              item.price = item.price * item.no 
            }else{
              items.push(data)
            }
          })
          items.push(item)
          
          localStorage.setItem('items', JSON.stringify(items))
          window.location.reload()
          } 
      }else{
				alert('local storage is not working on your browser');
			}
    })
  }*/

  const numberItems = document.querySelector('.nb')
  
  let no = 0
  JSON.parse(localStorage.getItem('items')).map(data=> {
    no = no+data.no
  })
  
  numberItems.innerHTML = no
}
getobj()

