const productContainer = document.querySelector("#product-container");
const categorySelect = document.querySelector("#category-select");
const productDetail = document.querySelector("#product-detail");
fetch("https://dummyjson.com/products")
  .then((response) => {
    return response.json();
  })

  .then((data) => {
    const productCategories = data.products.reduce(
      (categories, product) =>
        categories.includes(product.category)
          ? categories
          : [...categories, product.category],
      ["all"]
    );

    categorySelect.innerHTML = productCategories.reduce(
      (markup, category) =>
        markup + `<option value="${category}">${category}</option>`,
      ``
    );

    updateProductContainerUI(data.products);

    categorySelect.addEventListener("change", (event) => {
      const filteredProducts = data.products.filter(
        (product) =>
          product.category === event.target.value ||
          event.target.value === "all"
      );
      // Update UI
      updateProductContainerUI(filteredProducts);
    });

    const infoButtons = document.querySelectorAll(".info-btn");
    infoButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const product = data.products.find(
          (product) => product.id === Number(event.target.dataset.id)
        );

        productDetail.innerHTML =  generateProductDetailMarkup(product)
      });
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

function generateProductMarkup(product) {
  return `<div class="col-12 col-md-6 col-xl-3">
    <div class="card">
      <img
        src="${product.thumbnail}"
        class="card-img-top"
        alt="${product.title}"
      />
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text truncate-truncate line-clamp-2">
          ${product.description}
        </p>
        <button class="btn btn-primary w-100 info-btn" data-id="${product.id}">Show Info </button>
      </div>
    </div>
  </div>`;
}

function updateProductContainerUI(products) {
  productContainer.innerHTML = products.reduce(
    (markup, product) => markup + generateProductMarkup(product),
    ``
  );
}

function generateProductDetailMarkup(product) {
  return `        <!-- PRODUCT-IMAGES -->

    <div class="col-12 col-lg-6">
      <div class="row mb-3">
        <img
          src="${product.thumbnail}"
          alt=""
          class="product-thumbnail"
        />
      </div>
      <div class="row product-images">
      ${product.images.slice(0,3).reduce ( (markup, image) => {
        return markup + `  <div class="col-4">
        <img
          src="${image}"
          alt=""
          class="product-img"
        />
      </div>`
      }  , ``  )}
      

      </div>
    </div>

    <!-- PRODUCT INFO -->
    <div class="col-12 col-lg-6">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <h4>${product.price}</h4>
        <p>Rating:  <strong>${product.rating}</strong> </p>
    </div>`;
}
