import RU_DATEFNS_LOCALE from "date-fns/locale/ru"
import { Locale } from "./_-_"

const RU_RU: Locale = {
  flag: "🇷🇺",
  name: "Русский",
  datefnsLocale: RU_DATEFNS_LOCALE,
  translations: {
    typeHere: "Введите сюда...",
    setup: {
      locale: {
        title: "Добро Пожаловать!",
        text1: "Shifremen позволяет хранить и управлять всеми вашими паролями в одном месте",
        text2: "Выберите язык и нажмите «Далее»",
        next: "Далее",
      },
      choose: {
        title: `Хранилище`,
        descr:
          "Давайте создадим для вас хранилище, для этого нажмите кнопку «Далее». При наличии файла экспорта вы также можете импортировать существующее хранилище",
        import: "Импорт",
        next: "Далее",
        back: "Назад",
      },
      import: {
        title: "Импорт данных",
        descr: "Выберите файл с хранилищем ниже. Если хранилище будет зашифровано, вам потребуется ввести пароль безопасности",
        chooseFile: "Выбрать файл",
        chooseOtherFile: "Выбрать другой файл",
        import: "Импорт",
        back: "Назад",
      },
      create: {
        title: "Мастер-пароль",
        text1:
          "Мастер-пароль - это единственный пароль, который вам нужно запомнить. Убедитесь, что он имеет достаточную длину и надежность",
        text2: "Придумайте пароль, соответствующий требованиям, и нажмите «Далее»",
        reqs: {
          length: min => `Длина не менее ${min} символов`,
          uppers: "Не менее 1 заглавной буквы",
          lowers: "Не менее 1 строчной буквы",
          specials: "Не менее 1 специального символа",
          digits: "Не менее 1 цифры",
        },
        back: "Назад",
        next: "Далее",
      },
      finish: {
        title: "Отличная работа!",
        text1: "Программа успешно настроена и вы уже можете ею пользоваться. Спасибо, что выбрали Shifremen!",
        text2: "После прочтения нажмите «Готово»",
        done: "Готово",
      },
    },
    login: {
      title: "Заблокировано",
      descr: "Введите мастер-пароль чтобы разблокировать",
    },
    list: {
      searchPlaceholder: "Поиск (ctrl + k)",
      draftItemText: "Новый",
      noItems: "Пусто",
      loadMoreItems: "Показать еще ({{current}}/{{limit}})",
      noResults: "Ничего не найдено",
      loadMoreResults: "Больше результатов ({{current}}/{{limit}})",
    },
    sidebar: {
      edit: "Изменить",
      delete: "Удалить",
      save: "Сохранить",
      cancel: "Отмена",
      service: "Сервис",
      servicePlaholder: "нап. Google, Facebook, Wi-Fi",
      username: "Имя пользователя",
      password: "Пароль",
      createdAt: "Создано",
      updatedAt: "Обновлено",
      metadata: "Метаданные",
    },
    passgen: {
      generate: "Сгенерировать",
      mode1: {
        title: "Пароль",
        length: chars => `Длина ${chars} символов`,
      },
      mode2: {
        title: "Кебаб",
        length: parts => `Длина ${parts} кусков`,
        separator: "Разделитель",
      },
      mode3: {
        title: "Пинкод",
        length: digits => `Длина ${digits} цифр`,
      },
    },
    settings: {
      title: "Параметры",
      back: "Назад",
      theme: {
        title: "Тема",
        descr: "Внешний вид приложения",
      },
      locale: {
        title: "Язык",
        descr: "Общий язык интерфейса",
      },
      timeout: {
        title: "Таймаут",
        descr: "Время блокировки приложения",
        value: timeout => {
          const ms = +timeout
          const inMinutes = ms >= 60000
          const value = inMinutes ? ms / 60000 : ms / 1000
          const units = inMinutes ? "мин" : "сек"
          return `${value} ${units}`
        },
      },
      password: {
        title: "Мастер-пароль",
        descr: "Вы можете изменить мастер-пароль здесь, если сомневаетесь в его надежности",
        change: "Поменять мастер-пароль",
      },
      export: {
        title: "Экспорт",
        descr:
          "Экспорт данных в различных форматах. Выберите `AES` для резервного копирования, `CSV` для Excel и `JSON` для общих целей.",
        export: "Экспорт",
      },
    },
    modals: {
      cmpm: {
        title: "Поменять мастер-пароль",
        newPassword: "Новый пароль",
        oldPassword: "Старый пароль",
        error: "Неверный старый пароль",
        change: "Поменять",
      },
      cccm: {
        title: "Отменить изменения?",
        descr: "Все изменения будут потеряны",
        yes: "Да",
        no: "Нет",
      },
      cepm: {
        title: "Подтвердите мастер-пароль",
        descr: "Вам необходимо ввести мастер-пароль",
        error: "Неправильный пароль",
        export: "Эскпортировать",
      },
      cipm: {
        title: "Введите мастер-пароль",
        descr: "Хранилище зашифровано",
        error: "Неправильный пароль",
        import: "Импортировать",
      },
      crim: {
        title: "Удалить этот элемент?",
        descr: "Вы не сможете его восстановить",
        yes: "Да",
        no: "Нет",
      },
    },
  },
}

export default RU_RU
