import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ReactNode } from 'react';
import './styles.css';

interface FAQAccordionProps {
  title: string;
  isOpen: boolean;
  toggleAccordion: () => void;
  children: ReactNode;
}

export function FAQAccordion({
  title,
  children,
  isOpen,
  toggleAccordion,
}: FAQAccordionProps) {
  const iconStyle = {
    fontSize: '24px',
    verticalAlign: 'bottom',
  };

  return (
    <div className="questionPanel">
      <div className="questionPanelAux">
        {/* accordion header starts */}
        <div className="questionPanelHeader" onClick={toggleAccordion}>
          <div>
            <h3 className="questionHeaderTitle">{title}</h3>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 className="questionHeaderTitle">
              <span className="titleAux">{'..'}</span>
              {isOpen ? (
                <ChevronUp style={iconStyle} />
              ) : (
                <ChevronDown style={iconStyle} />
              )}
              <span className="titleAux">{'.'}</span>
            </h3>
          </div>
        </div>
        {/* accordion header end */}
        <div>
          {isOpen && <div className="questionPanelContent">{children}</div>}
        </div>
      </div>
    </div>
  );
}
