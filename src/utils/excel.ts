import ExcelJS from 'exceljs';

export interface ExportRecord {
  patientName: string;
  type: string;
  email: string;
  phone: string;
  date: string;
  status?: string;
  [key: string]: unknown;
}

const formatDate = (value: unknown): string => {
  if (!value) return '';
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
};

const mapRecordForExport = (record: ExportRecord) => ({
  'Patient Name': record.patientName,
  Type: record.type || '',
  Email: record.email || '',
  Phone: record.phone || '',
  Date: formatDate(record.date),
  Status: record.status || 'Active',
});

export const generateExcelReport = async (records: ExportRecord[]): Promise<void> => {
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
