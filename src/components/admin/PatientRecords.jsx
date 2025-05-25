import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaSearch, FaFileDownload } from 'react-icons/fa';
import { generateExcelReport } from '../../utils/excel';

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const referrals = useSelector(state => state.referral.referrals);
  const consultations = useSelector(state => state.telemedicine.consultations);

  const combinedRecords = referrals.map(referral => ({
    ...referral,
    type: 'Referral',
    date: new Date().toISOString(), // Use actual date from referral
  })).concat(
    consultations.map(consultation => ({
      patientName: consultation.firstName + ' ' + consultation.lastName,
      type: 'Consultation',
      date: consultation.timestamp,
      ...consultation,
    }))
  );

  const filteredRecords = combinedRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    generateExcelReport(filteredRecords);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <FaFileDownload className="mr-2" />
          Export Records
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {record.patientName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    record.type === 'Referral'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {record.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRecords;