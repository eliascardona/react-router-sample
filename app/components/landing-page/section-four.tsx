import { Info } from 'lucide-react';
import { useState } from 'react';
import { frecuentQuestionsArray } from './(info)/FAQS';
import { FAQAccordion } from './ui/FAQAccordion';

export function LandingPageV1_SectionFour() {
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>(
    {}
  );

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="faq">
      <div className="container">
        <span>
          <h1 className="faqTitle">Frecuently Asked Questions</h1>
          <h1 className="faqTitleAux">{'..'}</h1>
          <Info style={{ fontSize: '2.2em', verticalAlign: 'bottom' }} />
        </span>

        <br />

        <span className="faqLegend">Feel free to ask us everything</span>

        <span className="questionPanelsPadding">
          {frecuentQuestionsArray.map((faq, i) => (
            <FAQAccordion
              key={i}
              title={faq.question}
              isOpen={!!openAccordions[i]}
              toggleAccordion={() => toggleAccordion(i)}>
              <span>{faq.answer}</span>
            </FAQAccordion>
          ))}
        </span>
      </div>
    </div>
  );
}
