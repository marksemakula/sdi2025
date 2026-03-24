import { motion } from 'framer-motion';
import { FaHeart, FaHandHoldingHeart, FaBaby, FaUserMd } from 'react-icons/fa';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const impactItems = [
  {
    icon: FaBaby,
    title: 'Safe Deliveries',
    description:
      'Fund the equipment and specialist care that gives every mother a safe delivery.',
  },
  {
    icon: FaUserMd,
    title: 'Antenatal Care',
    description:
      'Help cover prenatal check-ups, ultrasounds, and essential screenings for expectant mothers.',
  },
  {
    icon: FaHeart,
    title: "Women's Health",
    description:
      'Support gynaecological consultations and treatments for women across Eastern Uganda.',
  },
];

const Donate = () => (
  <div className="min-h-screen bg-gray-50">
    <SEO
      title="Donate | Support Maternity & Women's Health Care in Uganda"
      description="Support Specialist Doctors International's mission to provide quality maternity and women's health care in Jinja, Uganda. Your donation funds safe deliveries, antenatal care, and specialist consultations."
      keywords="donate maternity care Uganda, support healthcare Jinja, fund safe delivery Uganda, charitable giving women's health"
      url="https://www.specialistdoctors-international.org/donate"
    />

    {/* Hero Banner */}
    <div className="bg-gradient-to-r from-primary to-tertiary py-16 pt-24">
      <div className="max-w-7xl mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-body mb-4">
            ❤️ Make a Difference
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Donate to SDI
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Help us continue delivering expert maternity and women&apos;s health care to
            families in Jinja and across Eastern Uganda.
          </p>
        </motion.div>
      </div>
    </div>

    {/* Breadcrumb */}
    <Breadcrumb items={[{ name: 'Donate', url: '/donate' }]} />

    {/* Impact cards */}
    <section className="max-w-5xl mx-auto px-4 py-12" aria-labelledby="impact-heading">
      <h2
        id="impact-heading"
        className="text-2xl font-bold text-tertiary text-center mb-8"
      >
        Where Your Donation Goes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impactItems.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center"
          >
            <item.icon className="text-primary text-4xl mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-tertiary mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <div className="max-w-2xl mx-auto px-4 pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-10"
      >
        <FaHandHoldingHeart
          className="text-primary text-6xl mx-auto mb-6"
          aria-hidden="true"
        />
        <h2 className="text-2xl font-bold text-tertiary mb-3">
          Ready to Make an Impact?
        </h2>
        <p className="text-gray-600 mb-8">
          Contact our team to discuss donation options, bank transfers, or
          in-kind contributions. Every gift — large or small — saves lives.
        </p>
        <a
          href="https://wa.me/256702652046?text=I%20would%20like%20to%20make%20a%20donation%20to%20Specialist%20Doctors%20International"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg"
          aria-label="Contact SDI on WhatsApp to discuss donating"
        >
          <FaHeart aria-hidden="true" />
          Contact Us to Donate
        </a>
      </motion.div>
    </div>
  </div>
);

export default Donate;
