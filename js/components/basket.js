const formatPrice = (price) => price.toLocaleString('ru-RU');

export const initBasket = (products) => {
  const basketButton = document.querySelector(
    '.header__user-item:first-child .header__user-btn'
  );
  const basket = document.querySelector('.basket');
  const basketCount = document.querySelector('.header__user-count');
  const basketList = document.querySelector('.basket__list');
  const emptyBlock = document.querySelector('.basket__empty-block');

  const updateBasket = () => {
    const itemsCount = basketList.children.length;

    basketCount.textContent = itemsCount;
    emptyBlock.hidden = itemsCount > 0;
  };

  const createBasketItem = (product) => {
    const imagePath = product.image.replace('../', '');

    return `
      <li class="basket__item">
        <div class="basket__img">
          <img
            src="${imagePath}"
            alt="Фотография товара"
            width="60"
            height="60"
          >
        </div>

        <span class="basket__name">${product.name}</span>

        <span class="basket__price">
          ${formatPrice(product.price.new)} ₽
        </span>

        <button
          class="basket__close"
          type="button"
          aria-label="Удалить товар из корзины"
        >
          <svg width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </li>
    `;
  };

  basketButton.addEventListener('click', () => {
    basket.classList.toggle('basket--active');
  });

  document.addEventListener('click', (event) => {
    const addButton = event.target.closest(
      '.product-card__link[data-id]'
    );

    if (addButton) {
      const productId = Number(addButton.dataset.id);

      const product = products.find((item) => {
        return item.id === productId;
      });

      if (product) {
        basketList.insertAdjacentHTML(
          'beforeend',
          createBasketItem(product)
        );

        updateBasket();
      }

      return;
    }

    const removeButton = event.target.closest('.basket__close');

    if (removeButton) {
      removeButton.closest('.basket__item').remove();
      updateBasket();
    }
  });

  updateBasket();
};