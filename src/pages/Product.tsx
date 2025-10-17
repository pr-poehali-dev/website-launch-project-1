import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { products } from '@/data/products';

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Товар не найден</h1>
            <Button asChild>
              <Link to="/catalog">Вернуться в каталог</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-6">
            <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
              <Icon name="ArrowLeft" size={16} />
              Назад в каталог
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={20} className="fill-accent text-accent" />
                    <span className="text-lg font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {product.reviewsCount} отзывов
                  </span>
                  {product.inStock && (
                    <Badge className="bg-secondary">В наличии</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                  {product.oldPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        {product.oldPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      <Badge className="bg-destructive">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1">
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Heart" size={20} />
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="ArrowLeftRight" size={20} />
                </Button>
              </div>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Truck" className="text-primary" size={24} />
                    <div>
                      <p className="font-semibold">Быстрая доставка</p>
                      <p className="text-sm text-muted-foreground">От 1 дня по всей России</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="ShieldCheck" className="text-secondary" size={24} />
                    <div>
                      <p className="font-semibold">Гарантия качества</p>
                      <p className="text-sm text-muted-foreground">Официальная гарантия</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="RotateCcw" className="text-accent" size={24} />
                    <div>
                      <p className="font-semibold">Возврат 14 дней</p>
                      <p className="text-sm text-muted-foreground">Вернем деньги без вопросов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specs">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Описание товара</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Технические характеристики</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex border-b pb-3 last:border-b-0">
                        <span className="font-medium w-1/3">{key}</span>
                        <span className="text-muted-foreground w-2/3">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Отзывы покупателей</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icon key={star} name="Star" size={16} className="fill-accent text-accent" />
                          ))}
                        </div>
                        <span className="font-semibold">Иван П.</span>
                      </div>
                      <p className="text-muted-foreground">
                        Отличный товар! Полностью соответствует описанию. Доставка быстрая.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <Icon key={star} name="Star" size={16} className="fill-accent text-accent" />
                          ))}
                          <Icon name="Star" size={16} className="text-muted" />
                        </div>
                        <span className="font-semibold">Мария С.</span>
                      </div>
                      <p className="text-muted-foreground">
                        Хорошее качество, но цена немного завышена. В целом доволен покупкой.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
