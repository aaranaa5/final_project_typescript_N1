export interface ICrud {
  find(...args: any): any;
  create(...args: any): any;
  update(...args: any): any;
  delete(...args: any): any;
}
