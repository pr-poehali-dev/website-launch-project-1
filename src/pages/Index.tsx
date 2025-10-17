import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Index() {
  const categories = [
    { name: 'Электроника', icon: 'Laptop', count: 450 },
    { name: 'Одежда', icon: 'Shirt', count: 1200 },
    { name: 'Дом и сад', icon: 'Home', count: 680 },
    { name: 'Спорт', icon: 'Dumbbell', count: 320 },
    { name: 'Красота', icon: 'Sparkles', count: 540 },
    { name: 'Детские товары', icon: 'Baby', count: 890 },
  ];

  const features = [
    {
      icon: 'ShieldCheck',
      title: 'Гарантия качества',
      description: 'Проверенные товары и производители',
    },
    {
      icon: 'Truck',
      title: 'Быстрая доставка',
      description: 'Доставка по России от 1 дня',
    },
    {
      icon: 'CreditCard',
      title: 'Удобная оплата',
      description: 'Оплата картой, наличными или в кредит',
    },
    {
      icon: 'Headset',
      title: 'Поддержка 24/7',
      description: 'Помощь по любым вопросам',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Универсальный{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  магазин
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Всё что нужно в одном месте — от электроники до товаров для дома
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild className="text-lg">
                  <Link to="/catalog">
                    <Icon name="ShoppingBag" className="mr-2" size={20} />
                    Перейти в каталог
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg">
                  <Link to="/about">
                    Узнать больше
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Популярные категории</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link key={category.name} to="/catalog">
                  <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Icon name={category.icon as any} className="text-white" size={32} />
                      </div>
                      <h3 className="font-semibold text-center">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} товаров</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Icon name={feature.icon as any} className="text-white" size={24} />
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-primary to-accent text-white">
          <div className="container text-center space-y-6">
            <h2 className="text-3xl font-bold">Подпишитесь на новости</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Узнавайте первыми о новых поступлениях, акциях и специальных предложениях
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button size="lg" variant="secondary">
                Подписаться
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
