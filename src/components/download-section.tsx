'use client';

import { Download, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

export type DownloadItem = {
  id: number | string;
  title: string;
  description: string | null;
  file_url: string | null;
  download_url: string | null;
  file_type: string | null;
};

interface DownloadSectionProps {
  items: DownloadItem[];
  loading?: boolean;
}

const FileTypeIcon = ({ type }: { type: string | null }) => {
  if (!type) return null;
  const isDocx = type.toUpperCase() === 'DOCX' || type.toUpperCase() === 'DOC';
  const isPdf = type.toUpperCase() === 'PDF';

  let bgColor = 'bg-gray-500';
  if (isDocx) bgColor = 'bg-blue-500';
  else if (isPdf) bgColor = 'bg-red-500';

  const iconPath =
    'M4 0C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H20C22.2091 24 24 22.2091 24 20V4C24 1.79086 22.2091 0 20 0H4Z';

  return (
    <div className="absolute -top-3 -left-3 transform">
      <div className={`relative w-14 h-14 ${bgColor} rounded-lg shadow-md flex items-center justify-center`}>
        <span className="text-white font-bold text-xs">{type}</span>
      </div>
    </div>
  );
};

const GradientButton = ({ href, isLink }: { href: string | null, isLink: boolean }) => (
  <Button
    asChild
    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg relative overflow-hidden group"
  >
    <a href={href || '#'} download={!isLink} target={isLink ? '_blank' : undefined} rel={isLink ? 'noopener noreferrer' : undefined}>
      <span className="absolute inset-0 bg-white/20 transition-all duration-700 ease-in-out -translate-x-full group-hover:translate-x-0 group-hover:skew-x-[-15deg]"></span>
      {isLink ? 'Open Link' : 'Download'}
      <Download className="ml-2 h-4 w-4" />
    </a>
  </Button>
);

const DownloadSection = ({ items, loading = false }: DownloadSectionProps) => {
  return (
    <section className="pt-0 pb-20 md:pb-32 bg-gray-50 pt-10">
      <div className="container mx-auto px-8 md:px-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative bg-card rounded-2xl shadow-lg p-6 pt-16 flex flex-col text-left items-start transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1"
              >
                <FileTypeIcon type={item.file_type} />
                <div className="flex-grow flex flex-col items-start w-full">
                  <h3 className="text-lg font-bold font-headline mb-3 text-foreground uppercase">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <GradientButton
                  href={item.file_type === 'LINK' ? item.download_url : item.file_url}
                  isLink={item.file_type === 'LINK'}
                />
              </div>
            ))}
          </div>
        )}
        {items.length === 0 && !loading && (
          <div className="text-center text-muted-foreground py-16">
            No downloadable files available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default DownloadSection;

