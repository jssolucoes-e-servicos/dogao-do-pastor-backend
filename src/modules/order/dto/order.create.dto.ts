export class OrderCreateDto {
  cell: {
    id: string;
  };
  customer: {
    name: string;
    phone: string;
    address: string;
    reference: string;
  };
  seller: {
    name: string;
    phone: string;
  };
  order: {
    hour: string;
    observation: string;
    amount: number;
  };
}
