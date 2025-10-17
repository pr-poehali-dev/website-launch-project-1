import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { products } from '@/data/products';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<string>('popular');

  const categories = ['Все', 'Электроника', 'Одежда', 'Дом и сад', 'Спорт', 'Красота', 'Детские товары'];

  const filteredProducts = products
    .filter(p => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(p => selectedCategory === 'Все' || p.category === selectedCategory)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Каталог товаров'}
            </h1>
            <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Filter" size={18} />
                    Фильтры
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Категория</label>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <Button
                            key={cat}
                            variant={selectedCategory === cat ? 'default' : 'outline'}
                            className="w-full justify-start"
                            onClick={() => setSelectedCategory(cat)}
                          >
                            {cat}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Цена</label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="1000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                          className="w-full"
                        />
                        <p className="text-sm text-muted-foreground">
                          До {priceRange[1].toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Сортировка</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="popular">Популярные</option>
                        <option value="price-asc">Цена: по возрастанию</option>
                        <option value="price-desc">Цена: по убыванию</option>
                        <option value="rating">По рейтингу</option>
                      </select>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedCategory('Все');
                        setPriceRange([0, 100000]);
                        setSortBy('popular');
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
                      <CardContent className="p-0">
                        <div className="relative aspect-square overflow-hidden rounded-t-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.oldPrice && (
                            <Badge className="absolute top-2 right-2 bg-destructive">
                              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                            </Badge>
                          )}
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {product.category}
                            </Badge>
                            <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={16} className="fill-accent text-accent" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({product.reviewsCount})
                            </span>
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">
                              {product.price.toLocaleString('ru-RU')} ₽
                            </span>
                            {product.oldPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {product.oldPrice.toLocaleString('ru-RU')} ₽
                              </span>
                            )}
                          </div>

                          <Button className="w-full" size="sm">
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}