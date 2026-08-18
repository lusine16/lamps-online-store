import { showMessage } from './message.js';

export const initForm = () => {
  const form = document.querySelector('.questions__form');

  const validation = new JustValidate(form);

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимум 3 символа',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимум 20 символов',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите почту',
      },
      {
        rule: 'email',
        errorMessage: 'Введите корректный email',
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Подтвердите согласие на обработку данных',
      },
    ]).onSuccess(async () => {
      const submitButton = form.querySelector('[type="submit"]');

      submitButton.disabled = true;

      try {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: new FormData(form),
        });

        if (!response.ok) {
          throw new Error('Не удалось отправить форму');
        }

        showMessage('Заявка успешно отправлена!');
        form.reset();
      } catch (error) {
        console.error(error);
        showMessage('Не удалось отправить заявку. Попробуйте ещё раз.');
      } finally {
        submitButton.disabled = false;
      }
    });
};