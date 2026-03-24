import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const BASE_URL = 'https://www.specialistdoctors-international.org';

/**
 * Breadcrumb component
 *
 * Renders visible breadcrumb navigation AND injects BreadcrumbList
 * JSON-LD structured data so Google can display rich breadcrumbs in
 * search results.
 *
 * "Home" is always prepended automatically.
 *
 * Usage:
 *   <Breadcrumb items={[{ name: 'Blog', url: '/blog' }]} />
 *   <Breadcrumb items={[{ name: 'Blog', url: '/blog' }, { name: post.title, url: `/blog/${post.slug}` }]} />
 */
const Breadcrumb = ({ items = [] }) => {
  const allItems = [{ name: 'Home', url: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd, null, 2)}</script>
      </Helmet>

      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
      >
        <ol
          className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li
                key={item.url}
                className="flex items-center gap-1.5"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Separator — skip before the very first item */}
                {index > 0 && (
                  <FaChevronRight
                    className="h-2.5 w-2.5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                )}

                {/* Home icon for first crumb */}
                {index === 0 && (
                  <FaHome
                    className="h-3.5 w-3.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  /* Current page — not a link */
                  <span
                    className="font-medium text-gray-700 truncate max-w-[240px]"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  /* Ancestor pages — clickable links */
                  <Link
                    to={item.url}
                    className="hover:text-primary transition-colors truncate max-w-[160px]"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                )}

                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

export default Breadcrumb;
