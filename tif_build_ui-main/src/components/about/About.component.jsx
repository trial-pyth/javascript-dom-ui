import "./about.styles.scss";
const About = () => {
  return (
    <section className="about-section">
      <div className="img-container">
        <img className="img-section" />
      </div>
      <div className="about-container">
        <div className="about-title">About Us</div>
        <div className="about-content">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. t has survived not only
          five centuries.
        </div>
        <button>
          <span>Read More</span>
        </button>
      </div>
    </section>
  );
};

export default About;
