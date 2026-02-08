import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaPhone, FaUserMd, FaHospital } from 'react-icons/fa';

const ReferralForm = ({ onSubmit, schedules }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfBirth: '',
    contactNumber: '',
    referringDoctor: '',
    institution: '',
    doctorContact: '',
    serviceRequested: '',
    clinicalInfo: '',
    preferredDate: '',
    preferredTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="card-elevated p-8"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="label flex items-center">
              <FaUser className="mr-2 text-primary" /> Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="input"
              placeholder="Enter patient's full name"
            />
          </div>

          <div className="form-group">
            <label className="label flex items-center">
              <FaCalendar className="mr-2 text-primary" /> Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="label flex items-center">
              <FaUserMd className="mr-2 text-primary" /> Referring Doctor
            </label>
            <input
              type="text"
              name="referringDoctor"
              value={formData.referringDoctor}
              onChange={handleChange}
              required
              className="input"
              placeholder="Doctor's name"
            />
          </div>

          <div className="form-group">
            <label className="label flex items-center">
              <FaHospital className="mr-2 text-primary" /> Institution
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              className="input"
              placeholder="Hospital or clinic name"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="label flex items-center">
            <FaPhone className="mr-2 text-primary" /> Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="input"
            placeholder="+256 XXX XXX XXX"
          />
        </div>

        <div className="form-group">
          <label className="label">Service Requested</label>
          <select
            name="serviceRequested"
            value={formData.serviceRequested}
            onChange={handleChange}
            required
            className="select"
          >
            <option value="">Select a service</option>
            <option value="antenatal">Antenatal Care (ANC)</option>
            <option value="maternity">Maternity Services</option>
            <option value="gynaecology">Gynaecology Consultation</option>
            <option value="obstetrics">Obstetrics Care</option>
            <option value="physiotherapy">Physiotherapy</option>
            <option value="dental">Dental Services</option>
            <option value="imaging">Imaging/Ultrasound Scan</option>
            <option value="laboratory">Laboratory Tests</option>
          </select>
        </div>

        <div className="form-group">
          <label className="label">Clinical Information</label>
          <textarea
            name="clinicalInfo"
            value={formData.clinicalInfo}
            onChange={handleChange}
            required
            rows="4"
            className="textarea"
            placeholder="Please provide relevant clinical history and current symptoms..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="label">Preferred Date</label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">Preferred Time</label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">Select time</option>
              <option value="08:30">08:30 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="09:30">09:30 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="10:30">10:30 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="11:30">11:30 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="12:30">12:30 PM</option>
              <option value="13:00">01:00 PM</option>
              <option value="13:30">01:30 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="14:30">02:30 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="15:30">03:30 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="16:30">04:30 PM</option>
              <option value="17:00">05:00 PM</option>
              <option value="17:30">05:30 PM</option>
              <option value="18:00">06:00 PM</option>
              <option value="18:30">06:30 PM</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary py-3.5 text-base"
        >
          Submit Referral
        </button>
      </div>
    </motion.form>
  );
};

export default ReferralForm;