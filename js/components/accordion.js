export const initAccordion = () => {
  const accordionButtons = document.querySelectorAll('.accordion__btn');

  accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const wasActive = button.classList.contains(
        'accordion__btn--active'
      );

      accordionButtons.forEach((item) => {
        item.classList.remove('accordion__btn--active');
      });

      if (!wasActive) {
        button.classList.add('accordion__btn--active');
      }
    });
  });
};