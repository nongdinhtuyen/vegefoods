import { Updater } from "use-immer";

export type ReceiptProps = {
  setPay: Updater<{
    idReceiver: number;
    note: string;
    typePayment: number;
  }>;

  pay?: {
    idReceiver: number;
    note: string;
    typePayment: number;
  };
};
