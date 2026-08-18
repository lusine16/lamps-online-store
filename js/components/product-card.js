const formatPrice = (price) => price.toLocaleString('ru-RU');

const getImagePath = (image) => image.replace('../', '');

export const createProductCardContent = (
  product,
  modifier = ''
) => {
  return `
    <div class="product-card ${modifier}">
      <div class="product-card__visual">
        <img
          class="product-card__img"
          src="${getImagePath(product.image)}"
          height="436"
          width="290"
          alt="Изображение товара"
        >
        <div class="product-card__more">
          <button
            class="product-card__link btn btn--icon"
            type="button"
            data-id="${product.id}"
          >
            <span class="btn__text">В корзину</span>
          </button>

          <a href="#" class="product-card__link btn btn--secondary">
            <span class="btn__text">Подробнее</span>
          </a>
        </div>
      </div>

      <div class="product-card__info">
        <h2 class="product-card__title">${product.name}</h2>

        <span class="product-card__old">
          <span class="product-card__old-number">
            ${formatPrice(product.price.old)}
          </span>
          <span class="product-card__old-add">₽</span>
        </span>

        <span class="product-card__price">
          <span class="product-card__price-number">
            ${formatPrice(product.price.new)}
          </span>
          <span class="product-card__price-add">₽</span>
        </span>
      </div>
    </div>
  `;
};

export const createProductCard = (product) => {
  return `
    <li class="catalog__item">
      ${createProductCardContent(product)}
    </li>
  `;
};