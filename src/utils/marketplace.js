import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createProduct(product) {
  product.id = uuid4();
  product.price = parseNearAmount(product.price + "");
  return window.contract.setProduct({ product });
}

export function addAvailableProduct(Id, _ammount) {
  const ammount_ =  parseInt(_ammount);
  return window.contract.addAvailableProduct({ productId: Id, ammount: ammount_ }, GAS );
}

export function reduceAvailableProduct( Id, _ammount ) {
  const ammount_ =  parseInt(_ammount);
  return window.contract.reduceAvailableProduct( { productId: Id, ammount: ammount_ }, GAS );
}

export function getProducts() {
  return window.contract.getProducts();
}

export async function buyProduct({ id, price }) {
  await window.contract.buyProduct({ productId: id }, GAS, price);
}
