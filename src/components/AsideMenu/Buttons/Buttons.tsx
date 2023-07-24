import Loading from '@/components/Loading/Loading';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import { AiFillHome, AiOutlineUnorderedList } from 'react-icons/ai';

type Button = {
  href: string;
  icon: ReactNode;
};

interface IButtonsProps {
  loadingOnState: [string | null, Dispatch<SetStateAction<string | null>>];
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
