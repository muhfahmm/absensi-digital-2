interface CardProps {
  title: string;
  value: string | number;
  icon?: string;
  color?: 'primary' | 'secondary' | 'danger' | 'warning';
  children?: React.ReactNode;
}

export default function Card({
  title,
  value,
  icon,
  color = 'primary',
  children,
}: CardProps) {
  const colorClasses = {
    primary: 'bg-blue-50 border-blue-200',
    secondary: 'bg-green-50 border-green-200',
    danger: 'bg-red-50 border-red-200',
    warning: 'bg-amber-50 border-amber-200',
  };

  const textColorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-amber-600',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`${textColorClasses[color]} text-3xl font-bold mt-2`}>
            {value}
          </p>
        </div>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
