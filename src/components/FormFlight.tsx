import { useReducer, useCallback } from "react";
import { produce } from "immer";

import { StateForm, ReducerAction, ReducerActionName } from "./StateManager";
import { ComponentField } from "./ComponentField";

const initialState: StateForm = {
  fields: {
    aircraftType: { name: "aircraftType", label: "Aircraft type", value: "", type: "text", error: "", touched: false },
    registration: { name: "registration", label: "Registration", value: "", type: "text", error: "", touched: false },
    departure: { name: "departure", label: "Departure airfield", value: "", type: "text", error: "", touched: false },
    arrival: { name: "arrival", label: "Arrival airfield", value: "", type: "text", error: "", touched: false },
    departureTime: { name: "departureTime", label: "Departure time", value: "", type: "datetime-local", error: "", touched: false },
    arrivalTime: { name: "arrivalTime", label: "Arrival time", value: "", type: "datetime-local", error: "", touched: false },
    totalTime: { name: "totalTime", label: "Total time", value: "", type: "number", error: "", touched: false },
    pilotInCommand: { name: "pilotInCommand", label: "Pilot in command", value: true, type: "checkbox", error: "", touched: false },
    remarks: { name: "remarks", label: "Remarks", value: "", type: "text", error: "", touched: false },
  },
  isSubmitting: false,
};

const validateField = (field: string, value: string): string => {
  switch (field) {
    case "aircraftType":
      return value.length < 3 ? "Username must be at least 3 characters" : "";
    case "departureTime":
      return !value.includes("@") ? "Please enter a valid email" : "";
    case "arrivalTime":
      return value.length < 6 ? "Password must be at least 6 characters" : "";
    default:
      return "";
  }
};

const formReducer = produce((draft: StateForm, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionName.FieldChange: {
      const { field, value } = action.payload;
      draft.fields[field].value = value;
      draft.fields[field].error = validateField(field, value);
      break;
    }
    
    case ReducerActionName.FieldBlur: {
      const { field } = action.payload;
      draft.fields[field].touched = true;
      break;
    }
    
    case ReducerActionName.FormSubmit: {
      draft.isSubmitting = true;
      break;
    }
    
    case ReducerActionName.FormSubmitSuccess: {
      return initialState;
    }
    
    case ReducerActionName.FormSubmitError: {
      draft.isSubmitting = false;
      //draft.errors = action.payload.errors;
      break;
    }
    
    case ReducerActionName.FormReset: {
      return initialState;
    }
  }
});

const FormFlight = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: ReducerActionName.FieldChange,
      payload: { field: name, value },
    });
  }, []);
  
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    dispatch({
      type: ReducerActionName.FieldBlur,
      payload: { field: name },
    });
  }, []);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    /*
    const hasErrors = Object.values(state.errors).some(error => error !== "");
    if (hasErrors) return;
    
    dispatch({ type: StateReducerActionName.FormSubmit });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: StateReducerActionName.FormSubmitSuccess });
      alert("Form submitted successfully!");
    } catch (error) {
      dispatch({
        type: StateReducerActionName.FormSubmitError,
        payload: { errors: initialState.errors },
      });
    }*/
  }, [state.errors]);
  
  const handleReset = useCallback(() => {
    dispatch({ type: ReducerActionName.FormReset });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ComponentField
        stateField={state.fields.aircraftType}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      
      <ComponentField
        stateField={state.fields.registration}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        stateField={state.fields.departure}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        stateField={state.fields.arrival}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        stateField={state.fields.departureTime}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      
      <ComponentField
        stateField={state.fields.arrivalTime}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        stateField={state.fields.pilotInCommand}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        stateField={state.fields.remarks}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <div className="space-x-4">
        <button
          type="submit"
          disabled={state.isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {state.isSubmitting ? "Submitting..." : "Submit"}
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default FormFlight;