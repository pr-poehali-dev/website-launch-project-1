import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { products } from '@/data/products';

export default function Compare() {
  const compareProducts = products.slice(0, 3);

  if (compareProducts.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Icon name="ArrowLeftRight" size={64} className="mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">Список сравнения пуст</h1>
            <p className="text-muted-foreground">
              Добавьте товары для сравнения из каталога
            </p>
            <Button asChild size="lg">
              <Link to="/catalog">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Перейти в каталог
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const allSpecs = Array.from(
    new Set(compareProducts.flatMap(p => Object.keys(p.specifications)))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Сравнение товаров</h1>
            <p className="text-muted-foreground">
              Сравните характеристики и выберите лучший вариант
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="font-semibold text-lg">Характеристики</div>
                {compareProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-3">
                        <Icon name="Star" size={14} className="fill-accent text-accent" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <p className="text-2xl font-bold mb-4">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </p>
                      <div className="space-y-2">
                        <Button className="w-full" size="sm" asChild>
                          <Link to={`/product/${product.id}`}>Подробнее</Link>
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <Icon name="X" size={16} className="mr-2" />
                          Удалить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-0">
                  {allSpecs.map((spec, index) => (
                    <div
                      key={spec}
                      className={`grid grid-cols-4 gap-4 p-4 ${
                        index % 2 === 0 ? 'bg-muted/30' : ''
                      }`}
                    >
                      <div className="font-medium">{spec}</div>
                      {compareProducts.map((product) => (
                        <div key={product.id} className="text-muted-foreground">
                          {product.specifications[spec] || '—'}
                        </div>
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-between items-center">
                <Button variant="outline" asChild>
                  <Link to="/catalog">
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Вернуться в каталог
                  </Link>
                </Button>
                <Button variant="outline">
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить все
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
