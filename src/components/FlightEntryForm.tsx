import { useState } from 'react';

// Types definition for better TypeScript support
type InputType = 'text' | 'date' | 'time' | 'textarea' | 'checkbox';

interface FormField {
  label: string;
  type: InputType;
  required?: boolean;
  colSpan?: number;
  width?: 'full' | 'half';
}

interface FormConfig {
  [key: string]: FormField;
}

// Reusable Input component
const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  width = 'full'
}: {
  label: string;
  name: string;
  type: InputType;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  width?: 'full' | 'half';
}) => {
  const baseInputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  
  if (type === 'checkbox') {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          name={name}
          checked={value as boolean}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          {label}
        </label>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className={`${width === 'half' ? 'flex-1' : 'w-full'}`}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <textarea
          name={name}
          value={value as string}
          onChange={onChange}
          className={baseInputClasses}
          required={required}
          rows={3}
        />
      </div>
    );
  }

  return (
    <div className={`${width === 'half' ? 'flex-1' : 'w-full'}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value as string}
        onChange={onChange}
        className={baseInputClasses}
        required={required}
      />
    </div>
  );
};

// Form configuration object
const formConfig: FormConfig = {
  date: { label: 'Date', type: 'date', required: true },
  aircraftType: { label: 'Aircraft Type', type: 'text', required: true },
  registration: { label: 'Registration', type: 'text', required: true },
  departure: { label: 'Departure', type: 'text', required: true },
  arrival: { label: 'Arrival', type: 'text', required: true },
  departureTime: { label: 'Departure Time', type: 'time', required: true, width: 'half' },
  arrivalTime: { label: 'Arrival Time', type: 'time', required: true, width: 'half' },
  remarks: { label: 'Remarks', type: 'textarea', colSpan: 2 },
  pilotInCommand: { label: 'Pilot in Command', type: 'checkbox' }
};

const FlightEntryForm = () => {
  const [flightData, setFlightData] = useState({
    date: '',
    aircraftType: '',
    registration: '',
    departure: '',
    arrival: '',
    departureTime: '',
    arrivalTime: '',
    totalTime: '',
    pilotInCommand: true,
    remarks: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Flight data:', flightData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFlightData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6">New Flight Entry</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formConfig).map(([fieldName, config]) => {
              if (config.type === 'checkbox') {
                return null; // We'll handle checkbox separately
              }
              
              return (
                <div key={fieldName} className={`col-span-${config.colSpan || 1}`}>
                  <FormInput
                    label={config.label}
                    name={fieldName}
                    type={config.type}
                    value={flightData[fieldName as keyof typeof flightData]}
                    onChange={handleChange}
                    required={config.required}
                    width={config.width}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <FormInput
              label={formConfig.pilotInCommand.label}
              name="pilotInCommand"
              type="checkbox"
              value={flightData.pilotInCommand}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Flight
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightEntryForm;