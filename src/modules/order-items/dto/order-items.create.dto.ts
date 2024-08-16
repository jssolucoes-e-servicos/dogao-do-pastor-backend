export class OrderItemsCreateDto {
  orderId: string;
  amount: number;
  isComplete?: boolean;
  potato?: boolean;
  ketchup?: boolean;
  peas?: boolean;
  mayonnaise?: boolean;
  corn?: boolean;
  redSauce?: boolean;
  cheeseSauce?: boolean;
  mustard?: boolean;
  bread?: boolean;
  gratedCheese?: boolean;
  sausage?: boolean;
}
