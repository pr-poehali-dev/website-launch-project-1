import { Product } from '@/types/product';

const categories = [
  'Электроника',
  'Одежда',
  'Обувь',
  'Дом и сад',
  'Спорт',
  'Красота',
  'Детские товары',
  'Книги',
  'Игрушки',
  'Мебель',
  'Техника для дома',
  'Автотовары',
  'Продукты питания',
  'Зоотовары',
  'Канцелярия',
];

const productNames = {
  'Электроника': [
    'Смартфон', 'Ноутбук', 'Планшет', 'Наушники', 'Умные часы', 'Колонка', 
    'Клавиатура', 'Мышь', 'Монитор', 'Веб-камера', 'Микрофон', 'Роутер',
    'Powerbank', 'Зарядное устройство', 'Кабель USB-C', 'Флешка', 'SSD диск',
    'Внешний жесткий диск', 'Карта памяти', 'Фитнес-браслет'
  ],
  'Одежда': [
    'Футболка', 'Рубашка', 'Джинсы', 'Брюки', 'Куртка', 'Пальто', 'Свитер',
    'Толстовка', 'Платье', 'Юбка', 'Костюм', 'Пиджак', 'Шорты', 'Майка',
    'Водолазка', 'Жилет', 'Кардиган', 'Блузка', 'Комбинезон', 'Пуховик'
  ],
  'Обувь': [
    'Кроссовки', 'Ботинки', 'Туфли', 'Сапоги', 'Сандалии', 'Босоножки',
    'Кеды', 'Слипоны', 'Угги', 'Балетки', 'Мокасины', 'Тапочки', 'Резиновые сапоги',
    'Домашние тапки', 'Спортивные кроссовки', 'Зимние ботинки', 'Челси', 'Дерби'
  ],
  'Дом и сад': [
    'Посуда', 'Сковорода', 'Кастрюля', 'Чайник', 'Ваза', 'Подушка', 'Одеяло',
    'Постельное белье', 'Полотенце', 'Штора', 'Светильник', 'Лампа', 'Картина',
    'Зеркало', 'Коврик', 'Корзина', 'Контейнер', 'Органайзер', 'Вешалка'
  ],
  'Спорт': [
    'Гантели', 'Гиря', 'Коврик для йоги', 'Скакалка', 'Эспандер', 'Велосипед',
    'Самокат', 'Ролики', 'Скейтборд', 'Мяч футбольный', 'Мяч баскетбольный',
    'Ракетка теннисная', 'Боксерские перчатки', 'Шахматы', 'Шашки', 'Дартс'
  ],
  'Красота': [
    'Крем для лица', 'Крем для рук', 'Шампунь', 'Кондиционер', 'Маска для волос',
    'Гель для душа', 'Скраб', 'Сыворотка', 'Тоник', 'Мицеллярная вода', 'Помада',
    'Тени', 'Тушь', 'Лак для ногтей', 'Парфюм', 'Дезодорант', 'Бритва', 'Фен'
  ],
  'Детские товары': [
    'Конструктор', 'Кукла', 'Машинка', 'Пазл', 'Мягкая игрушка', 'Настольная игра',
    'Раскраска', 'Детская книга', 'Пластилин', 'Карандаши', 'Краски', 'Альбом',
    'Детская одежда', 'Подгузники', 'Бутылочка', 'Соска', 'Погремушка', 'Прорезыватель'
  ],
  'Книги': [
    'Роман', 'Детектив', 'Фантастика', 'Психология', 'Бизнес-литература',
    'Кулинарная книга', 'Справочник', 'Словарь', 'Энциклопедия', 'Комикс',
    'Учебник', 'Поэзия', 'Биография', 'История', 'Путеводитель', 'Самоучитель'
  ],
  'Игрушки': [
    'Лего', 'Робот', 'Машинка на радиоуправлении', 'Вертолет', 'Дрон', 'Кукла Барби',
    'Плюшевый мишка', 'Железная дорога', 'Игровой набор', 'Водный пистолет',
    'Мяч', 'Скакалка', 'Йо-йо', 'Спиннер', 'Слайм', 'Кинетический песок'
  ],
  'Мебель': [
    'Диван', 'Кресло', 'Стул', 'Стол', 'Кровать', 'Шкаф', 'Комод', 'Тумба',
    'Полка', 'Стеллаж', 'Вешалка', 'Зеркало', 'Матрас', 'Пуф', 'Барный стул',
    'Компьютерный стол', 'Офисное кресло', 'Гардероб', 'Прикроватная тумба'
  ],
  'Техника для дома': [
    'Пылесос', 'Утюг', 'Микроволновка', 'Мультиварка', 'Блендер', 'Миксер',
    'Тостер', 'Чайник электрический', 'Кофеварка', 'Соковыжималка', 'Мясорубка',
    'Вентилятор', 'Обогреватель', 'Увлажнитель', 'Весы', 'Электрогриль'
  ],
  'Автотовары': [
    'Автомобильный пылесос', 'Видеорегистратор', 'Держатель для телефона',
    'Автомобильное зарядное', 'Коврики', 'Чехлы на сиденья', 'Ароматизатор',
    'Омыватель стекол', 'Щетки стеклоочистителя', 'Масло моторное', 'Автошампунь'
  ],
  'Продукты питания': [
    'Кофе', 'Чай', 'Шоколад', 'Печенье', 'Конфеты', 'Макароны', 'Крупа',
    'Мука', 'Сахар', 'Соль', 'Масло', 'Консервы', 'Варенье', 'Мед', 'Орехи'
  ],
  'Зоотовары': [
    'Корм для собак', 'Корм для кошек', 'Лоток', 'Наполнитель', 'Поводок',
    'Ошейник', 'Игрушка для собак', 'Когтеточка', 'Миска', 'Лежанка', 'Переноска'
  ],
  'Канцелярия': [
    'Ручка', 'Карандаш', 'Тетрадь', 'Блокнот', 'Ежедневник', 'Папка',
    'Файлы', 'Степлер', 'Скотч', 'Клей', 'Ножницы', 'Линейка', 'Маркер',
    'Корректор', 'Стикеры', 'Скрепки', 'Калькулятор', 'Точилка'
  ],
};

const brands = [
  'Samsung', 'Apple', 'Xiaomi', 'Sony', 'LG', 'Philips', 'Bosch', 'Nike', 'Adidas',
  'Puma', 'Reebok', 'Zara', 'H&M', 'IKEA', 'Lego', 'Hasbro', 'Mattel', 'Dell',
  'HP', 'Lenovo', 'Asus', 'MSI', 'Canon', 'Nikon', 'GoPro', 'Xiaomi', 'Huawei',
  'Honor', 'Realme', 'OnePlus', 'Google', 'Amazon', 'JBL', 'Bose', 'Sennheiser',
  'Logitech', 'Razer', 'SteelSeries', 'HyperX', 'Corsair', 'Kingston', 'Seagate',
  'Western Digital', 'SanDisk', 'Transcend', 'Panasonic', 'Braun', 'Rowenta'
];

const adjectives = [
  'Pro', 'Ultra', 'Max', 'Plus', 'Premium', 'Elite', 'Advanced', 'Smart',
  'Classic', 'Modern', 'Deluxe', 'Supreme', 'Mega', 'Super', 'Extreme',
  'Power', 'Turbo', 'Sport', 'Active', 'Dynamic', 'Style', 'Fashion',
  'Comfort', 'Luxury', 'Essential', 'Basic', 'Standard', 'Special', 'Limited'
];

const categoryImages: Record<string, string[]> = {
  'Электроника': [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500',
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
  ],
  'Одежда': [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
  ],
  'Обувь': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500',
    'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500',
  ],
  'Дом и сад': [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500',
    'https://images.unsplash.com/photo-1585128719036-3996a8c5c2ac?w=500',
    'https://images.unsplash.com/photo-1598300188916-ddf5d4bec6b3?w=500',
    'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=500',
  ],
  'Спорт': [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
    'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=500',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=500',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500',
    'https://images.unsplash.com/photo-1593329231925-b0d4c95effae?w=500',
    'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=500',
  ],
  'Красота': [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500',
    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
    'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=500',
    'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500',
  ],
  'Детские товары': [
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500',
    'https://images.unsplash.com/photo-1558877385-69ea1c0f1b2e?w=500',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500',
    'https://images.unsplash.com/photo-1553787762-5e9add2f817c?w=500',
    'https://images.unsplash.com/photo-1549563336-94bce512f6c8?w=500',
    'https://images.unsplash.com/photo-1560582861-45078880e48e?w=500',
    'https://images.unsplash.com/photo-1605286994840-88d0cc5f1b46?w=500',
  ],
  'Книги': [
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=500',
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500',
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500',
  ],
  'Игрушки': [
    'https://images.unsplash.com/photo-1558877385-69ea1c0f1b2e?w=500',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500',
    'https://images.unsplash.com/photo-1560582861-45078880e48e?w=500',
    'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500',
    'https://images.unsplash.com/photo-1580870069867-74c57ee60d07?w=500',
    'https://images.unsplash.com/photo-1605286994840-88d0cc5f1b46?w=500',
    'https://images.unsplash.com/photo-1553787762-5e9add2f817c?w=500',
  ],
  'Мебель': [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500',
    'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=500',
    'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500',
  ],
  'Техника для дома': [
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500',
    'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=500',
    'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500',
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
    'https://images.unsplash.com/photo-1545259742-24c4d86d57f3?w=500',
    'https://images.unsplash.com/photo-1554755408-2650361cbe4e?w=500',
    'https://images.unsplash.com/photo-1560439514-e960a3ef5019?w=500',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
  ],
  'Автотовары': [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500',
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500',
    'https://images.unsplash.com/photo-1449130015084-2dc954a6d6f5?w=500',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500',
    'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=500',
  ],
  'Продукты питания': [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500',
    'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500',
    'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500',
    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500',
    'https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=500',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500',
    'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500',
  ],
  'Зоотовары': [
    'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500',
    'https://images.unsplash.com/photo-1581888227599-779811939961?w=500',
    'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500',
    'https://images.unsplash.com/photo-1619019127241-1664155d4565?w=500',
    'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500',
    'https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?w=500',
  ],
  'Канцелярия': [
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500',
    'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=500',
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500',
    'https://images.unsplash.com/photo-1606828377778-ff6746b29a93?w=500',
    'https://images.unsplash.com/photo-1588939797921-4464f9de6834?w=500',
    'https://images.unsplash.com/photo-1587467512961-120760940665?w=500',
    'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=500',
    'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500',
  ],
};

function generateProducts(): Product[] {
  const products: Product[] = [];
  let productId = 1;

  categories.forEach(category => {
    const names = productNames[category as keyof typeof productNames] || [];
    const productsPerName = Math.ceil(1200 / (categories.length * names.length));
    const images = categoryImages[category] || [];

    names.forEach(baseName => {
      for (let i = 0; i < productsPerName; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const variant = Math.floor(Math.random() * 100) + 1;
        
        const basePrice = Math.floor(Math.random() * 100000) + 500;
        const hasDiscount = Math.random() > 0.7;
        const price = hasDiscount ? Math.floor(basePrice * 0.85) : basePrice;
        const oldPrice = hasDiscount ? basePrice : undefined;

        const rating = Number((4 + Math.random()).toFixed(1));
        const reviewsCount = Math.floor(Math.random() * 500) + 1;
        
        const imageUrl = images.length > 0 
          ? images[Math.floor(Math.random() * images.length)]
          : `https://picsum.photos/seed/${productId}/400/400`;
        
        products.push({
          id: String(productId++),
          name: `${baseName} ${brand} ${adj} ${variant}`,
          price,
          oldPrice,
          image: imageUrl,
          category,
          rating,
          reviewsCount,
          description: `Качественный товар ${baseName.toLowerCase()} от бренда ${brand}. Модель ${adj} ${variant} сочетает в себе надежность, функциональность и стильный дизайн.`,
          specifications: {
            'Бренд': brand,
            'Модель': `${adj} ${variant}`,
            'Категория': category,
            'Артикул': `${brand.toUpperCase()}-${variant}${productId}`,
            'Гарантия': '12 месяцев',
          },
          inStock: Math.random() > 0.1,
        });
      }
    });
  });

  return products.slice(0, 1200);
}

export const products: Product[] = generateProducts();