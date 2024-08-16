import { OrderStatusType } from 'src/shared/@types/order-status.type';

export class OrderCreateDto {
  hour: Date | string;
  editionId: string;
  cellId: string;
  ticket: string;
  customerId: string;
  amount: number;
  sellerId: string;
  status: OrderStatusType;
  observation: string;
}
