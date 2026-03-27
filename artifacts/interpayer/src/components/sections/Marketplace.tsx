import React from 'react';
import { motion } from 'framer-motion';
import { useGetLots } from '@workspace/api-client-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Globe, Landmark, CreditCard, Bitcoin, FolderTree } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

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
  bank:     { bg: '#1E3A5F', text: '#ffffff', label: '🏦' },
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

export function Marketplace() {
  const { data: lots, isLoading, error } = useGetLots();

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
      // We could use context or state to set the dropdown, but for a simple 
      // implementation, scrolling is a good start. In a real app we'd pass it via state.
      // For now, we dispatch a custom event that the contact form can listen to.
      window.dispatchEvent(new CustomEvent('select-service', { detail: serviceName }));
    }
  };

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

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="flex flex-col h-full border-border/30">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-secondary" />
                    <Skeleton className="h-6 w-24 rounded-full bg-secondary" />
                  </div>
                  <Skeleton className="h-8 w-3/4 mb-2 bg-secondary" />
                  <Skeleton className="h-4 w-1/2 bg-secondary" />
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <div className="space-y-3 mb-6">
                    <Skeleton className="h-4 w-full bg-secondary" />
                    <Skeleton className="h-4 w-5/6 bg-secondary" />
                    <Skeleton className="h-4 w-4/6 bg-secondary" />
                  </div>
                  <Skeleton className="h-10 w-1/3 bg-secondary" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Skeleton className="h-12 w-full rounded-xl bg-secondary" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12 bg-destructive/10 rounded-2xl border border-destructive/20">
            <p className="text-destructive font-medium">Не удалось загрузить данные витрины.</p>
            <p className="text-muted-foreground text-sm mt-2">Пожалуйста, попробуйте позже.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && lots?.length === 0 && (
          <div className="text-center py-20 bg-secondary/30 rounded-2xl border border-border/50">
            <Landmark className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">Витрина обновляется</h3>
            <p className="text-muted-foreground">В данный момент мы обновляем список доступных лотов. Свяжитесь с нами для индивидуального подбора.</p>
            <Button variant="outline" className="mt-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Оставить заявку
            </Button>
          </div>
        )}

        {/* Data Grid */}
        {!isLoading && !error && lots && lots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lots.map((lot, index) => (
              <motion.div
                key={lot.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="flex flex-col h-full bg-card border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                  {/* Status Ribbon */}
                  {!lot.available && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="destructive" className="shadow-lg">Временно недоступно</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4 relative">
                    <div className="flex justify-between items-start mb-4">
                      {/* Logo / Icon */}
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
                          + еще {lot.features.length - 3} преимуществ...
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
        )}
      </div>
    </section>
  );
}
