export interface StateField {
  name: string;
  label: string;
  value: string | boolean;
  type: string;
  error: string | null;
  touched: boolean;
}

export interface StateForm {
  fields: Record<string, StateField>; //  { [key: string]: StateOfField } 
  isSubmitting: boolean;
}

export enum ReducerActionName { 
    FieldChange = "FIELD_CHANGE", 
    FieldBlur = "FIELD_BLUR", 
    FormSubmit = "FORM_SUBMIT", 
    FormSubmitSuccess = "SUBMIT_SUCCESS",
    FormSubmitError = "SUBMIT_ERROR",
    FormReset = "RESET_FORM",  
  }

export type ReducerAction = 
  | { type: ReducerActionName.FieldChange; payload: { field: string; value: string } }
  | { type: ReducerActionName.FieldBlur; payload: { field: string } }
  | { type: ReducerActionName.FormSubmit }
  | { type: ReducerActionName.FormSubmitSuccess }
  | { type: ReducerActionName.FormSubmitError; payload: { field: string; error: string } }
  | { type: ReducerActionName.FormReset };
