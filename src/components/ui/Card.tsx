import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-charcoal rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}

export default Card;

export function CardHeader({ children, className = '' }: CardProps) {
  return <div className={`p-6 border-b border-gray-200 dark:border-white/10 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: CardProps) {
  return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>;
}
