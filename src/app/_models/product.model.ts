export class Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;

  constructor(product: any) {
    if(product !== Object(product)) {
      return;
    }
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.image = product.image;
    this.price = product.price;
    this.quantity = product.quantity;
  }
}
