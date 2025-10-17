import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  
  const cartData = location.state?.cartData || { items: [], totalAmount: 0 };
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    delivery: 'courier',
    payment: 'card'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        delivery: formData.delivery,
        address: formData.address,
        payment: formData.payment,
        comment: formData.comment,
        totalAmount: cartData.totalAmount,
        items: cartData.items.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        }))
      };

      const orderResponse = await fetch('https://functions.poehali.dev/d3d75687-e85e-4e1a-a5be-6133da9d382a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const orderResult = await orderResponse.json();

      await fetch('https://functions.poehali.dev/4ae0281f-43ab-4221-a5de-a8ad37489c97', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderData,
          orderNumber: orderResult.orderNumber
        })
      });

      if (formData.payment === 'card') {
        const paymentResponse = await fetch('https://functions.poehali.dev/f714a1a1-83ec-4237-848f-e88477270d2f', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: cartData.totalAmount,
            orderNumber: orderResult.orderNumber,
            description: `Оплата заказа ${orderResult.orderNumber}`
          })
        });

        const paymentResult = await paymentResponse.json();
        
        if (paymentResult.confirmationUrl) {
          window.location.href = paymentResult.confirmationUrl;
          return;
        }
      }

      toast({
        title: "Заказ оформлен!",
        description: `Номер заказа: ${orderResult.orderNumber}. Мы свяжемся с вами в ближайшее время.`,
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось оформить заказ. Попробуйте снова.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Оформление заказа</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="User" size={24} />
                  Контактные данные
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="example@mail.ru"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Truck" size={24} />
                  Доставка
                </h2>
                
                <RadioGroup
                  value={formData.delivery}
                  onValueChange={(value) => updateField('delivery', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="courier" id="courier" />
                    <Label htmlFor="courier" className="cursor-pointer">
                      Курьером (бесплатно)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="cursor-pointer">
                      Самовывоз из магазина
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="post" id="post" />
                    <Label htmlFor="post" className="cursor-pointer">
                      Почта России
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-4">
                  <Label htmlFor="address">Адрес доставки *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="ул. Ленина, д. 1, кв. 10"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="CreditCard" size={24} />
                  Оплата
                </h2>
                
                <RadioGroup
                  value={formData.payment}
                  onValueChange={(value) => updateField('payment', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer">
                      Банковской картой
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer">
                      Наличными при получении
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="cursor-pointer">
                      Электронный кошелёк
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} />
                  Комментарий к заказу
                </h2>
                
                <Textarea
                  value={formData.comment}
                  onChange={(e) => updateField('comment', e.target.value)}
                  placeholder="Дополнительная информация для курьера..."
                  rows={4}
                />
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/cart')}
                className="flex-1"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад в корзину
              </Button>
              <Button type="submit" className="flex-1" size="lg" disabled={submitting}>
                {submitting ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Оформление...
                  </>
                ) : (
                  <>
                    <Icon name="Check" size={20} className="mr-2" />
                    Подтвердить заказ
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}