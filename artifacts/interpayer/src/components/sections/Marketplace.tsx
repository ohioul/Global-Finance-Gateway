import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Globe, Landmark, CreditCard, Bitcoin, FolderTree } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

type Lot = {
  id: number;
  name: string;
  category: string;
  country: string;
  description: string;
  price: string;
  currency: string;
  timeline: string;
  features: string[];
  available: boolean;
};

const LOTS: Lot[] = [
  {
    id: 1, name: "Bank of America", category: "bank", country: "США",
    description: "Открытие бизнес-счёта в одном из крупнейших банков США. Полное сопровождение, удалённо.",
    price: "1500", currency: "USD", timeline: "2-3 дня",
    features: ["Корпоративный счёт в USD", "SWIFT международные переводы", "Дебетовая карта Visa", "ACH-переводы внутри США", "Онлайн-банкинг"],
    available: true,
  },
  {
    id: 2, name: "Chase Business", category: "bank", country: "США",
    description: "Бизнес-счёт в JPMorgan Chase — один из самых надёжных банков мира.",
    price: "1800", currency: "USD", timeline: "1-3 дня",
    features: ["Корпоративная карта Visa", "ACH и Wire переводы", "Международные SWIFT-переводы", "Онлайн-банкинг", "Круглосуточная поддержка"],
    available: true,
  },
  {
    id: 3, name: "Mercury Bank", category: "bank", country: "США",
    description: "Современный онлайн-банк для стартапов и IT-компаний. Без скрытых комиссий.",
    price: "900", currency: "USD", timeline: "1-2 дня",
    features: ["Бесплатное обслуживание счёта", "API-интеграция для автоматизации", "Мультипользовательский доступ", "Виртуальные карты", "Счёт для нерезидентов США"],
    available: true,
  },
  {
    id: 4, name: "Relay Financial", category: "bank", country: "США",
    description: "Онлайн-бизнес-банк США с мощными инструментами управления финансами.",
    price: "800", currency: "USD", timeline: "1-2 дня",
    features: ["Без минимального остатка", "До 20 отдельных счётов", "Автоматизация платежей", "Интеграция с QuickBooks/Xero", "ACH и Wire переводы"],
    available: true,
  },
  {
    id: 5, name: "Revolut Business", category: "bank", country: "Великобритания/ЕС",
    description: "Ведущий европейский необанк для бизнеса. Поддержка 25+ валют.",
    price: "700", currency: "USD", timeline: "1-2 дня",
    features: ["25+ валют в одном счёте", "Мгновенные переводы", "Корпоративные карты", "Аналитика расходов", "Open Banking API"],
    available: true,
  },
  {
    id: 6, name: "Wise Business", category: "bank", country: "ЕС/Великобритания",
    description: "Многовалютный бизнес-счёт с минимальными комиссиями при конвертации.",
    price: "600", currency: "USD", timeline: "1-2 дня",
    features: ["50+ валют", "Реальный межбанковский курс обмена", "Дебетовые карты", "Международные SWIFT/SEPA переводы", "Пакетные массовые платежи"],
    available: true,
  },
  {
    id: 7, name: "N26 Business", category: "bank", country: "Германия/ЕС",
    description: "Немецкий цифровой банк с полной европейской лицензией и IBAN.",
    price: "750", currency: "USD", timeline: "2-3 дня",
    features: ["Немецкий IBAN", "Mastercard бизнес-карта", "SEPA-переводы по ЕС", "Без скрытых комиссий", "Полностью дистанционное обслуживание"],
    available: true,
  },
  {
    id: 8, name: "Bunq Business", category: "bank", country: "Нидерланды/ЕС",
    description: "Голландский банк с нидерландской лицензией. Идеально для ЕС-операций.",
    price: "850", currency: "USD", timeline: "2-3 дня",
    features: ["Нидерландский IBAN", "До 25 суб-счётов", "SEPA/SWIFT переводы", "API доступ", "Мультипользовательское управление"],
    available: true,
  },
  {
    id: 9, name: "Stripe Персональный", category: "payment_system", country: "США/Весь мир",
    description: "Персональный аккаунт Stripe для приёма онлайн-платежей по всему миру.",
    price: "1450", currency: "USD", timeline: "От 2-5 дней",
    features: ["Приём карт Visa/MC/Amex", "Персональный аккаунт", "Webhooks и полный API", "Поддержка 135+ валют", "Мгновенные выплаты на карту"],
    available: true,
  },
  {
    id: 10, name: "PayPal Бизнес", category: "payment_system", country: "США/Весь мир",
    description: "Верифицированный бизнес-аккаунт PayPal. Приём платежей из 200+ стран.",
    price: "1550", currency: "USD", timeline: "5-10 дней",
    features: ["Приём платежей из 200+ стран", "PayPal Checkout для сайта", "Защита продавца", "Массовые выплаты партнёрам", "Конвертация валют"],
    available: true,
  },
  {
    id: 11, name: "Payoneer Персональный", category: "payment_system", country: "США/Весь мир",
    description: "Персональный аккаунт Payoneer по программе приоритетного обслуживания.",
    price: "2000", currency: "USD", timeline: "До 5 дней",
    features: ["Приоритетное обслуживание", "Персональный аккаунт", "Mastercard карта", "Вывод в 200+ стран", "Мультивалютный баланс"],
    available: true,
  },
  {
    id: 12, name: "Square Business", category: "payment_system", country: "США",
    description: "Платёжный аккаунт Square — идеален для e-commerce и физических точек продаж.",
    price: "900", currency: "USD", timeline: "2-3 дня",
    features: ["POS-система для оффлайн продаж", "Онлайн-магазин", "Выставление счетов", "Управление запасами", "Аналитика продаж"],
    available: true,
  },
  {
    id: 18, name: "Payoneer Бизнес", category: "payment_system", country: "США/Весь мир",
    description: "Бизнес-аккаунт Payoneer по программе приоритетного обслуживания. Для компаний.",
    price: "2000", currency: "USD", timeline: "До 5 дней",
    features: ["Приоритетное обслуживание", "Бизнес-аккаунт", "Массовые выплаты партнёрам", "API-интеграция", "Мультивалютный баланс"],
    available: true,
  },
  {
    id: 19, name: "Stripe Бизнес", category: "payment_system", country: "США/Весь мир",
    description: "Бизнес-аккаунт Stripe с полной верификацией. Для компаний и платформ.",
    price: "1450", currency: "USD", timeline: "От 2-5 дней",
    features: ["Stripe Connect для маркетплейсов", "Подписки и рекуррентные платежи", "Stripe Radar (антифрод)", "Полный доступ к API", "Выплаты в 40+ стран"],
    available: true,
  },
  {
    id: 13, name: "Offshore Bank (BVI)", category: "offshore", country: "Британские Виргинские острова",
    description: "Регистрация офшорного банка на BVI с международной лицензией. Под ключ.",
    price: "15000", currency: "USD", timeline: "14-21 день",
    features: ["Банковская лицензия BVI", "Конфиденциальность бенефициаров", "0% корпоративный налог на BVI", "Корреспондентский счёт в Европе", "Принятие международных SWIFT-переводов"],
    available: true,
  },
  {
    id: 14, name: "Offshore Bank (Каймановы о-ва)", category: "offshore", country: "Каймановы острова",
    description: "Открытие офшорного банка на Каймановых островах. Высшая конфиденциальность.",
    price: "18000", currency: "USD", timeline: "21-30 дней",
    features: ["Полная банковская лицензия", "Конфиденциальность акционеров", "Международные SWIFT-переводы", "Отсутствие валютного контроля", "Правовое сопровождение"],
    available: true,
  },
  {
    id: 15, name: "Инвестиционный Фонд (ЕС)", category: "offshore", country: "Люксембург/Ирландия",
    description: "Регистрация инвестиционного фонда в ЕС с лицензией UCITS/AIF.",
    price: "12000", currency: "USD", timeline: "30-45 дней",
    features: ["Лицензия EU (AIFMD/UCITS)", "Структура UCITS или AIF", "Доступ к европейским инвесторам", "Управляющая компания в ЕС", "Квалифицированный кастодиан"],
    available: true,
  },
  {
    id: 16, name: "Криптобиржа (Эстония)", category: "crypto", country: "Эстония/ЕС",
    description: "Регистрация криптовалютной биржи с лицензией VASP в Эстонии. Легально в ЕС.",
    price: "8000", currency: "USD", timeline: "14-30 дней",
    features: ["VASP лицензия ЕС", "Обязательная AML/KYC система", "Юридическое сопровождение", "Открытие банковского счёта для биржи", "Действие лицензии на всей территории ЕС"],
    available: true,
  },
  {
    id: 17, name: "Криптобиржа (BVI/Сейшелы)", category: "crypto", country: "BVI / Сейшелы",
    description: "Офшорная криптобиржа с лицензией. Минимальные требования к капиталу.",
    price: "6000", currency: "USD", timeline: "10-21 день",
    features: ["Офшорная лицензия VASP", "Конфиденциальность владельцев", "Минимальный уставной капитал", "Ускоренная регистрация", "Юридическое оформление под ключ"],
    available: true,
  },
];

type BrandConfig = { bg: string; text: string; label: string };

const BRAND_CONFIG: Record<string, BrandConfig> = {
  stripe:   { bg: '#635BFF', text: '#ffffff', label: 'S' },
  paypal:   { bg: '#003087', text: '#009cde', label: 'PP' },
  payoneer: { bg: '#FF4800', text: '#ffffff', label: 'P' },
  mercury:  { bg: '#000000', text: '#ffffff', label: 'M' },
  chase:    { bg: '#117ACA', text: '#ffffff', label: 'C' },
  relay:    { bg: '#1A56DB', text: '#ffffff', label: 'R' },
  revolut:  { bg: '#0075EB', text: '#ffffff', label: 'R' },
  wise:     { bg: '#9FE870', text: '#163300', label: 'W' },
  n26:      { bg: '#48AC98', text: '#ffffff', label: 'N' },
  bunq:     { bg: '#00D4B3', text: '#ffffff', label: 'b' },
  square:   { bg: '#000000', text: '#ffffff', label: '□' },
};

function getBrandConfig(name: string): BrandConfig | null {
  const lower = name.toLowerCase();
  for (const [key, config] of Object.entries(BRAND_CONFIG)) {
    if (lower.includes(key)) return config;
  }
  return null;
}

function BrandLogo({ name }: { name: string }) {
  const config = getBrandConfig(name);
  if (!config) return null;
  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-full font-bold text-sm tracking-tight select-none"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </div>
  );
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'bank': return <Landmark className="h-5 w-5" />;
    case 'payment_system': return <CreditCard className="h-5 w-5" />;
    case 'crypto': return <Bitcoin className="h-5 w-5" />;
    case 'offshore': return <Globe className="h-5 w-5" />;
    default: return <FolderTree className="h-5 w-5" />;
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'bank': return 'Банк';
    case 'payment_system': return 'Платежная система';
    case 'crypto': return 'Криптобиржа';
    case 'offshore': return 'Оффшор';
    default: return 'Финансы';
  }
};

const handleOrder = (serviceName: string) => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('select-service', { detail: serviceName }));
  }
};

export function Marketplace() {
  return (
    <section id="marketplace" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <Badge variant="gold" className="mb-4">Витрина решений</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Доступные финансовые <span className="text-primary">инструменты</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Актуальные предложения с фиксированными ценами и сроками исполнения. Все услуги оказываются "под ключ".
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOTS.map((lot, index) => (
            <motion.div
              key={lot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="h-full"
            >
              <Card className="flex flex-col h-full bg-card border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                {!lot.available && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="destructive" className="shadow-lg">Временно недоступно</Badge>
                  </div>
                )}

                <CardHeader className="pb-4 relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-14 w-14 rounded-full overflow-hidden border border-border/40 shadow-sm">
                      {getBrandConfig(lot.name) ? (
                        <BrandLogo name={lot.name} />
                      ) : (
                        <div className="text-primary opacity-80 bg-secondary w-full h-full flex items-center justify-center">
                          {getCategoryIcon(lot.category)}
                        </div>
                      )}
                    </div>
                    {lot.available && (
                      <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-border">
                        {getCategoryLabel(lot.category)}
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">{lot.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>{lot.country}</span>
                    <span className="text-border mx-1">•</span>
                    <Clock className="h-4 w-4" />
                    <span>{lot.timeline}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col pb-4">
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {lot.description}
                  </p>

                  <div className="space-y-2 mb-6 flex-1">
                    {lot.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/90 leading-tight">{feature}</span>
                      </div>
                    ))}
                    {lot.features.length > 3 && (
                      <div className="text-xs text-muted-foreground pl-6 italic">
                        + ещё {lot.features.length - 3} преимущества...
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">Стоимость под ключ</div>
                    <div className="text-3xl font-display font-bold text-foreground">
                      {formatCurrency(lot.price, lot.currency)}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    variant={lot.available ? "default" : "outline"}
                    className="w-full"
                    disabled={!lot.available}
                    onClick={() => handleOrder(lot.name)}
                  >
                    {lot.available ? "Оформить заявку" : "Нет в наличии"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
