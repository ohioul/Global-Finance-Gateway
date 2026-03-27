import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, FileCheck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: "Оставьте заявку",
    description: "Выберите интересующий банк или платежную систему на витрине и заполните форму. Наш менеджер свяжется с вами в течение 15 минут.",
  },
  {
    icon: FileCheck,
    title: "Сбор документов",
    description: "Мы предоставим четкий список необходимых документов (KYC). Вы отправляете их нам в электронном виде.",
  },
  {
    icon: CheckCircle,
    title: "Получите счет",
    description: "Наши юристы подают документы по налаженным каналам. Вы получаете готовые реквизиты и доступы от 1 до 3 дней.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Прозрачный процесс <span className="text-primary">работы</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Минимум вашего участия, максимум нашей экспертизы.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border/50"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-background border-2 border-border flex items-center justify-center mb-6 shadow-xl relative group">
                  <div className="absolute inset-0 rounded-full border-2 border-primary scale-[1.1] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
                  <step.icon className="h-10 w-10 text-primary" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-gold text-primary-foreground font-bold flex items-center justify-center border-4 border-background">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
