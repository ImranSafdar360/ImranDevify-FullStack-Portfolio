import Script from 'next/script';
import { 
  generatePersonStructuredData, 
  generateWebSiteStructuredData, 
  generateOrganizationStructuredData 
} from '@/lib/seo';

interface StructuredDataProps {
  type?: 'person' | 'website' | 'organization' | 'all';
  customData?: Record<string, unknown>;
}

export default function StructuredData({ type = 'all', customData }: StructuredDataProps) {
  const structuredDataArray = [];

  if (type === 'all' || type === 'person') {
    structuredDataArray.push(generatePersonStructuredData());
  }

  if (type === 'all' || type === 'website') {
    structuredDataArray.push(generateWebSiteStructuredData());
  }

  if (type === 'all' || type === 'organization') {
    structuredDataArray.push(generateOrganizationStructuredData());
  }

  if (customData) {
    structuredDataArray.push(customData);
  }

  return (
    <>
      {structuredDataArray.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
    </>
  );
}
