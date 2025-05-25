import { motion } from 'framer-motion';
import { format } from 'date-fns';

const ScheduleViewer = ({ schedules }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Available Appointments</h3>
      <div className="space-y-4">
        {schedules.map((doctor, index) => (
          <motion.div
            key={doctor.doctorId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-200 rounded-md p-4"
          >
            <h4 className="font-medium text-tertiary">{doctor.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
            <div className="space-y-1">
              {doctor.availableSlots.map((slot, slotIndex) => (
                <div
                  key={slotIndex}
                  className="text-sm text-gray-700 bg-gray-50 p-2 rounded"
                >
                  {format(new Date(slot.date), 'MMM dd, yyyy')} at {slot.time}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleViewer;