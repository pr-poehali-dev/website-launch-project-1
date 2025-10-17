import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Delivery() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Оплата и доставка</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Truck" className="text-primary" />
                Способы доставки
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Курьерская доставка</h3>
                    <p className="text-muted-foreground mb-3">
                      Доставка по Москве и области в течение 1-2 дней
                    </p>
                    <p className="text-xl font-bold text-primary">
                      Бесплатно от 5000 ₽
                    </p>
                    <p className="text-sm text-muted-foreground">
                      До 5000 ₽ — 350 ₽
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Пункты выдачи</h3>
                    <p className="text-muted-foreground mb-3">
                      Более 2000 пунктов выдачи по всей России
                    </p>
                    <p className="text-xl font-bold text-secondary">
                      Бесплатно от 3000 ₽
                    </p>
                    <p className="text-sm text-muted-foreground">
                      До 3000 ₽ — 250 ₽
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Почта России</h3>
                    <p className="text-muted-foreground mb-3">
                      Доставка в любую точку России
                    </p>
                    <p className="text-xl font-bold text-accent">
                      От 400 ₽
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Срок доставки 5-14 дней
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Самовывоз</h3>
                    <p className="text-muted-foreground mb-3">
                      Заберите заказ из нашего магазина
                    </p>
                    <p className="text-xl font-bold text-secondary">
                      Бесплатно
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Готов к выдаче через 2 часа
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="CreditCard" className="text-primary" />
                Способы оплаты
              </h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="CreditCard" className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Банковской картой онлайн</h3>
                      <p className="text-muted-foreground">
                        Принимаем карты Visa, MasterCard, МИР. Безопасная оплата через защищенное соединение
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Wallet" className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Наличными курьеру</h3>
                      <p className="text-muted-foreground">
                        Оплатите заказ наличными при получении от курьера
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Building2" className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Банковский перевод</h3>
                      <p className="text-muted-foreground">
                        Для юридических лиц. Оплата по выставленному счету
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Percent" className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Рассрочка и кредит</h3>
                      <p className="text-muted-foreground">
                        Оформите покупку в рассрочку на 6-24 месяца без переплаты
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="RotateCcw" className="text-primary" />
                Возврат товара
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Вы можете вернуть товар в течение 14 дней с момента получения без объяснения причин.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={18} />
                      <span>Товар должен быть в оригинальной упаковке с сохраненными ярлыками</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={18} />
                      <span>Товар не должен иметь следов использования</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={18} />
                      <span>Деньги возвращаются тем же способом, которым была произведена оплата</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={18} />
                      <span>Срок возврата денежных средств — до 10 рабочих дней</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
