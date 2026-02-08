import { motion } from 'framer-motion';
import { format, parseISO, isToday, isTomorrow, addDays } from 'date-fns';
import { FaClock, FaCalendarAlt, FaUserMd } from 'react-icons/fa';

const ScheduleViewer = ({ schedules }) => {
  // Get unique dates from the next 7 days for preview
  const getUpcomingDays = (slots) => {
    const today = new Date();
    const next7Days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i);
      const dateString = date.toISOString().split('T')[0];
      const daySlots = slots.filter(slot => slot.date === dateString);
      
      if (daySlots.length > 0) {
        next7Days.push({
          date: dateString,
          label: isToday(date) ? 'Today' : isTomorrow(date) ? 'Tomorrow' : format(date, 'EEE, MMM d'),
          slotCount: daySlots.length,
          firstSlot: daySlots[0].time,
          lastSlot: daySlots[daySlots.length - 1].time
        });
      }
    }
    
    return next7Days;
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FaCalendarAlt className="mr-2 text-primary" />
        Available Appointments
      </h3>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-green-800 font-medium">✓ Open Daily: Monday - Sunday</p>
        <p className="text-sm text-green-700">08:30 AM - 6:30 PM</p>
      </div>
      
      <div className="space-y-4">
        {schedules.map((doctor, index) => {
          const upcomingDays = getUpcomingDays(doctor.availableSlots);
          
          return (
            <motion.div
              key={doctor.doctorId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="flex items-start mb-3">
                <FaUserMd className="text-primary mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-tertiary">{doctor.name}</h4>
                  <p className="text-xs text-gray-500 leading-tight">{doctor.specialty}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Next 7 Days:</p>
                <div className="grid grid-cols-2 gap-2">
                  {upcomingDays.slice(0, 6).map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="text-xs bg-gray-50 p-2 rounded border border-gray-100"
                    >
                      <span className="font-medium text-tertiary">{day.label}</span>
                      <div className="text-gray-500 flex items-center mt-1">
                        <FaClock className="mr-1" size={10} />
                        {day.firstSlot} - {day.lastSlot}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        Select your preferred date and time in the form
      </p>
    </div>
  );
};

export default ScheduleViewer;