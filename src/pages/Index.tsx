import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const DONATION_CASES = [
  {
    id: 1,
    name: 'Стартовый кейс',
    price: 100,
    icon: 'Package',
    color: 'text-green-500',
    rewards: [
      { name: 'Алмазы', amount: '16 шт', chance: 30 },
      { name: 'Железная броня', amount: 'Полный сет', chance: 40 },
      { name: 'Еда', amount: '64 стейка', chance: 30 }
    ]
  },
  {
    id: 2,
    name: 'Золотой кейс',
    price: 250,
    icon: 'Gem',
    color: 'text-yellow-500',
    rewards: [
      { name: 'Алмазная броня', amount: 'Полный сет', chance: 25 },
      { name: 'Зачарованное оружие', amount: 'Меч Острота IV', chance: 35 },
      { name: 'Изумруды', amount: '32 шт', chance: 40 }
    ]
  },
  {
    id: 3,
    name: 'Алмазный кейс',
    price: 500,
    icon: 'Crown',
    color: 'text-cyan-500',
    rewards: [
      { name: 'Незеритовая броня', amount: 'Полный сет', chance: 20 },
      { name: 'Элитра', amount: '1 шт', chance: 15 },
      { name: 'Зачарованные инструменты', amount: 'Набор', chance: 40 },
      { name: 'Редкие блоки', amount: '64 шт', chance: 25 }
    ]
  },
  {
    id: 4,
    name: 'Легендарный кейс',
    price: 1000,
    icon: 'Sparkles',
    color: 'text-purple-500',
    rewards: [
      { name: 'Полный незеритовый сет', amount: 'С зачарованиями', chance: 30 },
      { name: 'Трезубец', amount: 'С зачарованиями', chance: 20 },
      { name: 'Маяк', amount: '1 шт', chance: 10 },
      { name: 'Редкие головы', amount: '5 шт', chance: 25 },
      { name: 'Бонус на сервере', amount: '7 дней VIP', chance: 15 }
    ]
  }
];

const Index = () => {
  const [selectedCase, setSelectedCase] = useState<typeof DONATION_CASES[0] | null>(null);
  const [playerNickname, setPlayerNickname] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePurchase = () => {
    if (!playerNickname.trim()) {
      toast.error('Введите ваш игровой ник!');
      return;
    }
    
    toast.success(`Донат отправлен! ${selectedCase?.name} будет доставлен игроку ${playerNickname} после оплаты.`);
    setPlayerNickname('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-6 p-4 bg-stone-800/50 border-4 border-stone-700 hover-lift">
            <Icon name="Pickaxe" size={48} className="text-primary" />
          </div>
          <h1 className="pixel-font text-3xl md:text-5xl lg:text-6xl mb-4 text-primary">
            MINECRAFT ДОНАТ
          </h1>
          <p className="pixel-font text-xs md:text-sm text-secondary max-w-2xl mx-auto leading-relaxed">
            Поддержи сервер и получи эксклюзивные награды
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {DONATION_CASES.map((caseItem) => (
            <Card 
              key={caseItem.id}
              className="bg-stone-800/90 border-4 border-stone-700 hover-lift cursor-pointer transition-all"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-6 bg-stone-900/50 border-2 border-stone-700 w-fit">
                  <Icon name={caseItem.icon as any} size={48} className={caseItem.color} />
                </div>
                <CardTitle className="pixel-font text-lg text-foreground">
                  {caseItem.name}
                </CardTitle>
                <CardDescription className="pixel-font text-2xl font-bold mt-2" style={{ color: caseItem.color.replace('text-', '') }}>
                  {caseItem.price} ₽
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <p className="pixel-font text-xs text-muted-foreground">Возможные награды:</p>
                  {caseItem.rewards.map((reward, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <Icon name="ChevronRight" size={16} className={caseItem.color} />
                      <div className="flex-1">
                        <p className="text-foreground">{reward.name}</p>
                        <p className="text-muted-foreground text-[10px]">
                          {reward.amount} • Шанс {reward.chance}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full pixel-font text-xs py-6 border-4 border-stone-900 hover-lift"
                      onClick={() => setSelectedCase(caseItem)}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Купить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-stone-800 border-4 border-stone-700 max-w-md">
                    <DialogHeader>
                      <DialogTitle className="pixel-font text-xl text-center text-primary">
                        {selectedCase?.name}
                      </DialogTitle>
                      <DialogDescription className="pixel-font text-sm text-center text-secondary">
                        Цена: {selectedCase?.price} ₽
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="nickname" className="pixel-font text-xs text-foreground">
                          Игровой ник
                        </Label>
                        <Input
                          id="nickname"
                          placeholder="Steve"
                          value={playerNickname}
                          onChange={(e) => setPlayerNickname(e.target.value)}
                          className="bg-stone-900 border-2 border-stone-700 text-foreground"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="pixel-font text-xs text-foreground">Способ оплаты</Label>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                          <div className="flex items-center space-x-2 p-3 bg-stone-900/50 border-2 border-stone-700">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                              <Icon name="CreditCard" size={20} className="text-primary" />
                              <span className="text-sm">Банковская карта</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 bg-stone-900/50 border-2 border-stone-700">
                            <RadioGroupItem value="qiwi" id="qiwi" />
                            <Label htmlFor="qiwi" className="flex items-center gap-2 cursor-pointer flex-1">
                              <Icon name="Wallet" size={20} className="text-primary" />
                              <span className="text-sm">QIWI кошелёк</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 bg-stone-900/50 border-2 border-stone-700">
                            <RadioGroupItem value="yoomoney" id="yoomoney" />
                            <Label htmlFor="yoomoney" className="flex items-center gap-2 cursor-pointer flex-1">
                              <Icon name="Coins" size={20} className="text-primary" />
                              <span className="text-sm">ЮMoney</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button 
                        onClick={handlePurchase}
                        className="w-full pixel-font text-sm py-6 border-4 border-stone-900 hover-lift"
                      >
                        <Icon name="Zap" size={20} className="mr-2" />
                        Оплатить {selectedCase?.price} ₽
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="text-center space-y-6">
          <div className="inline-flex items-center gap-4 p-6 bg-stone-800/50 border-4 border-stone-700">
            <Icon name="Server" size={32} className="text-primary" />
            <div className="text-left">
              <p className="pixel-font text-xs text-foreground">IP сервера:</p>
              <p className="pixel-font text-sm text-secondary">play.yourserver.ru</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="border-2 border-stone-700 hover:bg-stone-700">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="border-2 border-stone-700 hover:bg-stone-700">
              <Icon name="Users" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="border-2 border-stone-700 hover:bg-stone-700">
              <Icon name="Mail" size={20} />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
