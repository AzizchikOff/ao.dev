# Abdulaziz Orifov — Portfolio (React + Vite)

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda ochiladi: `http://localhost:5173`

## Production build

```bash
npm run build
npm run preview
```

## Loyiha tuzilishi

```
src/
  components/      → barcha UI bo'limlari (Hero, About, Skills, Work, Experience, Contact, Footer)
  context/          → ThemeProvider va useTheme hook (rang sxemasi tizimi)
  i18n/
    locales/         → uz.js, ru.js, en.js — barcha matnlar shu yerda
    index.js         → i18next konfiguratsiyasi
  hooks/
    useReveal.js     → scroll-reveal animatsiyasi uchun hook
```

## Nimani o'zgartirish kerak

1. **Matnlar / kontent** — `src/i18n/locales/uz.js`, `ru.js`, `en.js` fayllarini tahrirlang.
   Har uchta faylda bir xil struktura, shuning uchun bittasida o'zgartirgan narsani
   qolgan ikkisida ham mos ravishda tarjima qiling.

2. **Ranglar** — `src/context/themes.js` faylida 4 ta tayyor tema bor (signal, ember,
   violet, paper/light). Yangi tema qo'shish uchun shu fayldagi pattern bo'yicha yangi
   obyekt qo'shing va `themeOrder` massiviga uning id'sini qo'shing.

3. **Loyihalar rasmlari** — hozircha `Work.jsx` ichida har bir loyiha kartasi
   gradient + matn bilan ko'rsatilgan (`.project-visual`). Haqiqiy screenshot/rasm
   qo'yish uchun shu blokni `<img src="..." />` ga almashtiring.

4. **Aloqa linklari** — `src/components/Contact.jsx` ichidagi `CHANNELS` massivida
   GitHub, LinkedIn, Telegram havolalarini haqiqiy linklar bilan almashtiring.

## Texnologiyalar

- React 19 + Vite
- framer-motion — animatsiyalar va custom kursor
- react-i18next — 3 tilli interfeys (UZ/RU/EN)
- lucide-react — ikonalar
# ao.dev
