import { IBankAccountObject } from '@/types/BankAccount';
import { ITransactionObject } from '@/types/Transaction';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {
  BiArrowFromBottom,
  BiArrowToBottom,
  BiTransferAlt,
} from 'react-icons/bi';
import { HiArrowNarrowRight } from 'react-icons/hi';

dayjs.extend(localizedFormat);

import BRLFormat from './BRLFormat';
import styles from './TransactionCard.module.css';

interface ITransactionCardProps {
  transaction: ITransactionObject;
  bankAccounts: IBankAccountObject[];
}

export default function TransactionCard({
  transaction,
  bankAccounts,
}: ITransactionCardProps) {
  const bankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.id === transaction.bankAccountId,
  );
  const giverBankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.id === transaction.giverBankAccountId,
  );
  const receiverBankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.id === transaction.receiverBankAccountId,
  );

  return (
    <div className={`${styles.container} ${styles[transaction.type]}`}>
      <div className={styles.typeSymbol}>
        {transaction.type === 'income' ? (
          <BiArrowToBottom />
        ) : transaction.type === 'expense' ? (
          <BiArrowFromBottom />
        ) : (
          <BiTransferAlt />
        )}
      </div>
      <div>
        <strong className={styles.title}>{transaction.title}</strong>
        <div className={styles.contentInfo}>
          <div className={styles.moneyValue}>
            <BRLFormat
              value={
                transaction.type === 'expense'
                  ? transaction.spent
                  : transaction.type === 'income'
                  ? transaction.gain
                  : transaction.amount
              }
            />
          </div>
          <div className={styles.bankAccountInfo}>
            {transaction.type === 'transfer' ? (
              <>
                <div className={styles.bankAccount}>
                  {giverBankAccount!.imageURL && (
                    <img
                      src={giverBankAccount!.imageURL}
                      alt={giverBankAccount!.name}
                    />
                  )}
                  {giverBankAccount!.name}
                </div>
                <HiArrowNarrowRight className={styles.transferDirectionArrow} />
                <div className={styles.bankAccount}>
                  {receiverBankAccount!.imageURL && (
                    <img
                      src={receiverBankAccount!.imageURL}
                      alt={receiverBankAccount!.name}
                    />
                  )}
                  {receiverBankAccount!.name}
                </div>
              </>
            ) : (
              <div className={styles.bankAccount}>
                {bankAccount!.imageURL && (
                  <img src={bankAccount!.imageURL} alt={bankAccount!.name} />
                )}
                {bankAccount!.name}
              </div>
            )}
          </div>
          {/* Colocar data completa no hover */}
          <div className={styles.date}>
            {dayjs(transaction.createdTimestamp).format(
              /* 'DD/MM/YY' */ 'L LT',
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
