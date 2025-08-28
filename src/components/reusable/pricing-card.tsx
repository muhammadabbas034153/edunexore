import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PricingCardProps = {
  tier: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
};

export function PricingCard({ tier, price, period, description, features, isFeatured = false }: PricingCardProps) {
  return (
    <div className={`rounded-2xl p-8 border ${isFeatured ? 'border-sky-500 shadow-xl' : 'border-slate-200 shadow-sm'} bg-white`}>
      <h3 className="text-lg font-semibold text-slate-700">{tier}</h3>
      <p className="mt-4 text-4xl font-bold tracking-tight text-slate-900">{price}</p>
      <p className="text-sm text-slate-500">{period}</p>
      <p className="mt-6 text-sm text-slate-600">{description}</p>
      <ul role="list" className="mt-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-emerald-500" />
            <span className="text-slate-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className={`w-full mt-8 ${isFeatured ? '' : 'bg-slate-800 hover:bg-slate-900'}`} size="lg">
        Book Now
      </Button>
    </div>
  );
}