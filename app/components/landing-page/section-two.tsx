import { BarChart3, Code2, DollarSign, ShoppingBag } from 'lucide-react';

export function LandingPageV1_SectionTwo() {
  const iconStyle = { color: 'rgb(30, 240, 50)', fontSize: 62 };

  return (
    <div className="centeredGrid">
      <div className="iconsBox">
        <div className="iconBoxElem"></div>

        <div className="iconBoxElem" style={{ marginBottom: '0.5rem' }}>
          <h2 className="green">Amazing features</h2>
        </div>

        <div className="iconBoxElem" style={{ marginTop: '2.75rem' }}>
          <DollarSign style={iconStyle} />
          <hr style={{ width: '140px', color: '#fefefe' }} />
        </div>

        <div className="iconBoxElem">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem dolore modi vitae sit ullam cum deleniti commodi.
          </span>
        </div>

        <div className="iconBoxElem" style={{ marginTop: '2.75rem' }}>
          <Code2 style={iconStyle} />
          <hr style={{ width: '140px', color: '#fefefe' }} />
        </div>

        <div className="iconBoxElem">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem dolore modi vitae sit ullam cum deleniti commodi.
          </span>
        </div>

        <div className="iconBoxElem" style={{ marginTop: '2.75rem' }}>
          <BarChart3 style={iconStyle} />
          <hr style={{ width: '140px', color: '#fefefe' }} />
        </div>

        <div className="iconBoxElem">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem dolore modi vitae sit ullam cum deleniti commodi.
          </span>
        </div>

        <div className="iconBoxElem" style={{ marginTop: '2.75rem' }}>
          <ShoppingBag style={iconStyle} />
          <hr style={{ width: '140px', color: '#fefefe' }} />
        </div>

        <div className="iconBoxElem">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem dolore modi vitae sit ullam cum deleniti commodi.
          </span>
        </div>
      </div>
    </div>
  );
}
