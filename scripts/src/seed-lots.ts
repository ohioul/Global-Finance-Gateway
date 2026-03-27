import { db } from "@workspace/db";
import { lotsTable } from "@workspace/db/schema";

const lots = [
  // US Banks
  {
    name: "Bank of America",
    category: "bank",
    country: "США",
    description: "Открытие бизнес-счёта в одном из крупнейших банков США. Полное сопровождение, удалённо.",
    price: "1500",
    currency: "USD",
    timeline: "2-3 дня",
    features: ["Мультивалютный счёт", "Онлайн-банкинг", "Дебетовая карта", "SWIFT/IBAN", "24/7 поддержка"],
    logoUrl: null,
    available: true,
  },
  {
    name: "Chase Business",
    category: "bank",
    country: "США",
    description: "Бизнес-счёт в JPMorgan Chase — один из самых надёжных банков мира.",
    price: "1800",
    currency: "USD",
    timeline: "1-3 дня",
    features: ["Интернет-банкинг", "Корпоративная карта", "Интеграция с PayPal", "ACH-переводы", "Заработок на остатке"],
    logoUrl: null,
    available: true,
  },
  {
    name: "Mercury Bank",
    category: "bank",
    country: "США",
    description: "Современный онлайн-банк для стартапов и IT-компаний. Без скрытых комиссий.",
    price: "900",
    currency: "USD",
    timeline: "1-2 дня",
    features: ["Бесплатное обслуживание", "API-интеграция", "Мультипользовательский доступ", "Виртуальные карты", "USD и EUR"],
    logoUrl: null,
    available: true,
  },
  {
    name: "Relay Financial",
    category: "bank",
    country: "США",
    description: "Онлайн-бизнес-банк США с мощными инструментами управления финансами.",
    price: "800",
    currency: "USD",
    timeline: "1-2 дня",
    features: ["Без минимального остатка", "20 счетов в одном", "Автоматизация платежей", "Интеграция с бухгалтерией", "Teamwork инструменты"],
    logoUrl: null,
    available: true,
  },
  // European Banks
  {
    name: "Revolut Business",
    category: "bank",
    country: "Великобритания/ЕС",
    description: "Ведущий европейский необанк для бизнеса. Поддержка 25+ валют.",
    price: "700",
    currency: "USD",
    timeline: "1-2 дня",
    features: ["25+ валют", "Мгновенные переводы", "Корпоративные карты", "Аналитика расходов", "Open Banking API"],
    logoUrl: null,
    available: true,
  },
  {
    name: "Wise Business",
    category: "bank",
    country: "ЕС/Великобритания",
    description: "Многовалютный бизнес-счёт с минимальными комиссиями при конвертации.",
    price: "600",
    currency: "USD",
    timeline: "1-2 дня",
    features: ["50+ валют", "Реальный курс обмена", "Дебетовые карты", "Пакетные платежи", "Интеграция с Xero"],
    logoUrl: null,
    available: true,
  },
  {
    name: "N26 Business",
    category: "bank",
    country: "Германия/ЕС",
    description: "Немецкий цифровой банк с полной европейской лицензией и IBAN.",
    price: "750",
    currency: "USD",
    timeline: "2-3 дня",
    features: ["Немецкий IBAN", "Mastercard бизнес", "Мгновенные уведомления", "Без скрытых комиссий", "SEPA-переводы"],
    logoUrl: null,
    available: true,
  },
  {
    name: "Bunq Business",
    category: "bank",
    country: "Нидерланды/ЕС",
    description: "Голландский банк с нидерландской лицензией. Идеально для ЕС-операций.",
    price: "850",
    currency: "USD",
    timeline: "2-3 дня",
    features: ["Нидерландский IBAN", "До 25 суб-счётов", "Автоматическое сбережение", "Зелёный банкинг", "API доступ"],
    logoUrl: null,
    available: true,
  },
  // Payment Systems
  {
    name: "Stripe",
    category: "payment_system",
    country: "США/Весь мир",
    description: "Регистрация бизнес-аккаунта в Stripe — лидере онлайн-платежей. Полная верификация.",
    price: "1200",
    currency: "USD",
    timeline: "1-3 дня",
    features: ["Приём карт Visa/MC/Amex", "Подписки и рекуррентные платежи", "Stripe Connect", "Dashboard", "Webhooks API"],
    logoUrl: null,
    available: true,
  },
  {
    name: "PayPal Business",
    category: "payment_system",
    country: "США/Весь мир",
    description: "Верифицированный бизнес-аккаунт PayPal. Готов к приёму платежей с первого дня.",
    price: "1000",
    currency: "USD",
    timeline: "1-3 дня",
    features: ["Приём платежей 200+ стран", "PayPal Checkout", "Защита продавца", "Массовые выплаты", "Инвойсинг"],
    logoUrl: null,
    available: true,
  },
  {
    name: "Payoneer",
    category: "payment_system",
    country: "США/Весь мир",
    description: "Бизнес-аккаунт Payoneer для получения выплат от мировых платформ и клиентов.",
    price: "800",
    currency: "USD",
    timeline: "1-2 дня",
    features: ["Получение от Amazon/Fiverr/Upwork", "Mastercard карта", "Вывод в 200+ стран", "Мультивалютный баланс", "Массовые выплаты"],
    logoUrl: null,
    available: true,
  },
  {
    name: "Square Business",
    category: "payment_system",
    country: "США",
    description: "Платёжный аккаунт Square — идеален для e-commerce и физических точек продаж.",
    price: "900",
    currency: "USD",
    timeline: "2-3 дня",
    features: ["POS-система", "Онлайн-магазин", "Инвойсы", "Управление запасами", "Аналитика продаж"],
    logoUrl: null,
    available: true,
  },
  // Offshore Banks
  {
    name: "Offshore Bank (BVI)",
    category: "offshore",
    country: "Британские Виргинские острова",
    description: "Регистрация офшорного банка на BVI с международной лицензией. Под ключ.",
    price: "15000",
    currency: "USD",
    timeline: "14-21 день",
    features: ["Банковская лицензия", "Конфиденциальность", "Нулевое налогообложение", "Корсчёт в европейском банке", "Команда поддержки"],
    logoUrl: null,
    available: true,
  },
  {
    name: "Offshore Bank (Каймановы о-ва)",
    category: "offshore",
    country: "Каймановы острова",
    description: "Открытие офшорного банка на Каймановых островах. Высшая степень конфиденциальности.",
    price: "18000",
    currency: "USD",
    timeline: "21-30 дней",
    features: ["Полная лицензия", "Анонимность акционеров", "Без налога на прибыль", "Международные переводы", "Правовая поддержка"],
    logoUrl: null,
    available: true,
  },
  // Investment Funds
  {
    name: "Инвестиционный Фонд (ЕС)",
    category: "offshore",
    country: "Люксембург/Ирландия",
    description: "Регистрация инвестиционного фонда в ЕС с соответствующей лицензией UCITS/AIF.",
    price: "12000",
    currency: "USD",
    timeline: "30-45 дней",
    features: ["Лицензия EU", "UCITS или AIF структура", "Доступ к EU инвесторам", "Управляющая компания", "Полная документация"],
    logoUrl: null,
    available: true,
  },
  // Crypto Exchanges
  {
    name: "Криптобиржа (Эстония)",
    category: "crypto",
    country: "Эстония/ЕС",
    description: "Регистрация криптовалютной биржи с лицензией VASP в Эстонии. Быстро и легально.",
    price: "8000",
    currency: "USD",
    timeline: "14-30 дней",
    features: ["VASP лицензия ЕС", "AML/KYC система", "Горячий и холодный кошелёк", "Юридическое сопровождение", "Банковский счёт"],
    logoUrl: null,
    available: true,
  },
  {
    name: "Криптобиржа (BVI/Сейшелы)",
    category: "crypto",
    country: "BVI / Сейшелы",
    description: "Офшорная криптобиржа с лицензией. Минимальные требования к капиталу.",
    price: "6000",
    currency: "USD",
    timeline: "10-21 день",
    features: ["Офшорная лицензия", "Конфиденциальность", "Низкий уставной капитал", "Готовая инфраструктура", "Поддержка криптовалют"],
    logoUrl: null,
    available: true,
  },
];

async function seed() {
  console.log("Seeding lots...");
  
  // Clear existing
  await db.delete(lotsTable);
  
  // Insert all
  await db.insert(lotsTable).values(lots);
  
  console.log(`Seeded ${lots.length} lots successfully.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
