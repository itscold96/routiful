import S from './TypeIcon.module.scss';
import { CircleAlert, CircleCheck, CircleX, LucideProps } from 'lucide-react';
import { Icon } from 'types/icon';

interface TypeIconProps {
  type: Icon;
}

const iconComponentObject: Record<
  Partial<Icon>,
  React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
> = {
  success: CircleCheck,
  warn: CircleAlert,
  error: CircleX,
};

export default function TypeIcon({ type }: TypeIconProps) {
  const Icon = iconComponentObject[type];
  return <Icon size={30} strokeWidth={2} className={S.icon} />;
}
