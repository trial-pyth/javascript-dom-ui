import "./intro.styles.scss";

import Logo from "../../assets/img/svg/footer_truck.svg";

const Intro = () => {
  return (
    <main className="intro">
      <section className="left-container">
        <img src={Logo} alt="logo" className="logos" />
        <div className="heading">
          Discover the <span style={{ color: "#e23744" }}>Best</span> Food and
          Drinks
        </div>
        <div className="sub-heading">
          Naturally made Healthcare Products for the better care &#38; support
          of your body
        </div>
        <button>
          <span>Explore Now!</span>
        </button>
      </section>
      <section className="right-container">
        <button className="touch-button">
          <span>Get In Touch</span>
        </button>
        <div className="vector-img"></div>
      </section>
    </main>
  );
};

export default Intro;
