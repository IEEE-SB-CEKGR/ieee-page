import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getActiveWebsiteBySlug } from '@/app/lib/get-website';
import EventWebsiteEmbed from '@/app/ui/events/EventWebsiteEmbed';

interface PageProps {
  params: {
    eventSlug: string[];
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const segments = params.eventSlug || [];
  if (segments.length === 0) return {};

  const slug = segments[0];
  const website = await getActiveWebsiteBySlug(slug);

  if (!website) {
    return {
      title: 'Page Not Found',
    };
  }

  const title = website.name
    ? `${website.name} | IEEE CE KGR`
    : 'IEEE CE KGR Event';
  return {
    title,
    description: `Official event portal for ${website.name || slug}.`,
    openGraph: {
      title,
      description: `Official event portal for ${website.name || slug}.`,
    },
  };
}

export default async function DynamicEventWebsitePage({
  params,
  searchParams,
}: PageProps) {
  const segments = params.eventSlug || [];
  if (segments.length === 0) {
    notFound();
  }

  const slug = segments[0];
  const subPath = segments.slice(1).join('/');

  if (
    slug === 'about' ||
    slug === 'events' ||
    slug === 'execom' ||
    slug === 'achievements' ||
    slug === 'api'
  ) {
    notFound();
  }

  const website = await getActiveWebsiteBySlug(slug);

  if (!website || !website.destination_url) {
    notFound();
  }

  let baseDestination = website.destination_url.trim();
  if (
    !baseDestination.startsWith('http://') &&
    !baseDestination.startsWith('https://')
  ) {
    baseDestination = `https://${baseDestination}`;
  }
  baseDestination = baseDestination.replace(/\/+$/, '');

  const queryParams = new URLSearchParams();
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (value !== undefined) {
        queryParams.append(key, value);
      }
    });
  }
  const queryString = queryParams.toString();

  const fullUrl = subPath
    ? `${baseDestination}/${subPath}${queryString ? '?' + queryString : ''}`
    : `${baseDestination}${queryString ? '?' + queryString : ''}`;

  return (
    <EventWebsiteEmbed
      name={website.name || slug}
      slug={slug}
      url={fullUrl}
      subPath={subPath}
    />
  );
}
