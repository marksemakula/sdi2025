export const generateEmailFile = (data) => {
  const emailContent = `
To: service@specialistdoctors-international.org
Subject: New Patient Referral - ${data.patientName}
Content-Type: text/plain

Patient Information:
Name: ${data.patientName}
DOB: ${data.dateOfBirth}
Contact: ${data.contactNumber}

Referring Doctor:
Name: ${data.referringDoctor}
Institution: ${data.institution}
Contact: ${data.doctorContact}

Service Requested:
${data.serviceRequested}

Clinical Information:
${data.clinicalInfo}

Preferred Appointment:
Date: ${data.preferredDate}
Time: ${data.preferredTime}
  `;

  const blob = new Blob([emailContent], { type: 'message/rfc822' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `referral-${data.patientName.replace(/\s+/g, '-')}.eml`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};