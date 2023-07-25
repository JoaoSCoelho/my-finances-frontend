import Loading from '@/components/Loading/Loading';
import { UseStateReturn } from '@/types/UseStateReturn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { AiFillHome, AiOutlineUnorderedList } from 'react-icons/ai';

type Button = {
  href: string;
  icon: ReactNode;
};

interface IButtonsProps {
  loadingOnState: UseStateReturn<string | null>;
  buttonClassName?: string | ((isActive: boolean, href: string) => string);
}

export default function Buttons({
  loadingOnState: [loadingOn, setLoadingOn],
  buttonClassName,
}: IButtonsProps) {
  const pathname = usePathname();

  const buttons: Button[] = [
    {
      href: '/dashboard',
      icon: <AiFillHome />,
    },
    {
      href: '/dashboard/transactions',
      icon: <AiOutlineUnorderedList />,
    },
  ];

  return (
    <>
      {buttons.map((button) => {
        const isActive = pathname === button.href;
        const className =
          typeof buttonClassName === 'string'
            ? buttonClassName
            : buttonClassName?.(isActive, button.href);

        return (
          <Link
            title={`Ir para ${button.href}`}
            onClick={() => (isActive ? setLoadingOn(null) : setLoadingOn(button.href))}
            key={button.href}
            href={button.href}
            className={className}
          >
            {loadingOn === button.href ? <Loading /> : button.icon}
          </Link>
        );
      })}
    </>
  );
}
