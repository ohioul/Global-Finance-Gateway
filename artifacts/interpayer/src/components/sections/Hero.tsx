import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Globe, Clock } from 'lucide-react';

export function Hero() {
  const scrollToMarketplace = () => {
    document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
          alt="Premium Finance Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background"></div>
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-medium text-foreground">Открытие счетов за 1-3 дня</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl leading-tight mb-6"
        >
          Международный бизнес <br className="hidden md:block"/>
          <span className="text-gradient-gold">без границ</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed px-2 sm:px-0"
        >
          Удаленное открытие счетов в банках США и Европы, регистрация бизнес-аккаунтов Stripe, PayPal и криптобирж под ключ.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button size="lg" variant="gold" className="gap-2 group" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Получить консультацию
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2" onClick={scrollToMarketplace}>
            Смотреть витрину
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-border/50 pt-10 w-full max-w-3xl"
        >
          <div className="flex flex-col items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium text-foreground">США, Европа, Оффшоры</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Clock className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium text-foreground">Сроки от 1 до 3 дней</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium text-foreground">100% гарантия результата</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
