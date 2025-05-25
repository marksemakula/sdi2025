import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const consultationTrend = {
    title: {
      text: 'Monthly Consultation Trends',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'In-Person',
        type: 'bar',
        data: [120, 132, 101, 134, 90, 230],
        color: '#74C365'
      },
      {
        name: 'Virtual',
        type: 'bar',
        data: [220, 182, 191, 234, 290, 330],
        color: '#0F52BA'
      }
    ]
  };

  const specialtyDistribution = {
    title: {
      text: 'Patient Distribution by Specialty',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Cardiology' },
          { value: 735, name: 'Neurology' },
          { value: 580, name: 'Pediatrics' },
          { value: 484, name: 'Orthopedics' },
          { value: 300, name: 'General Medicine' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const patientDemographics = {
    title: {
      text: 'Patient Age Distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['0-18', '19-30', '31-45', '46-60', '60+']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135],
        type: 'line',
        smooth: true,
        color: '#FF5F1F'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <ReactECharts option={consultationTrend} style={{ height: '400px' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <ReactECharts option={specialtyDistribution} style={{ height: '400px' }} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <ReactECharts option={patientDemographics} style={{ height: '400px' }} />
      </motion.div>
    </div>
  );
};

export default Analytics;