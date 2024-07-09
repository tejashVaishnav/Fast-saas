// app/utils/metadata.ts

import { Metadata } from 'next';

type OpenGraphType = 
  | 'website' 
  | 'article' 
  | 'book' 
  | 'profile' 
  | 'music.song' 
  | 'music.album' 
  | 'music.playlist' 
  | 'music.radio_station' 
  | 'video.movie' 
  | 'video.episode' 
  | 'video.tv_show' 
  | 'video.other';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{ url: string; alt: string; width?: number; height?: number }>;
    locale?: string;
    type?: OpenGraphType;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
  };
  additionalLinkTags?: Array<{ rel: string; href: string }>;
}

export function generateMetadata({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  additionalLinkTags,
}: SEOProps): Metadata {
  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: openGraph?.url || canonical,
      siteName: openGraph?.siteName || 'Your Site Name',
      images: openGraph?.images || [
        {
          url: '/thumbnail.png',
          alt: 'Default OG Image',
        },
      ],
      locale: openGraph?.locale || 'en_US',
      type: openGraph?.type || 'website',
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      site: twitter?.site || '@yourtwitterhandle',
      creator: twitter?.creator || '@yourtwitterhandle',
      images: ['/thumbnail.png'],
    },
    alternates: {
      canonical: canonical,
    },
  };

 

  if (additionalLinkTags) {
    metadata.alternates = {
      ...metadata.alternates,
      ...additionalLinkTags.reduce((acc, tag) => ({ ...acc, [tag.rel]: tag.href }), {}),
    };
  }

  return metadata;
}