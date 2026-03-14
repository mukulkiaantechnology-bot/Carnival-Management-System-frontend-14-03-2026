import { Card, CardContent } from '../../components/ui/Card';

export default function PlaceholderPage({ title }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <Card>
        <CardContent className="py-16 text-center">
          <p className="text-lg text-slate-500 font-medium tracking-wide">
            This module is currently under development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
