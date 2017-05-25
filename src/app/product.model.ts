class Product {
  constructor(product: any) {
    if(product !== Object(product)) {
      return;
    }
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.image = product.image;
    this.price = product.price;
  }
}
