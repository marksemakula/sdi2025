import ExcelJS from 'exceljs';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
};

const mapRecordForExport = (record) => ({
  'Patient Name': record.patientName || [record.firstName, record.lastName].filter(Boolean).join(' '),
  Type: record.type || '',
  Email: record.email || '',
  Phone: record.phone || record.contactPhone || '',
  Date: formatDate(record.date || record.applicationDate || record.timestamp),
  Status: record.status || 'Active',
});

export const generateExcelReport = async (records) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Records');

  worksheet.columns = [
    { header: 'Patient Name', key: 'Patient Name', width: 28 },
    { header: 'Type', key: 'Type', width: 16 },
    { header: 'Email', key: 'Email', width: 28 },
    { header: 'Phone', key: 'Phone', width: 20 },
    { header: 'Date', key: 'Date', width: 16 },
    { header: 'Status', key: 'Status', width: 14 },
  ];

  records.map(mapRecordForExport).forEach((row) => {
    worksheet.addRow(row);
  });

  const excelBuffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `records-${new Date().toISOString().split('T')[0]}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};