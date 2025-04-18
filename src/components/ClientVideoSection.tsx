'use client';

import VideoSection from './VideoSection';

interface ClientVideoSectionProps {
  videoId: string;
  title?: string;
  description?: string;
}

const ClientVideoSection: React.FC<ClientVideoSectionProps> = (props) => {
  return <VideoSection {...props} />;
};

export default ClientVideoSection;
