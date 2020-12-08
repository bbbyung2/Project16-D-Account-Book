import { IncomeRequest } from '../../../types/income';
import { ExpenditureRequest } from '../../../types/expenditure';
import { ITransaction } from '../../../types/lineChartValue';
import { ITransactionForm } from '../../../types/TransactionForm';
import { privateEncrypt } from 'crypto';
import { AccountRequest } from '../../../types/account';

export const convertToIncome = (incomeInput: ITransactionForm, accountbookId: number): IncomeRequest => {
  const { price, categories, accounts, content, date, memo } = incomeInput;
  if (categories === undefined || accounts === undefined) {
    throw new Error('category와 accounts는 둘중 하나는 선택되어야 합니다.');
  }
  return {
    accountbookId,
    incomeCategoryId: parseInt(categories),
    accountId: parseInt(accounts),
    amount: typeof price === 'string' ? parseInt(price as string) : price,
    content,
    date,
    memo,
  };
};
export const convertToExpenditure = (expenditureInput: ITransactionForm, accountbookId: number): ExpenditureRequest => {
  const { price, categories, accounts, content, date, memo } = expenditureInput;

  if (categories === undefined || accounts === undefined) {
    throw new Error('category와 accounts는 둘중 하나는 선택되어야 합니다.');
  }

  return {
    accountbookId,
    expenditureCategoryId: parseInt(categories),
    accountId: parseInt(accounts),
    amount: typeof price === 'string' ? parseInt(price as string) : price,
    place: content,
    date,
    memo,
  };
};
export const convertToAccount = (accountbookId: number, name: string, color: string): AccountRequest => {
  return {
    accountbookId,
    name,
    color,
  };
};
