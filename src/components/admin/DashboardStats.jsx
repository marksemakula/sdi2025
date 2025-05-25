import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaUserMd, FaCalendarCheck, FaChartLine, FaUserInjured } from 'react-icons/fa';
import ReactECharts from 'echarts-for-react';

const DashboardStats = () => {
  const consultations = useSelector(state => state.telemedicine.consultations);
  const applications = useSelector(state => state.careers.applications);
  const referrals = useSelector(state => state.referral.referrals);

  const stats = [
    {
      title: 'Total Patients',
      value: referrals.length,
      icon: FaUserInjured,
      color: 'bg-blue-500',
    },
    {
      title: 'Consultations',
      value: consultations.length,
      icon: FaUserMd,
      color: 'bg-green-500',
    },
    {
      title: 'Applications',
      value: applications.length,
      icon: FaCalendarCheck,
      color: 'bg-orange-500',
    },
    {
      title: 'Success Rate',
      value: '95%',
      icon: FaChartLine,
      color: 'bg-purple-500',
    },
  ];

  const consultationOptions = {
    title: {
      text: 'Weekly Consultations',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [10, 15, 12, 18, 14, 9, 11],
        type: 'line',
        smooth: true,
        color: '#74C365',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <ReactECharts option={consultationOptions} style={{ height: '300px' }} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {consultations.slice(0, 5).map((consultation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <FaUserMd className="text-primary mr-3" />
                <div>
                  <p className="text-sm font-medium">Virtual Consultation</p>
                  <p className="text-xs text-gray-500">
                    {new Date(consultation.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;