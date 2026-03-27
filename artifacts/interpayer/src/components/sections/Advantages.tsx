import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Users } from 'lucide-react';

const advantages = [
  {
    title: "Полностью удаленно",
    description: "Вам не нужно никуда лететь. Весь процесс открытия счетов происходит дистанционно, экономя ваше время и средства.",
    icon: Zap,
  },
  {
    title: "Высокая скорость",
    description: "Налаженные каналы связи с банками позволяют нам открывать счета в рекордные сроки от 1 до 3 рабочих дней.",
    icon: Target,
  },
  {
    title: "Конфиденциальность",
    description: "Мы гарантируем полную безопасность ваших данных. Информация передается по зашифрованным каналам.",
    icon: Shield,
  },
  {
    title: "Экспертиза",
    description: "Компетентные специалисты с многолетним опытом работы в сфере международного банкинга и комплаенса.",
    icon: Users,
  },
];

export function Advantages() {
  return (
    <section id="advantages" className="py-24 bg-background relative overflow-hidden border-y border-border/50">
      {/* Decorative bg element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Почему выбирают <br/>
              <span className="text-primary">Interpayer</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Мы не просто открываем счета. Мы выстраиваем надежную финансовую инфраструктуру для вашего международного бизнеса, минимизируя риски отказов и блокировок.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                    <span className="text-xs text-muted-foreground font-medium">#{i}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                <span className="text-foreground text-lg font-bold">500+</span>
                <br/>
                <span className="text-muted-foreground">успешных кейсов</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {advantages.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-2xl hover:border-primary/30 hover:bg-card transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <adv.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{adv.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
