import "./footer.styles.scss";
import Insta from "../../assets/img/svg/insta.svg";
import Twitter from "../../assets/img/svg/twit.svg";
import Fb from "../../assets/img/svg/fb.svg";
import FooterLogo from "../../assets/img/svg/footer_truck.svg";
const Footer = () => {
  return (
    <main className="footer">
      <img src={FooterLogo} alt="" className="footer-img" />

      <section className="contact-section">
        <span className="contact">Contact Us</span>
        <span className="address">
          Lorem Ipsum Pvt Ltd.5/1, Magalton Road, Phartosh Gate near YTM Market,
          XYZ-343434
        </span>
        <span className="email">example2020@gmail.com</span>
        <span className="phone">(904) 443-0343</span>
      </section>
      <section className="links-section">
        <span className="more">More</span>
        <span className="about-us">About Us</span>
        <span className="products">Products</span>
        <span className="career">Career</span>
        <span className="contact-us">Contact Us</span>
      </section>
      <section className="media-section">
        <div className="media-status">Social Links</div>
        <div className="img-container">
          <span>
            <img src={Insta} alt="instagram" className="img" />
          </span>
          <span style={{ width: "21.97px", height: "17.1px" }}>
            <img src={Twitter} alt="twitter" className="img" />
          </span>
          <span style={{ width: "10.97px", objectFit: "contain" }}>
            <img src={Fb} alt="facebook" className="img" />
          </span>
        </div>
      </section>
      <div className="copyright">
        <div>&copy; 2022 Food Truck Example</div>
      </div>
    </main>
  );
};

export default Footer;
