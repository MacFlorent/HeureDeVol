import { useReducer, useCallback } from "react";
import { produce } from "immer";

import { StateInterface, StateAction, StateActionName } from "./StateManager";
import { ComponentField } from "./ComponentField";

const initialState: StateInterface = {
  fields: {
    aircraftType: "",
    registration: "",
    departure: "",
    arrival: "",
    departureTime: "",
    arrivalTime: "",
    totalTime: "",
    pilotInCommand: true,
    remarks: ""    
  },
  touched: {
    aircraftType: false,
    registration: false,
    departure: false,
    arrival: false,
    departureTime: false,
    arrivalTime: false,
    totalTime: false,
    pilotInCommand: false,
    remarks: false  
  },
  errors: {
    aircraftType: "",
    registration: "",
    departure: "",
    arrival: "",
    departureTime: "",
    arrivalTime: "",
    totalTime: "",
    pilotInCommand: "",
    remarks: "" 
  },
  isSubmitting: false,
};

const validateField = (field: string, value: string): string => {
  switch (field) {
    case "username":
      return value.length < 3 ? "Username must be at least 3 characters" : "";
    case "email":
      return !value.includes("@") ? "Please enter a valid email" : "";
    case "password":
      return value.length < 6 ? "Password must be at least 6 characters" : "";
    default:
      return "";
  }
};

const formReducer = produce((draft: StateInterface, action: StateAction) => {
  switch (action.type) {
    case StateActionName.FieldChange: {
      const { field, value } = action.payload;
      draft.fields[field] = value;
      draft.errors[field] = validateField(field, value);
      break;
    }
    
    case StateActionName.FieldBlur: {
      const { field } = action.payload;
      draft.touched[field] = true;
      break;
    }
    
    case StateActionName.FormSubmit: {
      draft.isSubmitting = true;
      break;
    }
    
    case StateActionName.FormSubmitSuccess: {
      return initialState;
    }
    
    case StateActionName.FormSubmitError: {
      draft.isSubmitting = false;
      draft.errors = action.payload.errors;
      break;
    }
    
    case StateActionName.FormReset: {
      return initialState;
    }
  }
});

const FormFlight = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: StateActionName.FieldChange,
      payload: { field: name, value },
    });
  }, []);
  
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    dispatch({
      type: StateActionName.FieldBlur,
      payload: { field: name },
    });
  }, []);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasErrors = Object.values(state.errors).some(error => error !== "");
    if (hasErrors) return;
    
    dispatch({ type: StateActionName.FormSubmit });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: StateActionName.FormSubmitSuccess });
      alert("Form submitted successfully!");
    } catch (error) {
      dispatch({
        type: StateActionName.FormSubmitError,
        payload: { errors: initialState.errors },
      });
    }
  }, [state.errors]);
  
  const handleReset = useCallback(() => {
    dispatch({ type: StateActionName.FormReset });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ComponentField
        name="aircraftType"
        type="text"
        label="Aircraft type"
        value={state.fields.aircraftType}
        error={state.errors.aircraftType}
        touched={state.touched.aircraftType}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      
      <ComponentField
        name="registration"
        type="text"
        label="Aircraft registration"
        value={state.fields.registration}
        error={state.errors.registration}
        touched={state.touched.registration}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        name="departure"
        type="text"
        label="Departure airfield"
        value={state.fields.departure}
        error={state.errors.departure}
        touched={state.touched.departure}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        name="arrival"
        type="text"
        label="Arrival airfield"
        value={state.fields.arrival}
        error={state.errors.arrival}
        touched={state.touched.arrival}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        name="departureTime"
        type="datetime"
        label="Departure time"
        value={state.fields.departureTime}
        error={state.errors.departureTime}
        touched={state.touched.departureTime}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      
      <ComponentField
        name="arrivalTime"
        type="datetime"
        label="Arrival time"
        value={state.fields.arrivalTime}
        error={state.errors.arrivalTime}
        touched={state.touched.arrivalTime}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        name="pilotInCommand"
        type="checkbox"
        label="Pilot in command"
        value={state.fields.pilotInCommand}
        error={state.errors.pilotInCommand}
        touched={state.touched.pilotInCommand}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ComponentField
        name="remarks"
        type="text"
        label="Remarks"
        value={state.fields.remarks}
        error={state.errors.remarks}
        touched={state.touched.remarks}
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