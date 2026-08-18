import { initLocation } from "./components/location.js";
import { createProductCard } from "./components/product-card.js";
import { initBasket } from './components/basket.js';
import { initAccordion } from './components/accordion.js';
import { initSlider } from './components/slider.js';
import { initForm } from './components/form.js';


window.addEventListener("DOMContentLoaded", async () => {
  initLocation();
  initAccordion();
  initForm();
  const catalogButton = document.querySelector(".header__catalog-btn");
  const catalogMenu = document.querySelector(".header__catalog");
  const closeButton = document.querySelector(".main-menu__close");

  catalogButton.addEventListener("click", () => {
    catalogMenu.classList.add("main-menu--active");
  });

  closeButton.addEventListener("click", () => {
    catalogMenu.classList.remove("main-menu--active");
  });

  try {
    const response = await fetch("./data/data.json");

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    const products = await response.json();
    initBasket(products);
    initSlider(products);

    console.log(products);
    const catalogList = document.querySelector(".catalog__list");
    const typeInputs = document.querySelectorAll(
      '.custom-checkbox__field[name="type"]',
    );

    typeInputs.forEach((input) => {
      const count = products.filter((product) => {
        return product.type.includes(input.value);
      }).length;

      const countElement = input
        .closest(".custom-checkbox")
        .querySelector(".custom-checkbox__count");

      countElement.textContent = count;
    });

const renderProducts = (items) => {
  catalogList.innerHTML = '';

  items.forEach((product) => {
    catalogList.insertAdjacentHTML(
      'beforeend',
      createProductCard(product)
    );
  });
};

const catalogForm = document.querySelector('.catalog-form');

const getFilteredProducts = () => {
  const selectedTypes = [...catalogForm.querySelectorAll(
    'input[name="type"]:checked'
  )].map((input) => input.value);

  const status = catalogForm.elements.status.value;

  return products.filter((product) => {
    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.some((type) => product.type.includes(type));

    const isAvailable = Object.values(product.availability)
      .some((count) => count > 0);

    const matchesStatus =
      status === 'all-item' || isAvailable;

    return matchesType && matchesStatus;
  });
};

const sortSelect = document.querySelector('.catalog__sort-select');

const getSortedProducts = () => {
  const filteredProducts = getFilteredProducts();

  switch (sortSelect.value) {
    case 'price-max':
      return filteredProducts.sort(
        (firstProduct, secondProduct) =>
          secondProduct.price.new - firstProduct.price.new
      );

    case 'rating-max':
      return filteredProducts.sort(
        (firstProduct, secondProduct) =>
          secondProduct.rating - firstProduct.rating
      );

    case 'price-min':
    default:
      return filteredProducts.sort(
        (firstProduct, secondProduct) =>
          firstProduct.price.new - secondProduct.price.new
      );
  }
};

const productsPerPage = 6;
let currentPage = 1;

const pagination = document.querySelector('.catalog__pagination');

const renderPagination = (totalPages) => {
  pagination.innerHTML = '';
  pagination.hidden = totalPages <= 1;

  for (let page = 1; page <= totalPages; page += 1) {
    const activeClass =
      page === currentPage ? ' catalog__pagination-link--active' : '';

    pagination.insertAdjacentHTML(
      'beforeend',
      `
        <li class="catalog__pagination-item">
          <button
            class="catalog__pagination-link${activeClass}"
            type="button"
            data-page="${page}"
          >
            ${page}
          </button>
        </li>
      `
    );
  }
};

const renderCatalog = () => {
  const sortedProducts = getSortedProducts();

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;

  renderProducts(sortedProducts.slice(start, end));

  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  renderPagination(totalPages);
};

renderCatalog();

catalogForm.addEventListener('change', () => {
  currentPage = 1;
  renderCatalog();
});

catalogForm.addEventListener('reset', () => {
  setTimeout(() => {
    currentPage = 1;
    renderCatalog();
  });
});

sortSelect.addEventListener('change', () => {
  currentPage = 1;
 renderCatalog();
});

pagination.addEventListener('click', (event) => {
  const pageButton = event.target.closest('[data-page]');

  if (!pageButton) {
    return;
  }

  currentPage = Number(pageButton.dataset.page);
  renderCatalog();
});


  } catch (error) {
    console.error(error);
  }
});
