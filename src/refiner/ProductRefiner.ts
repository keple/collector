import { InfoRefiner } from "./InfoRefiner";
import { Product } from "../model/raw/Product";
import { RefinedProduct} from '../model/refined/RefinedProduct'
export class ProductRefiner implements InfoRefiner<RefinedProduct, Product>{
  refineInfo(source: Array<Product>): Array<RefinedProduct> {
    return undefined;
  }


}