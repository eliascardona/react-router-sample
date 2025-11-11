export function LandingPageV1_SectionFive() {
  const position = {
    display: 'grid',
    width: '90%',
    justifySelf: 'center',
    placeItems: 'center',
    paddingTop: '2rem',
  };

  return (
    <div className="centeredGrid">
      <div
        style={{
          width: '98%',
          justifySelf: 'center',
          display: 'grid',
          padding: '1rem 0 4rem',
        }}>
        <div id="content-here">
          <div className="textCenter">
            <h1 className="megaTitleBlack">SOME SUCCESS CASES</h1>
          </div>

          <div className="col6">
            <div className="el">
              <div className="circle">
                <img
                  src={'/img/circular.png'}
                  alt="illustrative image of a testimonial"
                  className="circle"
                />
              </div>
              <span className="highlighted">
                <span className="gray">Marketing expert</span>
              </span>
              <span>
                Digital products are a unique opportunity that today is
                revolutionizing online business and the world of digital
                marketing. And you only need 3 things to get started: a
                computer, internet connection and the knowledge that we are
                going to reveal to you in this program.
              </span>
            </div>

            <div className="el">
              <div className="circle">
                <img
                  src={'/img/circular.png'}
                  alt="illustrative image of a testimonial"
                  className="circle"
                />
              </div>
              <span className="highlighted">
                <span className="gray">Marketing expert</span>
              </span>
              <span>
                Digital products are a unique opportunity that today is
                revolutionizing online business and the world of digital
                marketing. And you only need 3 things to get started: a
                computer, internet connection and the knowledge that we are
                going to reveal to you in this program.
              </span>
            </div>
          </div>

          {/* End of first row */}
          <div className="centeredGrid">
            <div style={position}>
              <div className="circle">
                <img
                  src={'/img/circular.png'}
                  alt="illustrative image of a testimonial"
                  className="circle"
                />
              </div>
              <span className="highlighted">
                <span className="gray">Marketing expert</span>
              </span>
              <span>
                Digital products are a unique opportunity that today is
                revolutionizing online business and the world of digital
                marketing. And you only need 3 things to get started: a
                computer, internet connection and the knowledge that we are
                going to reveal to you in this program.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
