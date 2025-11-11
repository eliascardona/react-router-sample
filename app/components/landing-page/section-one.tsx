import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router';
const COURSE_ID = '6a0cb0bc-f604-405b-8d91-1b75897302cf';

export function LandingPageV1_SectionOne() {
  return (
    <div className="introSection">
      <div className="textCenter">
        <h2 className="green">SLOGAN PERSUASIVO PARA VENDER TU MEMBRESÍA</h2>
        <h2>
          DEBES CAPTAR LA ATENCIÓN HACIENDO{' '}
          <span className="green">ENFÁSIS</span> EN COMO RESOLVER LA NECESIDAD
          DE TU CLIENTE
        </h2>
      </div>
      <div className="videoCtn">
        <div className="spanFrame">
          <iframe src="https://www.youtube.com/embed/5vNYuffFuqA" />
        </div>
      </div>
      <div className="textCenter">
        <Link to={`/coursePage/${COURSE_ID}/checkout`} className="sellBtn">
          <span>buy the course </span> <ShoppingBag className="w-6" />
        </Link>
      </div>
      <div className="centerSectionWithImage">
        <span className="instructorTitle">
          <hr
            style={{ width: '300px', border: '1px solid rgb(30, 240, 50)' }}
          />
        </span>
        <h2 className="green">MEJORA TU CALIDAD DE VIDA</h2>
        <h2>
          CON MI PROGRAMA {'\"'}CURSO ONLINE{'\"'}
        </h2>
        <div className="sampleImageOne">
          <div className="cover">
            <img src={'/img/preview.jpg'} alt="result" className="img" />
          </div>
        </div>
      </div>
      <Link to={`/coursePage/${COURSE_ID}/checkout`} className="sellBtn">
        <span>buy the course </span> <ShoppingBag className="w-6" />
      </Link>
    </div>
  );
}
