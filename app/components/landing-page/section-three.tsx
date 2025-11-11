export function LandingPageV1_SectionThree() {
  return (
    <div className="centeredGrid">
      <div className="instructorTitle">
        <h1 className="megaTitleBlue">Your instructor</h1>
        <h1>John Doe</h1>
      </div>

      <div className="col6">
        <div className="el">
          {/* instructor image */}
          <div className="instructorImg">
            <div className="cover">
              <img
                src={'/img/instructor.jpg'}
                alt="instructor"
                className="img"
              />
            </div>
          </div>
          {/* end of instructor image */}
        </div>

        <div className="el">
          <span>
            <span className="highlighted">
              <span className="gray">Marketing expert</span>
            </span>
            <br />
            <span>
              Digital products are a unique opportunity that today is
              revolutionizing online business and the world of digital
              marketing. You only need three things to start it!
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
