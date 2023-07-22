export interface IGeneralApiError {
  code: number;
  name: string;
  error: string;
  param1?: string;
  param2?: string;
  paramName?: string;
  param?: any;
  reason?: string;
  expected?: string;
  permissions?: string | string[];
  entityName?: string;
  propName?: string;
  prop?: any;
}
