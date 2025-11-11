import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export default function LandingPageV1_PageFooter() {
  const footerStyle = {
    position: 'relative',
    bottom: '0 !important',
    padding: '50px 30px 50px 80px',
    color: '#fefefe',
    backgroundColor: '#111111',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

  return (
    <div style={footerStyle}>
      <span>© 2025. Elias Eduardo Cardona Rodríguez</span>
    </div>
  );
}
