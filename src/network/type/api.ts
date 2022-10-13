import { AxiosPromise } from "axios";
export interface AddPrefix {
  (path: string): string;
}
export interface ApiHandler {
  (options?: any): AxiosPromise<any>;
}
