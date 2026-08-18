export function initLocation() {
    const locationBtn = document.querySelector('.location__city');

    locationBtn.addEventListener('click', () => {
        locationBtn.classList.toggle('location__city--active');
    });

    const cityBtnMoscow = document.querySelector('#Moscow');
    const cityName = document.querySelector('.location__city-name');

    cityBtnMoscow.addEventListener('click', () => {
        cityName.textContent = cityBtnMoscow.textContent;
        locationBtn.classList.remove('location__city--active');
    });

    const cityBtnOrenburg = document.querySelector('#Orenburg');

    cityBtnOrenburg.addEventListener('click', () => {
        cityName.textContent = cityBtnOrenburg.textContent;
        locationBtn.classList.remove('location__city--active');
    });

    const cityBtnSaintPetersburg = document.querySelector('#Saint-Petersburg');

    cityBtnSaintPetersburg.addEventListener('click', () => {
        cityName.textContent = cityBtnSaintPetersburg.textContent;
        locationBtn.classList.remove('location__city--active');
    });
}