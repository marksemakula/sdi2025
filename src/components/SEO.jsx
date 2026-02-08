import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO Component for dynamic meta tags on each page
 * Optimized for Maternity, Antenatal, Gynaecologist, and Obstetrician searches in Uganda/Jinja
 */
const SEO = ({
  title = 'Specialist Doctors International',
  description = 'Best maternity care, antenatal services, gynaecologist and obstetrician consultations in Jinja, Uganda. Expert prenatal care and safe deliveries.',
  keywords = 'maternity Jinja, antenatal Uganda, gynaecologist Jinja, obstetrician Uganda',
  image = '/images/SDI_Logo.png',
  url = 'https://www.specialistdoctors-international.org/',
  type = 'website'
}) => {
  const fullTitle = title.includes('Specialist Doctors International') 
    ? title 
    : `${title} | Specialist Doctors International - Jinja, Uganda`;

  const baseKeywords = 'maternity Jinja, maternity Uganda, antenatal care Jinja, antenatal Uganda, gynaecologist Jinja, gynaecologist Uganda, obstetrician Jinja, obstetrician Uganda, prenatal care Uganda, pregnancy care Jinja, women\'s health Uganda';
  const fullKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords;

  const fullImageUrl = image.startsWith('http') 
    ? image 
    : `https://www.specialistdoctors-international.org${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:locale" content="en_UG" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string
};

export default SEO;
