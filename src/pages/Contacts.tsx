import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Contacts() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <h1 className="text-4xl font-bold mb-8">Контакты</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Phone" className="text-primary" />
                    Телефоны
                  </h3>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">+7 (800) 123-45-67</p>
                    <p className="text-muted-foreground">Бесплатно по России</p>
                    <p className="text-lg">+7 (495) 123-45-67</p>
                    <p className="text-muted-foreground">Для звонков из Москвы</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      Ежедневно с 9:00 до 21:00
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Mail" className="text-primary" />
                    Email
                  </h3>
                  <p className="text-lg">info@techshop.ru</p>
                  <p className="text-muted-foreground">Ответим в течение 24 часов</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="MapPin" className="text-primary" />
                    Адрес магазина
                  </h3>
                  <p className="text-lg mb-2">г. Москва, ул. Примерная, д. 1</p>
                  <p className="text-muted-foreground">м. Площадь Революции</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Пн-Вс: 10:00 - 22:00
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Мессенджеры</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon">
                      <Icon name="MessageCircle" size={20} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Send" size={20} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Phone" size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Напишите нам</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Имя</label>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <textarea
                      placeholder="Ваше сообщение..."
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg resize-none"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=1234567890"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                  title="Карта"
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 text-center">
                <Icon name="Clock" size={32} className="mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Режим работы</h3>
                <p className="text-muted-foreground">Ежедневно</p>
                <p className="text-lg font-semibold">9:00 - 21:00</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardContent className="p-6 text-center">
                <Icon name="MapPin" size={32} className="mx-auto mb-3 text-secondary" />
                <h3 className="font-semibold mb-2">Пункты выдачи</h3>
                <p className="text-muted-foreground">По всей России</p>
                <p className="text-lg font-semibold">2000+ точек</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardContent className="p-6 text-center">
                <Icon name="Headset" size={32} className="mx-auto mb-3 text-accent" />
                <h3 className="font-semibold mb-2">Поддержка</h3>
                <p className="text-muted-foreground">Всегда на связи</p>
                <p className="text-lg font-semibold">24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
