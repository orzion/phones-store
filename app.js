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
const mainIndex2 = document.querySelector('.main-index');

const cartContainerPage = document.querySelector('.cart-main');

const slides = document.querySelectorAll('.slides img');
let slideIndex =0;
let intervalId = null;

/*const containproductssort = document.querySelector('.contain-products-sort-check');
let filterArr = [];
if(containproductssort!==null){
  productHtml.innerHTML = '';
  fetch('./products.json')
  .then(res=>res.json())
  .then(data=>{
    filterArr =data;
    renderProducts(filterArr , productHtml);
  })
}

function renderProducts(products , container){
        productHtml.innerHTML = '';

        products.forEach(product => {
            createNewProduct(product);
        });

    }
    //הסינון
    if(containproductssort!==null){
      checkbox.forEach(check =>{
        check.addEventListener('change' , () =>{

            const selectSort = Array.from(checkbox)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

            if(selectSort.length > 0){
                const filtered = filterArr.filter(product => selectSort.includes(product.brand) || selectSort.includes(product.storege));
                renderProducts(filtered , productHtml);
            } 
            else{
                renderProducts(filterArr , productHtml);
            }
        });
    });
    }*/

const loginConteiner = document.querySelector('#login-conteiner');


if(loginConteiner!==null){
const loginForm = document.getElementById('login-container');
const welcomeContainer = document.getElementById('welcome-container');
const userNameSpan = document.getElementById('userName');
const profileImage = document.getElementById('profileImage');
const logoutBtn = document.getElementById('logoutBtn');

let users = [];

window.onload = async () => {
  // Check if user is already logged in
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (storedUser) {
    showWelcome(storedUser);
  }

  try {
    const response = await fetch('users.json');
    if (!response.ok) throw new Error('Failed to load users.json');
    users = await response.json();
  } catch (error) {
    alert('Error loading users.json. Are you running on localhost?');
    console.error(error);
  }
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    showWelcome(user);
  } else {
    alert("Invalid email or password.");
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  welcomeContainer.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

function showWelcome(user) {
  userNameSpan.textContent = `${user.firstName} ${user.lastName}`;
  profileImage.src = user.imageProfile;
  loginForm.classList.add('hidden');
  welcomeContainer.classList.remove('hidden');
}

}


const containproductssort = document.querySelector('.contain-products-sort-check');
const checkbox = document.querySelectorAll('input[type="checkbox"]');
const productHtml = document.querySelector('#products');
let filterArr = [];

if (containproductssort !== null) {
  const clearBtn = document.querySelector('.clear-filters'); 
  const params = new URLSearchParams(window.location.search);
  const selectedFilters = params.get('filters') ? params.get('filters').split(',') : [];

  fetch('./products.json')
    .then(res => res.json())
    .then(data => {
      filterArr = data;

      checkbox.forEach(ch => {
        if (selectedFilters.includes(ch.value)) ch.checked = true;
      });

      applyFilter();

      checkbox.forEach(check => {
        check.addEventListener('change', () => {
          updateURL();
          applyFilter();
        });
      });

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          checkbox.forEach(ch => ch.checked = false);
          updateURL(true);
          applyFilter();
        });
      }

      function applyFilter() {
        const checkedValues = Array.from(checkbox)
          .filter(c => c.checked)
          .map(c => c.value);

        let filtered = filterArr;
        if (checkedValues.length > 0) {
          filtered = filterArr.filter(product =>
            checkedValues.includes(product.brand) ||
            checkedValues.includes(product.storege)
          );
        }

        renderProducts(filtered, productHtml);

        if (clearBtn) {
          clearBtn.style.display = checkedValues.length > 0 ? 'block' : 'none';
        }
      }

      function updateURL(clear = false) {
        const params = new URLSearchParams();

        if (!clear) {
          const checkedValues = Array.from(checkbox)
            .filter(c => c.checked)
            .map(c => c.value);

          if (checkedValues.length > 0) {
            params.set('filters', checkedValues.join(','));
          }
        }

        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.replaceState({}, '', newUrl);
      }
    });
}

function renderProducts(products, container) {
  container.innerHTML = '';
  products.forEach(product => {
    createNewProduct(product);
  });
}

if(mainIndex2!==null){
  document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slides img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let slideIndex = 0;
  let intervalId = null;

  if (slides.length > 0) {
    slides[slideIndex].classList.add('displaySlide');
    intervalId = setInterval(nextSlide, 5000);
  }

  function showSlide(index) {
    if (index >= slides.length) {
      index = 0;
    } else if (index < 0) {
      index = slides.length - 1;
    }

    slides.forEach(slide => {
      slide.classList.remove('displaySlide');
    });
    slides[index].classList.add('displaySlide');
    slideIndex = index;
  }

  function nextSlide() {
    showSlide(slideIndex + 1);
  }

  function prevSlide() {
    clearInterval(intervalId);
    showSlide(slideIndex - 1);
  }

  // חיבור כפתורים לפונקציות
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
});

}
let rootElement = document.documentElement;



let mainIndex = document.querySelector('.main-index');

if(document.querySelector('.back-to-top')!==null){
  document.querySelector('.back-to-top').addEventListener('click',(e)=>{
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
});

  document.addEventListener('scroll',(e)=>{
  if(rootElement.scrollTop>(rootElement.clientHeight/2)){
    document.querySelector('.back-to-top').classList.add('active');
  }
  else{
    document.querySelector('.back-to-top').classList.remove('active');
  }
});
}

let sherchInput = document.querySelector('#search-input');

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
  if(type === 'smallet_price'){
    return products.sort((a,b)=>{
      return a.price  - b.price;
    })
  }
  else if(type === 'bigest_price'){
    return products.sort((a,b)=>{
      return b.price -a.price;
    })
  }
  else if(type === 'select_sort')
    return products.sort((a,b)=>{
      return b.id-a.id;
    })

  else if(type ==='poplarty'){
    return products.sort((a,b)=>{
      return b.poplarty -a.poplarty;
    })
  }

  
}

let products;

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
let newSherchArr;
if(mainIndex!==null)
  sherching(sherchInput);

function createNewProduct(product){
    let newDiv = document.createElement('div');
    newDiv.classList.add('prodact');
    newDiv.dataset.brand =product.brand;

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

function sherching(input){
  input.addEventListener('input',e=>{

    document.querySelector('.resultes').innerHTML = "";
    
    if(e.target.value.length >=2){

      newSherchArr = products.filter(item=>item.title.toUpperCase().includes(e.target.value.toUpperCase()));

      newSherchArr.forEach(item=>{

        const newLink = document.createElement('a');
        newLink.href = `product.html?productId=${item.id}`;
        newLink.classList.add('contians-sherch-res');

        const newImage = document.createElement('img');
        newImage.src = item.image;
        newImage.classList.add('sherch-images');

        const newTitle = document.createElement('p');
        newTitle.textContent = item.title;
        newTitle.classList.add('sherch-res-text');

        newLink.append(newTitle,newImage);
        const resultes = document.querySelector('.resultes');
        resultes.append(newLink);
      })
    }
  })
  
}