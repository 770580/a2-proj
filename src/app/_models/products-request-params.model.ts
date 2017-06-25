export class ProductRequestParams {
  lang: string;
  offset?: number;
  count?: number;
  idList?: Array<number>;
  localize?: boolean;

  constructor(params: ProductRequestParams) {
    Object.assign(this, params);
  }
}
