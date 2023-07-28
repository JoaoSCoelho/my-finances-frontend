import * as yup from 'yup';

export const transactionTitleSchema = yup
  .string()
  .required('Campo obrigatório')
  .min(3, 'Mínimo de 3 caracteres')
  .max(100, 'Máximo de 100 caracteres')
  .matches(
    /^[\dA-Za-záàâãäéèêëíïìîóôõöòúùûüçñÁÀÂÃÄÉÈÊËÍÏÌÎÓÔÕÖÒÚÙÛÜÇÑ !@#$%¨&*_()+=\-:/'",§<>.|`´^~ºª?°]+$/gi,
    'Pode ter apenas caracteres alfanuméricos (alguns deles acentuados), espaços, underlines e alguns caracteres especiais',
  );

export const noNegativeAmountSchema = yup
  .number()
  .required('Campo obrigatório')
  .min(0, 'Minimo: 0')
  .max(999999999999, 'Máximo: 1 trilhão');

export const IDSchema = yup
  .string()
  .required('Campo obrigatório')
  .length(21, 'Selecione uma conta');

export const transferSchema = yup.object({
  title: transactionTitleSchema,
  amount: noNegativeAmountSchema,
  giverBankAccountId: IDSchema,
  receiverBankAccountId: IDSchema,
});

export const incomeSchema = yup.object({
  title: transactionTitleSchema,
  gain: noNegativeAmountSchema,
  bankAccountId: IDSchema,
});

export const expenseSchema = yup.object({
  title: transactionTitleSchema,
  spent: noNegativeAmountSchema,
  bankAccountId: IDSchema,
});

export const transactionSchemas = {
  income: incomeSchema,
  expense: expenseSchema,
  transfer: transferSchema,
};
