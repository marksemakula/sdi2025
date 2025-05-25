import { utils, write } from 'xlsx';

export const generateExcelReport = (applications) => {
  const worksheet = utils.json_to_sheet(
    applications.map(app => ({
      'First Name': app.firstName,
      'Last Name': app.lastName,
      'Email': app.email,
      'Phone': app.phone,
      'Position': app.position,
      'Experience (Years)': app.experience,
      'Application Date': new Date(app.applicationDate).toLocaleDateString(),
    }))
  );

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Applications');

  const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `applications-${new Date().toISOString().split('T')[0]}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};