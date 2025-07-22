import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const DatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get today's date
  const today = new Date();

  // Handle the selection of a date
  const handleDateSelect = (date: Date) => {
    if (date <= today) {
      setSelectedDate(date); // Allow only selecting current or past dates
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto p-4">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-semibold text-gray-800">Select a Date</h2>
        <p className="mt-2 text-lg text-gray-600">Choose your travel date</p>
      </div>

      <div className="flex justify-center items-center">
        <DayPicker
          selected={selectedDate}
          onDayClick={handleDateSelect}
          disabled={{ after: today }} // Disable future dates
          locale={enUS} // Set locale to US English
          month={today} // Default to the current month
          modifiers={{
            selected: selectedDate,
            today: today, // Highlight today's date
          }}
          classNames={{
            selected: "bg-blue-500 text-white",
            today: "bg-blue-200",
          }}
        />
      </div>

      {/* Display selected date */}
      {selectedDate && (
        <div className="mt-4 text-center text-lg">
          <p>You selected: {format(selectedDate, "MMMM dd, yyyy")}</p>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
