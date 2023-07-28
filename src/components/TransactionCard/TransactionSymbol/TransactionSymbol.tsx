import { TransactionTypes } from '@/types/Transaction';
import { BiArrowFromBottom, BiArrowToBottom, BiTransferAlt } from 'react-icons/bi';

import styles from './TransactionSymbol.module.css';

interface ITransactionSymbolProps {
  type: TransactionTypes;
}

export default function TransactionSymbol({ type }: ITransactionSymbolProps) {
  return (
    <div className={[styles.transactionSymbol, styles[type]].join(' ')}>
      {type === 'income' ? (
        <BiArrowToBottom />
      ) : type === 'expense' ? (
        <BiArrowFromBottom />
      ) : (
        <BiTransferAlt />
      )}
    </div>
  );
}
