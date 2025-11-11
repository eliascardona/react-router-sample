import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router';
const COURSE_ID = '6a0cb0bc-f604-405b-8d91-1b75897302cf';

export default function LandingPageV1_SectionSix() {
  const h1 = { marginBlockEnd: '1em' };

  return (
    <div className="ctaSection">
      <div className="ctaChildLy">
        <div>
          <h1 style={h1}>Let's do it!</h1>
          <Link to={`/coursePage/${COURSE_ID}/checkout`} className="sellBtn">
            <span>get into! </span>{' '}
            <ShoppingBag size={24} style={{ verticalAlign: 'middle' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
