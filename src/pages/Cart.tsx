import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { products } from '@/data/products';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { product: products[0], quantity: 1 },
    { product: products[1], quantity: 2 },
  ]);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">Корзина пуста</h1>
            <p className="text-muted-foreground">
              Добавьте товары в корзину, чтобы оформить заказ
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-8">Корзина покупок</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(({ product, quantity }) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Link
                        to={`/product/${product.id}`}
                        className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold hover:text-primary line-clamp-2 mb-1">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.category}
                        </p>
                        <p className="text-xl font-bold">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(product.id)}
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, -1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-12 text-center font-semibold">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>

                        <p className="font-bold text-lg">
                          {(product.price * quantity).toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Итого</h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Товары ({cartItems.length})</span>
                      <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доставка</span>
                      <span className="text-secondary font-semibold">Бесплатно</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>К оплате</span>
                      <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Оформить заказ
                  </Button>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="ShieldCheck" size={16} className="text-secondary" />
                      <span className="text-muted-foreground">Безопасная оплата</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Truck" size={16} className="text-primary" />
                      <span className="text-muted-foreground">Быстрая доставка</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="RotateCcw" size={16} className="text-accent" />
                      <span className="text-muted-foreground">Возврат 14 дней</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link to="/catalog">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Продолжить покупки
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
