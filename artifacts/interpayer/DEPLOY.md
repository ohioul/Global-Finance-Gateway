# Interpayer — Инструкции по деплою

## Подготовка к standalone-деплою

Перед загрузкой на GitHub/Vercel скопируйте содержимое папки `artifacts/interpayer` в отдельный репозиторий и выполните:

```bash
cp package.standalone.json package.json
cp tsconfig.standalone.json tsconfig.json
npm install
```

---

## Vercel

### Вариант 1: Через интерфейс Vercel
1. Загрузите проект в GitHub-репозиторий
2. Откройте [vercel.com](https://vercel.com), подключите репозиторий
3. Vercel автоматически определит Vite и применит `vercel.json`
4. Нажмите **Deploy**

### Вариант 2: Через CLI
```bash
npm i -g vercel
vercel
```

Vercel подхватит настройки из `vercel.json` автоматически.

---

## GitHub Pages

### Автоматический деплой (GitHub Actions)
1. Загрузите проект в GitHub-репозиторий
2. Скопируйте `.github/workflows/deploy-ghpages.yml` в корень репозитория
3. В настройках репозитория: **Settings → Pages → Source → GitHub Actions**
4. Пуш в ветку `main` запустит автоматический деплой

### Ручной деплой
```bash
npm install
npm run build
```

Содержимое папки `dist/` загрузите на GitHub Pages.

> **Важно:** Если сайт размещён не в корне (например, `username.github.io/repo-name/`),
> перед сборкой задайте `BASE_PATH`:
> ```bash
> BASE_PATH=/repo-name/ npm run build
> ```

---

## Структура сборки

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── images/
│   ├── logo.png
│   └── ...
└── favicon.png
```

## Контактная форма

Форма отправляет заявки напрямую в Telegram Bot API — бэкенд не нужен.
Сайт работает как полностью статический.
