import { Metadata } from 'next';
import { WithContext, Person, WebSite, Organization, BreadcrumbList } from 'schema-dts';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  section?: string;
}

const defaultConfig = {
  siteName: 'Imran Safdar Portfolio',
  siteUrl: 'https://imran-safdar.com',
  author: 'Imran Safdar',
  twitterHandle: '@imran_safdar',
  defaultImage: '/og-default.png',
  locale: 'en_US',
};

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    author = defaultConfig.author,
    url = defaultConfig.siteUrl,
    image = defaultConfig.defaultImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    tags = [],
    section,
  } = config;

  const fullTitle = title.includes(defaultConfig.siteName) 
    ? title 
    : `${title} | ${defaultConfig.siteName}`;

  const fullUrl = url.startsWith('http') ? url : `${defaultConfig.siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${defaultConfig.siteUrl}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [...keywords, 'Imran Safdar', 'Full Stack Developer', 'Portfolio', 'Next.js', 'React'],
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type as 'website' | 'article' | 'profile',
      locale: defaultConfig.locale,
      url: fullUrl,
      siteName: defaultConfig.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(tags.length > 0 && { tags }),
      ...(section && { section }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: defaultConfig.twitterHandle,
      images: [fullImage],
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      'theme-color': '#3b82f6',
      'color-scheme': 'dark light',
    },
  };

  return metadata;
}

export function generatePersonStructuredData(): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Imran Safdar',
    url: defaultConfig.siteUrl,
    sameAs: [
      'https://github.com/imran-safdar',
      'https://linkedin.com/in/imran-safdar',
      'https://twitter.com/imran_safdar',
    ],
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'MongoDB',
      'Full Stack Development',
      'Web Development',
    ],
    description: 'Full-stack developer passionate about creating innovative solutions and building exceptional digital experiences.',
  };
}

export function generateWebSiteStructuredData(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultConfig.siteName,
    url: defaultConfig.siteUrl,
    description: 'Full-stack developer passionate about creating innovative solutions and building exceptional digital experiences.',
    author: {
      '@type': 'Person',
      name: defaultConfig.author,
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: defaultConfig.author,
    },
  };
}

export function generateOrganizationStructuredData(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultConfig.siteName,
    url: defaultConfig.siteUrl,
    logo: `${defaultConfig.siteUrl}/logo.png`,
    founder: {
      '@type': 'Person',
      name: defaultConfig.author,
    },
    foundingDate: '2024',
    description: 'Professional portfolio showcasing full-stack development expertise and innovative digital solutions.',
  };
}

export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url.startsWith('http') 
        ? breadcrumb.url 
        : `${defaultConfig.siteUrl}${breadcrumb.url}`,
    })),
  };
}

export function generateArticleStructuredData(config: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
  url?: string;
  tags?: string[];
}) {
  const {
    title,
    description,
    publishedTime,
    modifiedTime,
    author = defaultConfig.author,
    image = defaultConfig.defaultImage,
    url = defaultConfig.siteUrl,
    tags = [],
  } = config;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image.startsWith('http') ? image : `${defaultConfig.siteUrl}${image}`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: defaultConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${defaultConfig.siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${defaultConfig.siteUrl}${url}`,
    },
    keywords: tags.join(', '),
  };
}

export const seoConfig = defaultConfig;
