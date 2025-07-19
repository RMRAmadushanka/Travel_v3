import { Mail, Users, FileText, Pause, MailCheck, UserRound, UsersRound } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <MailCheck className="w-6 h-6 text-white" />,
      title: "Submit Your",
      subtitle: "Details",
      description: "Fill out our simple form with your travel preferences, destinations, and requirements to get started."
    },
    {
      number: "02", 
      icon: <UsersRound className="w-6 h-6 text-white" />,
      title: "Connect with a Local",
      subtitle: "Expert Online",
      description: "Get matched with experienced local travel experts who know your destination inside and out."
    },
    {
      number: "03",
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "Receive 3 Personalised",
      subtitle: "Travel Quotes",
      badge: "Free Consultation",
      description: "Compare customized travel packages tailored to your budget, interests, and travel style."
    },
   
  ];

  return (
    <div className=" py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">
          How It <span className="text-gray-600">Works</span>
        </h2>
        
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block relative">
            {/* Steps Container */}
            <div className="flex items-start justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative flex-1">
                  {/* Step Number */}

                  
                  {/* Badge */}
                  {step.badge && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm border whitespace-nowrap z-20">
                      {step.badge}
                    </div>
                  )}
                  
                  {/* Circle with Icon */}
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 mt-7 relative z-10">
                    {step.icon}
                  </div>
                  
                  {/* Connecting Line - positioned at circle center */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 w-full h-0.5 bg-blue-300 border-t-2 border-dotted border-blue-400 z-0"
                         style={{ top: '60px', marginLeft: '2rem' }}>
                    </div>
                  )}
                  
                  {/* Title and Subtitle */}
                  <div className="text-center max-w-48">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {step.title}
                    </h3>
                    <p className="font-semibold text-gray-900 text-lg">
                      {step.subtitle}
                    </p>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {step.badge && (
                  <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm border mb-2">
                    {step.badge}
                  </div>
                )}
                
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                
                <div className="text-center max-w-48">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {step.title}
                  </h3>
                  <p className="font-semibold text-gray-900 text-lg">
                    {step.subtitle}
                  </p>
                                   <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-blue-300 border-l-2 border-dotted border-blue-400 mt-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}