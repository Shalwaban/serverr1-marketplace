import { Product, productsStorage } from './model';
import { context, ContractPromiseBatch } from "near-sdk-as";


 // buying a product
export function buyProduct(productId: string): void {
    const product = getProduct(productId);
    if (product == null) {
        throw new Error("product not found");
    }
    if (product.price.toString() != context.attachedDeposit.toString()) {
        throw new Error("attached deposit should be greater than the product's price");
    }
    if (product.available > 0){
    ContractPromiseBatch.create(product.owner).transfer(context.attachedDeposit);
    product.incrementSoldAmount();
    product.decreaseAvailableAmount();
    productsStorage.set(product.id, product);
    }
}

/* to add more available products using @ammount as input */
export function addAvailableProduct(productId: string, ammount: u32): void {
    const product = getProduct(productId);
    if (product == null) {
      throw new Error("product not found");
    }
    product.available = product.available + ammount; // adding the inputed ammount
    productsStorage.set(product.id, product);
  }
/* to reduce the number of available products using @ammount as input*/
  export function reduceAvailableProduct(productId: string, ammount: u32): void {
    const product = getProduct(productId);
    if (product == null) {
      throw new Error("product not found");
    }
    product.available = product.available - ammount;// removing the inputed ammount
    
    productsStorage.set(product.id, product);
  }

/**
 * 
 * @param product - a product to be added to the blockchain
 */
export function setProduct(product: Product): void {
    let storedProduct = productsStorage.get(product.id);
    if (storedProduct !== null) {
        throw new Error(`a product with id=${product.id} already exists`);
    }
    productsStorage.set(product.id, Product.fromPayload(product));
}


 // getting a product from the marketplace
export function getProduct(id: string): Product | null {
    return productsStorage.get(id);
}

/**
 * 
 * A function that returns an array of products for all accounts
 * 
 * @returns an array of objects that represent a product
 */
export function getProducts(): Array<Product> {
    return productsStorage.values();
}
