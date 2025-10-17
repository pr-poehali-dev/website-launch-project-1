import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: number;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryType: string;
  deliveryAddress: string;
  paymentType: string;
  paymentStatus: string;
  orderStatus: string;
  totalAmount: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d3d75687-e85e-4e1a-a5be-6133da9d382a');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, orderStatus: string, paymentStatus?: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/d3d75687-e85e-4e1a-a5be-6133da9d382a', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, orderStatus, paymentStatus })
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Статус обновлён",
          description: "Статус заказа успешно изменён",
        });
        fetchOrders();
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус заказа",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-blue-500',
      'processing': 'bg-yellow-500',
      'completed': 'bg-green-500',
      'cancelled': 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-500',
      'paid': 'bg-green-500',
      'failed': 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Загрузка заказов...</p>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Панель администратора</h1>
              <p className="text-muted-foreground">Управление заказами интернет-магазина</p>
            </div>
            <Button onClick={fetchOrders}>
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon name="ShoppingCart" size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Всего заказов</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Icon name="CheckCircle" size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Оплачено</p>
                    <p className="text-2xl font-bold">
                      {orders.filter(o => o.paymentStatus === 'paid').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Icon name="DollarSign" size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Общая сумма</p>
                    <p className="text-2xl font-bold">
                      {orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Icon name="Package" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Заказов пока нет</h3>
                <p className="text-muted-foreground">
                  Когда клиенты начнут оформлять заказы, они появятся здесь
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Заказ {order.orderNumber}
                          <Badge className={getStatusColor(order.orderStatus)}>
                            {order.orderStatus === 'new' && 'Новый'}
                            {order.orderStatus === 'processing' && 'В обработке'}
                            {order.orderStatus === 'completed' && 'Выполнен'}
                            {order.orderStatus === 'cancelled' && 'Отменён'}
                          </Badge>
                          <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                            {order.paymentStatus === 'pending' && 'Ожидает оплаты'}
                            {order.paymentStatus === 'paid' && 'Оплачен'}
                            {order.paymentStatus === 'failed' && 'Ошибка оплаты'}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          {order.totalAmount.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={16} className="text-muted-foreground" />
                          <span className="font-medium">{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Phone" size={16} className="text-muted-foreground" />
                          <span>{order.customerPhone}</span>
                        </div>
                        {order.customerEmail && (
                          <div className="flex items-center gap-2">
                            <Icon name="Mail" size={16} className="text-muted-foreground" />
                            <span>{order.customerEmail}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Truck" size={16} className="text-muted-foreground" />
                          <span>{order.deliveryType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={16} className="text-muted-foreground" />
                          <span className="text-sm">{order.deliveryAddress}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                          <span>{order.paymentType}</span>
                        </div>
                      </div>
                    </div>

                    {order.comment && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          <strong>Комментарий:</strong> {order.comment}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                          <label className="text-sm font-medium mb-2 block">
                            Статус заказа
                          </label>
                          <Select
                            value={order.orderStatus}
                            onValueChange={(value) => updateOrderStatus(order.id, value, order.paymentStatus)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">Новый</SelectItem>
                              <SelectItem value="processing">В обработке</SelectItem>
                              <SelectItem value="completed">Выполнен</SelectItem>
                              <SelectItem value="cancelled">Отменён</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex-1 min-w-[200px]">
                          <label className="text-sm font-medium mb-2 block">
                            Статус оплаты
                          </label>
                          <Select
                            value={order.paymentStatus}
                            onValueChange={(value) => updateOrderStatus(order.id, order.orderStatus, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Ожидает оплаты</SelectItem>
                              <SelectItem value="paid">Оплачен</SelectItem>
                              <SelectItem value="failed">Ошибка оплаты</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}