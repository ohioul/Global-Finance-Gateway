import React from 'react';
import { Link } from 'wouter';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Interpayer"
                className="h-8 w-8 object-contain"
              />
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                Inter<span className="text-primary">payer</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Международный сервис по быстрому открытию счетов в банках США и Европы, а также регистрации бизнес-аккаунтов в ведущих платежных системах мира. Надежно, конфиденциально, под ключ.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">Услуги</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Банки США и Европы</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Stripe, PayPal, Payoneer</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Оффшорные банки</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Криптобиржи</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">support@interpayer.agency Moscow RU</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">+1 (575) 570 04 58</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">New York, USA<br/>London, UK</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Interpayer. Все права защищены.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/offer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Публичная оферта</Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
