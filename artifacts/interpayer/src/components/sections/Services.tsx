import React from 'react';
import { motion } from 'framer-motion';
import { Building2, CreditCard, Landmark, LineChart, Bitcoin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    title: "Банки США и Европы",
    description: "Надежные корпоративные счета в банках первого эшелона с полным удаленным доступом.",
    icon: Building2,
  },
  {
    title: "Платежные системы",
    description: "Бизнес-аккаунты Stripe, PayPal, Payoneer для приема платежей со всего мира.",
    icon: CreditCard,
  },
  {
    title: "Оффшорные банки",
    description: "Счета в лояльных юрисдикциях с минимальными требованиями к комплаенсу.",
    icon: Landmark,
  },
  {
    title: "Инвестиционные фонды",
    description: "Регистрация и обслуживание структур для защиты и приумножения капитала.",
    icon: LineChart,
  },
  {
    title: "Криптобиржи",
    description: "Верифицированные корпоративные аккаунты на крупнейших крипто-площадках.",
    icon: Bitcoin,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-secondary/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Комплексные решения для <span className="text-primary">вашего бизнеса</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Мы берем на себя всю бюрократию, предоставляя вам готовые инструменты для работы на международных рынках.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index === 4 ? "lg:col-span-1 lg:col-start-2" : ""}
            >
              <Card className="h-full bg-card/40 hover:bg-card/80 border-border/40 hover:border-primary/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
