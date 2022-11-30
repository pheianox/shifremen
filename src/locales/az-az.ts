import AZ_DATEFNS_LOCALE from "date-fns/locale/az"
import { Locale } from "./_-_"

const AZ_AZ: Locale = {
  flag: "🇦🇿",
  name: "Azərbaycanca",
  datefnsLocale: AZ_DATEFNS_LOCALE,
  translations: {
    typeHere: "Bura daxil edin...",
    setup: {
      locale: {
        title: "Xoş Gəlmisiniz!",
        text1: "Şifrəmen sizin bütün parollarınızı bir yerdə saxlamağa və idarə etməyə imkan verir",
        text2: "Dili seçin və «Irəli» düyməsini basın",
        next: "Irəli",
      },
      choose: {
        title: `Anbar`,
        descr:
          "Gəlin sizin üçün anbar yaradaq, bunu etmək üçün «Irəli» düyməsini klikləyin. İxrac faylınız varsa, mövcud deponu da idxal edə bilərsiniz",
        import: "İdxal",
        next: "İrəli",
        back: "Geri",
      },
      import: {
        title: "Anbarın idxalı",
        descr: "Aşağıdan anbar faylını seçin. Anbar şifrələndiyi halda, sizdən təhlükəsizlik parolu tələb olunacaq",
        chooseFile: "faylı seç",
        chooseOtherFile: "başqa faylı seç",
        import: "idxal",
        back: "geri",
      },
      create: {
        title: "Ana Parol",
        text1: "Ana parol yadda saxlamağı tələb edən yeganə paroldur. Kifayət qədər uzun və etibarlı olduğundan əmin olun",
        text2: "Aşaqdakı tələblərə cavab verən bir parol yaratdıqdan sonra «Irəli» düyməsini basın",
        reqs: {
          length: min => `Uzunluğu ən azı ${min} simvol`,
          uppers: "Ən azı 1 böyük hərf",
          lowers: "Ən azı 1 kiçik hərf",
          specials: "Ən azı 1 xüsusi simvol",
          digits: "Ən azı 1 rəqəm",
        },
        back: "Geri",
        next: "Irəli",
      },
      finish: {
        title: "Tamam",
        text1: "Proqram uğurla tənzinləndi və artıq istifadəyə hazırdır. Şifrəmeni seçdiyiniz üçün təşəkkür edirik!",
        text2: "Oxuduqdan sonra «Bitir» düyməsini basın",
        done: "Bitir",
      },
    },
    login: {
      title: "Kilidlənib",
      descr: "Kilidini açmaq üçün ana parolu daxil edin",
    },
    list: {
      searchPlaceholder: "Axtrış (ctrl + k)",
      draftItemText: "Yeni",
      noItems: "Boşdur",
      loadMoreItems: "Daha çox göstər ({{current}}/{{limit}})",
      noResults: "Heç nə tapılmadı",
      loadMoreResults: "Daha çox nəticə ({{current}}/{{limit}})",
    },
    sidebar: {
      edit: "düzəliş",
      delete: "sil",
      save: "təstiq",
      cancel: "ləvğ",
      service: "Servis",
      servicePlaholder: "məs. Google, Facebook, Wi-Fi",
      username: "İstifadəçi adı",
      password: "Parol",
      createdAt: "Yaradılıb",
      updatedAt: "Yenilənib",
      metadata: "Metaməlumatlar",
    },
    passgen: {
      generate: "Yarat",
      mode1: {
        title: "Parol",
        length: chars => `Uzunluqu ${chars} simvol`,
      },
      mode2: {
        title: "Kəbab",
        length: parts => `Uzunluqu ${parts} tikə`,
        separator: "Ayırıcı",
      },
      mode3: {
        title: "Pinkod",
        length: digits => `Uzunluqu ${digits} rəqəm`,
      },
    },
    settings: {
      title: "Parametrlər",
      back: "Geri",
      theme: {
        title: "Görünüş",
        descr: "Tətbiqin görünüşü",
      },
      locale: {
        title: "Dil",
        descr: "Tətbiqin interfeys dili",
      },
      timeout: {
        title: "Taymaut",
        descr: "Tətbiqin kilitə düşmə vaxtı",
        value: timeout => {
          const ms = +timeout
          const inMinutes = ms >= 60000
          const value = inMinutes ? ms / 60000 : ms / 1000
          const units = inMinutes ? "dəq" : "san"
          return `${value} ${units}`
        },
      },
      password: {
        title: "Ana parol",
        descr: "Ana parolun gücünə şübəniz varsa, onu burdan dəyişə bilərsiniz",
        change: "Ana parolu dəyiş",
      },
      export: {
        title: "İxrac",
        descr:
          "Məlumatları müxtəlif formatlarda ixrac edin. Yedəkləmələr üçün `AES`, Excel üçün `CSV` və ümumi məqsədlər üçün `JSON` seçin",
        export: "İxrac",
      },
    },
    modals: {
      cmpm: {
        title: "Ana parolu dayiş",
        newPassword: "Yeni parol",
        oldPassword: "Köhnə parol",
        error: "Köhnə parol səhvdir",
        change: "Dəyiş",
      },
      cccm: {
        title: "Dəyişikliklər ləğv edilsin?",
        descr: "Bütün dəyişikliklər itiriləcək",
        yes: "Hə",
        no: "Yox",
      },
      cepm: {
        title: "Ana parolu təsdiqləyin",
        descr: "Məlumatları ixrac etmək üçün əsas parol daxil etməlisiniz",
        error: "Səhv. Yenidən cəhd edin",
        export: "İxrac",
      },
      cipm: {
        title: "Ana parolu daxil edin",
        descr: "Bu anbar şifrələnib",
        error: "Səhv. Yenidən cəhd edin",
        import: "İdxal",
      },
      crim: {
        title: "Element silinsin?",
        descr: "Bərpa edə bilməyəcəksiniz",
        yes: "Hə",
        no: "Yox",
      },
    },
  },
}

export default AZ_AZ
