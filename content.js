const phraseMap = {
  "RequestMeta-Level_type_level": [
    "Вашему личному ФСБшнику не нравится, что вы ищете",
    "Вы под наблюдением — улыбайтесь!",
    "Не забывай, что Интернет — это не анонимно",
    "СОРМ-3 не дремлет",
    "Штраф 5000 руб отправлен в Госуслуги",
    "Запрос записан. Ожидайте визит вежливых людей",
    "Статус иноагента где-то недалеко",
    "Ошибка: свобода слова не найдена"
    "Вы уже в списке — поздравляем!",
    "Захотел стать экстремистом?",
  ],
  "RequestMeta-Level_type_antispam": [
    "Мы за тобой уже выехали",
    "Извините, вы слишком много знаете",
    "Запрещённый контент обнаружен. Наслаждайся пропагандой!",
    "Если бы ты знал, что мы думаем о твоих поисках...",
    "Некоторые ссылки были удалены... вместе с их авторами",
    "Ты правда думал найти это здесь?",
  ]
};

function replaceMessages() {
  Object.entries(phraseMap).forEach(([selectorClass, phrases]) => {
    document.querySelectorAll(`.${selectorClass}`).forEach(el => {
      const msg = el.querySelector(".RequestMeta-Message");
      if (msg && !msg.dataset.modified) {
        const newText = phrases[Math.floor(Math.random() * phrases.length)];
        msg.textContent = newText;
        msg.dataset.modified = "true"; // защищаем от повторной замены
      }
    });
  });
}

// Один раз при загрузке
replaceMessages();

// Обновление при изменении DOM
const observer = new MutationObserver(mutations => {
  let shouldUpdate = false;
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      shouldUpdate = true;
      break;
    }
  }
  if (shouldUpdate) {
    replaceMessages();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
