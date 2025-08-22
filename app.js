const params = new URLSearchParams(window.location.search);

let productsContainer = document.querySelector('#products');

const categoryProducts = document.querySelector('#items-cat');

const categoryId = params.get('categoryId');

const productId = params.get('productId');

const containerProdPage = document.querySelector('#main-prod');
const divImages = document.querySelector('.contorl-img');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const btnFavorite = document.querySelector('.favorite');

const favoritesContainer = document.querySelector('#fav-contianer');

const cartContainerPage = document.querySelector('.cart-main');

const slides = document.querySelectorAll('.slides img');
let slideIndex =0;
let intervalId = null;

if(slides!==null)
  document.addEventListener('DOMContentLoaded',initializeSlider);

function initializeSlider(){
  if(slides.length >0){
    slides[slideIndex].classList.add('displaySlide');
    intervalId = setInterval(nextSlide,5000);
  }
}
function showSlide(index){
  if(index >= slides.length){
    index =0;
  }
  else if(index <0){
    index = slides.length -1;
  }

  slides.forEach(slide=>{
    slide.classList.remove('displaySlide');
  });
  slides[index].classList.add('displaySlide');
}

function nextSlide(){
  slideIndex++;
  showSlide(slideIndex);
}
function prevSlide(){
  clearInterval(intervalId);
  slideIndex--;
  showSlide(slideIndex);
}

if(cartContainerPage!==null){
   renderCartPage();
}

if(favoritesContainer!==null){
  if (favorites.length === 0) {
    favoritesContainer.textContent = 'No favorite products yet.';
  } 
  else {
    favorites.forEach(product => {
      createFavoriteCard(product);
    });
  }
}

if(containerProdPage!==null){
  btnFavorite.addEventListener('click', (e) => {
  const productId = btnFavorite.dataset.id;

  fetch('./products.json')
    .then(res => res.json())
    .then(products => {
      products.forEach(product => {
        if (product.id == productId) {
          const exists = favorites.find(item => item.id == product.id);
          if (!exists) {
            btnFavorite.classList.add('favorite-btn-add-color');
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('the product has been added to the favorites');
          } else {
            alert('the product is allredy in favorites');
          }
        }
      });
    });
});
}

if (containerProdPage !== null) {
  fetch('./products.json')
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id === Number(productId));
      if (!product) {
        containerProdPage.textContent = 'Product not found';
        return;
      }

      btnFavorite.dataset.id = product.id;

      newProductPage(product);
    })
    .catch(err => console.error(err));
}

if(categoryProducts !==null){
  fetch('./products.json')
  .then(res => res.json())
  .then(products => {
    const filteredProducts = products.filter(product => product.category === categoryId);

    if (filteredProducts.length === 0) {
      categoryProducts.textContent = 'there are no products in this category or the catgory does not exsists';
      return;
    }

    filteredProducts.forEach(product => {
      createNewProduct(product);
    });
  })
  .catch(err => console.error(err));
}


function OnSort(type,products){
  if(type == 'smallet_price'){
    return products.sort((a,b)=>{
      return a.price  - b.price;
    })
  }
  else if(type == 'bigest_price'){
    return products.sort((a,b)=>{
      return b.price -a.price;
    })
  }
  else if(type == 'select_sort')
    return products.sort((a,b)=>{
      return b.id-a.id;
    })

  
}

let products;

const productHtml = document.querySelector('#products');

document.querySelector('#sort')?.addEventListener('change',(e)=>{
  let type = e.target.value;
  productHtml.innerHTML = '';
  let productsSorted = OnSort(type,products);
  productsSorted.forEach(product=>{
    createNewProduct(product);
  })

})

if(productsContainer!==null){
fetch('./products.json')
.then(res=>res.json())
.then(data=>{
    products = data;
    let productsSorted = OnSort('select_sort',products);
    productsSorted.forEach(product=>{
    createNewProduct(product);
  })
})
.catch(err=> console.error(err));
}

function createNewProduct(product){
    let newDiv = document.createElement('div');
    newDiv.classList.add('prodact');

    let newlink = document.createElement('a');
    newlink.href = `product.html?productId=${product.id}`;
    newlink.classList.add('prodact-link');

    let newTitle = document.createElement('h2');
    newTitle.textContent = product.title;
    newTitle.classList.add('prodact-title');

    let newDiscription = document.createElement('p');
    newDiscription.textContent = product.description;
    newDiscription.classList.add('prodact-iscription');

    let newImageProduct = document.createElement('img');
    newImageProduct.src = product.image;
    newImageProduct.alt = product.alt;
    newImageProduct.classList.add('prodact-img');

    let divPirce = document.createElement('div');
    let newPrice = document.createElement('p');
    newPrice.textContent = `$${product.price}`;
    newPrice.classList.add('prodact-price');
    divPirce.append(newPrice);

    let newDiscountPrice = document.createElement('p');
    let newIsDisscountPrice = document.createElement('p');

    if(product.on_sale){
        divPirce.classList.add('warp-price');
        newDiscountPrice.textContent = `$${product.sale_price}`;
        newDiscountPrice.classList.add('price-on-sale');
        divPirce.append(newDiscountPrice);
        newIsDisscountPrice.textContent = 'on sale';
        newIsDisscountPrice.classList.add('on-sale');
    }
    divPirce.append(newIsDisscountPrice);

    newlink.append(newIsDisscountPrice,newTitle,newImageProduct,newDiscription,divPirce);
    newDiv.append(newlink);
    if(productsContainer !==null)
      document.querySelector('#products').append(newDiv);
    else if(categoryProducts !==null)
      document.querySelector('#items-cat').append(newDiv);
}

function newProductPage(product){
  const productImage = document.createElement('img');
  productImage.src = product.image;
  productImage.alt = product.alt;

  productImage.classList.add('p-img');
  divImages.append(productImage);

  const contiainsTitle = document.querySelector('#contiains-title');
  const newTitle= document.createElement('h2');

  let divPirce = document.createElement('div');
  newTitle.classList.add('prodact-title');
  newTitle.textContent = product.title;
  contiainsTitle.append(newTitle);

  const newProdactPrice = document.createElement('p');
  newProdactPrice.classList.add('prodact-price');
  newProdactPrice.textContent = `$${product.price}`;

  const newDisscountPrice = document.createElement('p');

  if(product.on_sale){
    divPirce.classList.add('warp-price');
    newDisscountPrice.textContent = `$${product.sale_price}`;
    newDisscountPrice.classList.add('price-on-sale');
    divPirce.append(newDisscountPrice);
  }

  divPirce.append(newProdactPrice);
  
  let addToCartBtn = document.createElement('button');
  addToCartBtn.textContent = 'add to cart ';
  addToCartBtn.classList.add('pay-btn');
  addToCartBtn.addEventListener('click', () => {
    addToCart(product);
  });
   
  document.querySelector('.product-warp').append(divPirce,addToCartBtn);

}

function createFavoriteCard(product) {

  let newlink = document.createElement('a');
  newlink.href = `product.html?productId=${product.id}`;
  newlink.classList.add('fav-prod-link');


  const card = document.createElement('div');
  card.classList.add('fav-product');
  card.dataset.id = product.id; 

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.alt;
  image.classList.add('img','fav-prod-img');
  newlink.append(image);


  const title = document.createElement('h2');
  title.textContent = product.title;
  title.classList.add('fav-prod-discription');

  const divPrice = document.createElement('div');

  const price = document.createElement('p');
  price.textContent = `$${product.price}`;
  price.classList.add('prodact-price');

  if (product.on_sale) {
    divPrice.classList.add('warp-price');
    const salePrice = document.createElement('p');
    salePrice.textContent = `$${product.sale_price}`;
    salePrice.classList.add('price-on-sale');
    divPrice.append(price,salePrice);
    card.append(title, newlink,divPrice);
  } 
  else {
    divPrice.append(price);
    card.append(title, newlink,divPrice);
  }

  const addToCartBtn = document.createElement('button');
  addToCartBtn.textContent = 'add to cart';
  addToCartBtn.classList.add('pay-btn');
  addToCartBtn.addEventListener('click', () => {
    addToCart(product);
  });

  card.append(addToCartBtn);

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-fav-prod');
  
  removeBtn.addEventListener('click', () => {
    removeFromFavorites(product.id);
    card.remove();
  });

  card.append(removeBtn);
  favoritesContainer.append(card);
}

function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites = favorites.filter(product => product.id !== Number(id));

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity ++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`"${product.title}" added to cart`);
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(id, change) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    const index = cart.findIndex(i => i.id === id);
    cart.splice(index, 1);
  }

  saveCart(cart);

  cartContainerPage.innerHTML = '';

  renderCartPage();
}

function displayCart() {
    const cart = getCart();
    const container = document.querySelector('.cart-items');
    container.innerHTML = '';

    if (cart.length === 0) {
      container.textContent = ' the cart is empty ';
      return;
    }
}

function renderCartPage() {
  const cart = getCart();

  cart.forEach(item => {
    const price = item.on_sale ? item.sale_price : item.price;
    const total = (price * item.quantity).toFixed(2);

    const div = document.createElement('div');
    div.classList.add('item');
    const details = document.createElement('div');
    details.classList.add('details');

    const newTitle = document.createElement('h2');
    newTitle.textContent = item.title;
    details.append(newTitle);

    const newImage = document.createElement('img');
    newImage.src = item.image;
    newImage.alt = item.alt;
    details.append(newImage);

    const newPrice = document.createElement('p');
    newPrice.textContent = `$${price}`;
    details.append(newPrice);

    const quantityP = document.createElement('p');
    quantityP.textContent = item.quantity;
    details.append(quantityP);

    const totalP = document.createElement('p');
    totalP.textContent = `$${total}`;
    details.append(totalP);

    div.append(details);

    const divActinos = document.createElement('div');
    divActinos.classList.add('actions');
    divActinos.innerHTML = `
      <button onclick="updateQuantity(${item.id}, 1)">➕</button>
      <button onclick="updateQuantity(${item.id}, -1)">➖</button>
    `;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '🗑️ remove';
    removeBtn.classList.add('text-red-600');
    removeBtn.addEventListener('click', () => {
      removeFromCart(item.id);
    });
    divActinos.append(removeBtn);
    div.append(divActinos);
    cartContainerPage.append(div);
  });

  function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  
  cartContainerPage.innerHTML = '';

  renderCartPage();
}

  const totalCart = cart.reduce((sum, item) => {
    const price = item.on_sale ? Number(item.sale_price) : Number(item.price);
    return sum + price * item.quantity;
  }, 0).toFixed(2);

  const totalDiv = document.createElement('div');
  const totalTitle = document.createElement('h2');
  totalTitle.textContent = `total cart: $${totalCart}`;
  totalDiv.append(totalTitle);
  cartContainerPage.append(totalDiv);

  displayCart();
}