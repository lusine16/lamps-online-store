import { createProductCardContent } from './product-card.js';

export const initSlider = (products) => {
  const slider = document.querySelector('.day-products__slider');
  const sliderList = document.querySelector('.day-products__list');

  const nextButton = document.querySelector(
    '.day-products__navigation-btn--next'
  );
  const prevButton = document.querySelector(
    '.day-products__navigation-btn--prev'
  );

  const goodsOfDay = products.filter((product) => {
    return product.goodsOfDay;
  });

  sliderList.innerHTML = '';

  goodsOfDay.forEach((product) => {
    sliderList.insertAdjacentHTML(
      'beforeend',
      `
        <li class="day-products__item swiper-slide">
          ${createProductCardContent(product, 'product-card--small')}
        </li>
      `
    );
  });

  prevButton.removeAttribute('disabled');

  new Swiper(slider, {
    slidesPerView: 4,
    spaceBetween: 20,

    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
  });
};