'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DayAccordionProps {
  day: string;
  title: string;
  description: string;
  activities: string[];
  highlights: { title: string; imageUrl: string }[];
  accommodation: string;
  mealPlan: string;
  travelTime: string;
  transportMode: string;
  imageUrl: string;
}

export default function DayAccordion({
  day,
  title,
  description,
  activities,
  highlights,
  accommodation,
  mealPlan,
  travelTime,
  transportMode,
  imageUrl,
}: DayAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-xl mb-4 shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-100 rounded-xl transition"
      >
        <div className="flex items-center gap-2">
          <span className="text-green-500">●</span>
          <h2 className="font-semibold text-lg"> Day {day} - {title}</h2>
        </div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="p-4 ">
          {/* Description */}
          <p className="text-gray-700 mb-4">{description}</p>

          {/* Main Image */}
          <img src={imageUrl} alt={title} className="rounded-md w-full h-60 object-cover mb-6" />

          {/* Activities */}
          <div className="mb-6">
            <h3 className="font-semibold text-xl mb-2">Day {day} Activities</h3>
            <ul className="list-disc list-inside space-y-1">
              {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="font-semibold text-xl mb-2">Kandy Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="rounded-md overflow-hidden shadow-sm bg-white">
                  <img src={highlight.imageUrl} alt={highlight.title} className="h-32 w-full object-cover" />
                  <div className="p-2 text-center font-medium">{highlight.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div><strong>Accommodation:</strong> {accommodation}</div>
            <div><strong>Meal Plan:</strong> {mealPlan}</div>
            <div><strong>Travel Time:</strong> {travelTime}</div>
            <div><strong>Transport Mode:</strong> {transportMode}</div>
          </div>
        </div>
      )}
    </div>
  );
}
