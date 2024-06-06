const myCarouselElement = document.querySelector("#carouselExampleSlidesOnly");

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 4000,
  touch: false,
  pause: false,
  keyboard: true,
});
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

const products = [
  {
    title: "Gloves",
    price: 20,
    imgSrc: "./images/gloves.png",
    quantity: 1,
    inCart: false,
    index: 0,
    description:
      "Crafted for comfort and durability, these gloves are made from high-quality leather that conforms to your hands over time. Perfect for both casual wear and specialized tasks, they offer a snug fit and enhanced grip, ensuring protection and dexterity.",
  },
  {
    title: "Shoes",
    price: 100,
    imgSrc: "./images/shoes.png",
    quantity: 1,
    inCart: false,
    index: 1,
    description:
      "Step into style with these classic shoes, designed with both aesthetics and functionality in mind. The cushioned insole provides all-day comfort, while the sturdy outsole ensures reliable traction. A perfect blend of fashion and practicality for the discerning customer.",
  },
  {
    title: "Outfit",
    price: 40,
    imgSrc: "./images/outfit.png",
    quantity: 1,
    inCart: false,
    index: 2,
    description:
      "This complete outfit is the epitome of coordinated style. Comprising a matching set that takes the guesswork out of dressing up, it’s tailored to provide a polished look for any event. The high-quality materials ensure longevity and ease of care.",
  },
  {
    title: "Dress",
    price: 55,
    imgSrc: "./images/dress.png",
    quantity: 1,
    inCart: false,
    index: 3,
    description:
      "This elegant dress features a timeless silhouette with a modern twist. The breathable fabric drapes beautifully, creating a flattering fit for all body types. Its versatile design makes it suitable for various occasions, from a day at the office to an evening out.",
  },
  {
    title: "T-shirt",
    price: 15,
    imgSrc: "./images/tshirt.png",
    quantity: 1,
    inCart: false,
    index: 4,
    description:
      "Our t-shirt is the ultimate staple for any wardrobe. Made from soft, sustainable cotton, it offers breathability and comfort. The classic cut ensures a great fit, while the vibrant colors remain bright wash after wash. Ideal for casual outings or layering under a jacket.",
  },
];

const productsSection = document.querySelector("#products .row");
products.forEach((product) => {
  productsSection.innerHTML += `
  <div class="card" style="width: 18rem">
    <img data-bs-toggle="modal" data-bs-target="#exampleModal${product.index}"
      src="${product.imgSrc}"
      class="card-img-top"
      alt="${product.title}"
    />
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.price}$</p>
    <div
      class="d-flex gap-2 justify-content-center align-items-end"
    >
      <button class="add-to-cart-btn btn btn-primary me-4" >
        Add to Cart
      </button>
      <button class="minus btn btn-secondary p-1 rounded-5">
        <i class="bi bi-dash"></i>
      </button>
      <input type="text" value="${product.quantity}" disabled class="product-quantity" />
      <button class="plus btn btn-secondary p-1 rounded-5">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
  </div>
</div>

<div class="modal fade p-0" id="exampleModal${product.index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-fullscreen-md-down">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg d-flex justify-content-center">
            <img src="${product.imgSrc}" alt="${product.title}" class="img-fluid">
          </div>
          <div class="col">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${product.title}</h1>
            <p class="text-secondary mb-3">${product.price}$</p>
            <p>${product.description}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>
    `;
});
const plus = document.querySelectorAll(".plus");
const minus = document.querySelectorAll(".minus");
const productQuantity = document.querySelectorAll(".product-quantity");
const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
let cart = [];
const cartContainer = document.querySelector("#cart-container");
const cartBadge = document.querySelector(".badge");
let deleteAllBtn = document.querySelector("#delete-all-btn");
let removeFromCartBtn = document.querySelectorAll(".remove-from-cart");

for (let i = 0; i < products.length; i++) {
  plus[i].addEventListener("click", () => {
    if (products[i].quantity === 10) return;
    products[i].quantity++;
    productQuantity[i].value = products[i].quantity;
  });
  minus[i].addEventListener("click", () => {
    if (products[i].quantity === 1) return;
    products[i].quantity--;
    productQuantity[i].value = products[i].quantity;
  });
  addToCartBtn[i].addEventListener("click", () => {
    products[i].inCart = true;
    addToCartBtn[i].disabled = products[i].inCart;
    plus[i].disabled = products[i].inCart;
    minus[i].disabled = products[i].inCart;
    addToCartBtn[i].innerHTML = `Added <i class="bi bi-cart"></i>`;

    cart.push(products[i]);
    addToCart();
  });
}

function addToCart() {
  let total = 0;
  cartContainer.innerHTML = "";
  for (let product of cart) {
    cartContainer.innerHTML += `
  <div class="row align-items-center">
  <div class="col-3 me-2">
    <img
      src="${product.imgSrc}"
      alt="${product.title}"
      class="img-fluid img-cart"
    />
  </div>
  <div class="col">
    <div><b>Product</b></div>
    <div>${product.title}</div>
  </div>
  <div class="col">
    <div><b>Price</b></div>
    <div>${product.price}$</div>
  </div>
  <div class="col">
    <div><b>Quantity</b></div>
    <div>${product.quantity}</div>
  </div>
  <div class="col d-flex justify-content-end">
    <button class="remove-from-cart btn btn-danger"><i class="bi bi-trash3"></i></button>
  </div>
</div>
<li><hr class="dropdown-divider" /></li>
  `;
    removeFromCartBtn = document.querySelectorAll(".remove-from-cart");
    total += product.price * product.quantity;
    cartBadge.innerText = cart.length;
    cartBadge.classList.remove("d-none");
  }
  updateEvent();
  const section = document.createElement("section");
  cartContainer.appendChild(section);
  section.innerHTML = `
<div class="d-flex justify-content-between align-items-center">
<b>Total: ${total}$</b>
<div>
<button class="btn btn-danger" id="delete-all-btn">Delete All</button>
<button class="btn btn-primary">Buy</button>
</div>
</div>

`;
  deleteAllBtn = document.querySelector("#delete-all-btn");
  deleteAllBtn.addEventListener("click", () => {
    cart.forEach((product) => {
      addToCartBtn[product.index].disabled = false;
      addToCartBtn[product.index].innerHTML = "Add to Cart";
      plus[product.index].disabled = false;
      minus[product.index].disabled = false;
    });
    cart = [];
    addToCart();
    emptyCart();
  });
}
function updateEvent() {
  for (let i = 0; i < cart.length; i++) {
    removeFromCartBtn[i].addEventListener("click", () => {
      removeFromCart(i);
    });
  }
}
function removeFromCart(i) {
  const removedProduct = products.find((product) => {
    return product.title === cart[i].title;
  });
  removedProduct.inCart = false;
  addToCartBtn[removedProduct.index].disabled =
    products[removedProduct.index].inCart;
  plus[removedProduct.index].disabled = products[removedProduct.index].inCart;
  minus[removedProduct.index].disabled = products[removedProduct.index].inCart;
  addToCartBtn[removedProduct.index].innerHTML = "Add to Cart";
  cart.splice(i, 1);
  addToCart();
  emptyCart();
}

function emptyCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `<span class="opacity-75">No Products</span>`;
    cartBadge.classList.add("d-none");
  }
}