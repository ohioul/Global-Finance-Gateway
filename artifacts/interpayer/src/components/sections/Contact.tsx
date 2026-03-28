import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const SERVICES = [
  { name: "Bank of America", country: "США" },
  { name: "Chase Business", country: "США" },
  { name: "Mercury Bank", country: "США" },
  { name: "Relay Financial", country: "США" },
  { name: "Revolut Business", country: "Великобритания/ЕС" },
  { name: "Wise Business", country: "ЕС/Великобритания" },
  { name: "N26 Business", country: "Германия/ЕС" },
  { name: "Bunq Business", country: "Нидерланды/ЕС" },
  { name: "Stripe Персональный", country: "США/Весь мир" },
  { name: "Stripe Бизнес", country: "США/Весь мир" },
  { name: "PayPal Бизнес", country: "США/Весь мир" },
  { name: "Payoneer Персональный", country: "США/Весь мир" },
  { name: "Payoneer Бизнес", country: "США/Весь мир" },
  { name: "Square Business", country: "США" },
  { name: "Offshore Bank (BVI)", country: "BVI" },
  { name: "Offshore Bank (Каймановы о-ва)", country: "Каймановы острова" },
  { name: "Инвестиционный Фонд (ЕС)", country: "Люксембург/Ирландия" },
  { name: "Криптобиржа (Эстония)", country: "Эстония/ЕС" },
  { name: "Криптобиржа (BVI/Сейшелы)", country: "BVI / Сейшелы" },
];

const contactSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  vk: z.string().optional(),
  service: z.string().min(1, "Выберите интересующую услугу"),
  message: z.string().optional(),
}).refine(
  (data) => (data.telegram && data.telegram.trim().length > 0) || (data.vk && data.vk.trim().length > 0),
  { message: "Укажите хотя бы один контакт: Telegram или ВКонтакте", path: ["telegram"] }
);

type ContactFormValues = z.infer<typeof contactSchema>;

const TG_BOT_TOKEN = "8634695110:AAEbGK9Hzc4KWfZE3gojRHZE2APWRKDlX_w";
const TG_CHAT_ID = "8507111889";

async function sendToTelegram(data: ContactFormValues): Promise<void> {
  const lines = [
    `<b>🔔 Новая заявка — Interpayer</b>`,
    ``,
    `<b>Имя:</b> ${data.name}`,
    `<b>Email:</b> ${data.email}`,
    data.phone ? `<b>Телефон:</b> ${data.phone}` : null,
    data.telegram ? `<b>Telegram:</b> ${data.telegram}` : null,
    data.vk ? `<b>ВКонтакте:</b> ${data.vk}` : null,
    `<b>Услуга:</b> ${data.service}`,
    data.message ? `<b>Сообщение:</b> ${data.message}` : null,
  ].filter(Boolean).join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: lines,
        parse_mode: "HTML",
      }),
    }
  );
  const result = await res.json();
  if (!result.ok) throw new Error("Telegram send failed");
}

export function Contact() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: "", telegram: "", vk: "" },
  });

  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setValue('service', customEvent.detail, { shouldValidate: true });
      }
    };
    window.addEventListener('select-service', handleSelectService);
    return () => window.removeEventListener('select-service', handleSelectService);
  }, [setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    setIsPending(true);
    try {
      await sendToTelegram(data);
      toast({
        title: "Заявка отправлена!",
        description: "Наш менеджер свяжется с вами в ближайшее время.",
        variant: "default",
      });
      reset();
    } catch {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/contact-bg.png`}
          alt="Abstract Contact Background"
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Готовы выйти на <br/>
              <span className="text-gradient-gold">глобальный рынок?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Оставьте заявку, и наш специалист свяжется с вами для бесплатной консультации и подбора оптимального финансового решения.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Бесплатный аудит</h4>
                  <p className="text-sm text-muted-foreground">Оценим ваши шансы и подберем юрисдикцию</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Быстрый старт</h4>
                  <p className="text-sm text-muted-foreground">Начинаем работу в день обращения</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-border bg-card/80 backdrop-blur-md shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Имя <span className="text-destructive">*</span></label>
                    <Input
                      placeholder="Ваше имя или название компании"
                      {...register("name")}
                      className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Email <span className="text-destructive">*</span></label>
                      <Input
                        placeholder="example@mail.com"
                        type="email"
                        {...register("email")}
                        className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Телефон</label>
                      <Input placeholder="+1 234 567 8900" {...register("phone")} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">
                        Telegram <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder="@username"
                        {...register("telegram")}
                        className={errors.telegram ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">
                        ВКонтакте <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder="vk.com/username или ID"
                        {...register("vk")}
                        className={errors.vk ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                    </div>
                    {errors.telegram && (
                      <p className="text-xs text-destructive sm:col-span-2 -mt-3">{errors.telegram.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Интересующая услуга <span className="text-destructive">*</span></label>
                    <div className="relative">
                      <select
                        {...register("service")}
                        className={`flex h-12 w-full appearance-none rounded-xl border border-border bg-input/50 px-4 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-all duration-200 ${errors.service ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      >
                        <option value="" disabled hidden>Выберите из списка...</option>
                        <option value="Общая консультация">Общая консультация</option>
                        {SERVICES.map(s => (
                          <option key={s.name} value={s.name}>{s.name} ({s.country})</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                    {errors.service && <p className="text-xs text-destructive mt-1">{errors.service.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Сообщение (необязательно)</label>
                    <Textarea
                      placeholder="Опишите вашу задачу или задайте вопрос..."
                      {...register("message")}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full mt-2"
                    disabled={isPending}
                  >
                    {isPending ? "Отправка..." : "Отправить заявку"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
