import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function About() {
  const advantages = [
    {
      icon: 'Shield',
      title: 'Надёжность',
      description: 'Работаем с 2015 года. Тысячи довольных клиентов доверяют нам',
    },
    {
      icon: 'Award',
      title: 'Качество',
      description: 'Только оригинальная продукция от официальных поставщиков',
    },
    {
      icon: 'TrendingUp',
      title: 'Выгодные цены',
      description: 'Конкурентные цены и регулярные акции для наших покупателей',
    },
    {
      icon: 'Users',
      title: 'Поддержка',
      description: 'Квалифицированная помощь на всех этапах покупки',
    },
  ];

  const values = [
    {
      title: 'Клиентоориентированность',
      description: 'Мы ставим интересы клиентов на первое место и стремимся превзойти их ожидания',
    },
    {
      title: 'Честность',
      description: 'Прозрачная ценовая политика, честные описания товаров и открытое общение',
    },
    {
      title: 'Инновации',
      description: 'Постоянно развиваемся и внедряем новые технологии для вашего удобства',
    },
    {
      title: 'Ответственность',
      description: 'Несём полную ответственность за качество товаров и уровень сервиса',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <h1 className="text-4xl font-bold mb-8">О магазине</h1>

          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    TechShop
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Мы — современный интернет-магазин с широким ассортиментом товаров для дома, 
                    работы и развлечений. Наша миссия — сделать качественные товары доступными 
                    для каждого покупателя.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    С 2015 года мы помогаем тысячам клиентов находить именно то, что им нужно. 
                    Мы гордимся высоким уровнем сервиса и индивидуальным подходом к каждому покупателю.
                  </p>
                </div>
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Store" size={120} className="text-primary opacity-50" />
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Наши преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage) => (
                <Card key={advantage.title} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Icon name={advantage.icon as any} className="text-white" size={32} />
                    </div>
                    <h3 className="font-semibold text-lg">{advantage.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {advantage.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <Card className="bg-gradient-to-br from-muted/50 to-muted/30">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Наши ценности</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value) => (
                    <div key={value.title} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Icon name="CheckCircle" className="text-secondary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Факты о нас</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">9+</p>
                  <p className="text-muted-foreground">лет на рынке</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-secondary mb-2">50K+</p>
                  <p className="text-muted-foreground">довольных клиентов</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-accent mb-2">4.8</p>
                  <p className="text-muted-foreground">средний рейтинг</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">2K+</p>
                  <p className="text-muted-foreground">пунктов выдачи</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card className="bg-gradient-to-br from-primary to-accent text-white">
            <CardContent className="p-8 text-center">
              <Icon name="Heart" size={48} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Спасибо за доверие!</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Мы ценим каждого клиента и постоянно работаем над улучшением нашего сервиса. 
                Ваше мнение важно для нас — поделитесь отзывом о покупке!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
