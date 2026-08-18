export const showMessage = (text) => {
  const message = document.createElement('div');

  message.className = 'message';

  message.innerHTML = `
    <div class="message__content" role="dialog" aria-modal="true">
      <button
        class="message__close"
        type="button"
        aria-label="Закрыть сообщение"
      >
        ×
      </button>

      <p class="message__text">${text}</p>
    </div>
  `;

  document.body.append(message);

  message.addEventListener('click', (event) => {
    if (
      event.target === message ||
      event.target.closest('.message__close')
    ) {
      message.remove();
    }
  });
};