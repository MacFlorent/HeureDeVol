export interface StateFields { [key: string]: string | boolean } // type Record<string, string>;
export interface StateTouched { [key: string]: boolean } // type Record<string, boolean>;
export interface StateErrors { [key: string]: string } // type  Record<string, string>;

export interface StateInterface {
  fields: StateFields;
  touched: StateTouched;
  errors: StateErrors;
  isSubmitting: boolean;
}

export enum StateActionName { 
    FieldChange = "FIELD_CHANGE", 
    FieldBlur = "FIELD_BLUR", 
    FormSubmit = "FORM_SUBMIT", 
    FormSubmitSuccess = "SUBMIT_SUCCESS",
    FormSubmitError = "SUBMIT_ERROR",
    FormReset = "RESET_FORM",  
  }

export type StateAction = 
  | { type: StateActionName.FieldChange; payload: { field: string; value: string } }
  | { type: StateActionName.FieldBlur; payload: { field: string } }
  | { type: StateActionName.FormSubmit }
  | { type: StateActionName.FormSubmitSuccess }
  | { type: StateActionName.FormSubmitError; payload: { errors: StateErrors } }
  | { type: StateActionName.FormReset };
