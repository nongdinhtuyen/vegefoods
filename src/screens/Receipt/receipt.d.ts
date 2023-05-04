import { Updater } from 'use-immer';

export type ReceiptState = {
  idReceiver: number;
  note: string;
  typePayment: number;
  idD?: number;
  idW?: number;
  addressInfo: any;
};

export type ReceiptProps = {
  setPay: Updater<ReceiptState>;
  pay: ReceiptState;
};
