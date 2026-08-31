import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getActiveWebsiteBySlug } from '@/app/lib/get-website';
import EventWebsiteEmbed from '@/app/ui/events/EventWebsiteEmbed';

interface PageProps {
  params: {
    eventSlug: string[];
  };
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

  const title = website.name ? `${website.name} | IEEE CE KGR` : 'IEEE CE KGR Event';
  return {
    title,
    description: `Official event portal for ${website.name || slug} hosted by IEEE Student Branch College of Engineering Kidangoor.`,
    openGraph: {
      title,
      description: `Official event portal for ${website.name || slug}.`,
    },
  };
}

export default async function DynamicEventWebsitePage({ params }: PageProps) {
  const segments = params.eventSlug || [];
  if (segments.length === 0) {
    notFound();
  }

  const slug = segments[0];
  const subPath = segments.slice(1).join('/');

  // Known static paths to ignore if they somehow reach here
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

  let destinationUrl = website.destination_url.trim();

  // Normalize protocol
  if (
    !destinationUrl.startsWith('http://') &&
    !destinationUrl.startsWith('https://')
  ) {
    destinationUrl = `https://${destinationUrl}`;
  }

  // Clean trailing slashes and attach subpath if any
  const cleanDestination = destinationUrl.replace(/\/+$/, '');
  const fullUrl = subPath ? `${cleanDestination}/${subPath}` : cleanDestination;

  return (
    <EventWebsiteEmbed
      name={website.name || slug}
      slug={slug}
      url={fullUrl}
    />
  );
}
