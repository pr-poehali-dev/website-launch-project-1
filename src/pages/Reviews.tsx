import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      author: 'Анна Петрова',
      rating: 5,
      date: '15 октября 2024',
      text: 'Отличный магазин! Заказывала ноутбук, доставили быстро, упаковка отличная. Цены приятные, качество товара на высоте. Консультанты помогли с выбором. Обязательно буду заказывать ещё!',
      verified: true,
    },
    {
      id: 2,
      author: 'Дмитрий Иванов',
      rating: 5,
      date: '12 октября 2024',
      text: 'Покупал смартфон и наушники. Всё пришло в идеальном состоянии. Особенно порадовала скорость доставки - заказал вечером, на следующий день уже забрал из пункта выдачи. Спасибо!',
      verified: true,
    },
    {
      id: 3,
      author: 'Мария Сидорова',
      rating: 4,
      date: '8 октября 2024',
      text: 'Хороший магазин, широкий выбор товаров. Единственный минус - не всегда быстро отвечают в поддержке. Но в целом всё отлично, товар качественный, цены конкурентные.',
      verified: true,
    },
    {
      id: 4,
      author: 'Алексей Смирнов',
      rating: 5,
      date: '5 октября 2024',
      text: 'Давно искал надёжный магазин электроники. Здесь нашёл всё что нужно. Сравнение товаров очень удобное, помогло выбрать лучший вариант. Доставка бесплатная при заказе от 5000р - очень выгодно!',
      verified: false,
    },
    {
      id: 5,
      author: 'Елена Кузнецова',
      rating: 5,
      date: '1 октября 2024',
      text: 'Прекрасный сервис! Заказывала подарок мужу - игровой ноутбук. Менеджер помог подобрать идеальный вариант под бюджет. Муж в восторге! Рекомендую всем.',
      verified: true,
    },
    {
      id: 6,
      author: 'Сергей Волков',
      rating: 4,
      date: '28 сентября 2024',
      text: 'Покупал телевизор. Доставили быстро, установили, подключили. Небольшая задержка была с ответом в чате, но в целом всё хорошо. Буду покупать ещё.',
      verified: true,
    },
  ];

  const stats = [
    { label: 'Средний рейтинг', value: '4.8', icon: 'Star' },
    { label: 'Всего отзывов', value: '1,234', icon: 'MessageSquare' },
    { label: 'Довольных клиентов', value: '98%', icon: 'ThumbsUp' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <h1 className="text-4xl font-bold mb-8">Отзывы покупателей</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-2">
                <CardContent className="p-6 text-center">
                  <Icon
                    name={stat.icon as any}
                    size={32}
                    className="mx-auto mb-3 text-primary"
                  />
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Поделитесь своим мнением</h2>
                <p className="text-muted-foreground mb-6">
                  Ваш отзыв поможет другим покупателям сделать правильный выбор
                </p>
                <Button size="lg">
                  <Icon name="Edit" size={20} className="mr-2" />
                  Написать отзыв
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Все отзывы</h2>
              <select className="px-4 py-2 border rounded-lg">
                <option>Сначала новые</option>
                <option>Сначала полезные</option>
                <option>Высокий рейтинг</option>
                <option>Низкий рейтинг</option>
              </select>
            </div>

            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{review.author}</p>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              <Icon name="CheckCircle" size={12} className="mr-1" />
                              Проверено
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={
                            i < review.rating
                              ? 'fill-accent text-accent'
                              : 'text-muted'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <Button variant="ghost" size="sm">
                      <Icon name="ThumbsUp" size={14} className="mr-2" />
                      Полезно
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MessageSquare" size={14} className="mr-2" />
                      Ответить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg">
              Загрузить ещё отзывы
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
