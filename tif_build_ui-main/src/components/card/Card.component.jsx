import "./card.styles.scss";

const Card = ({ card }) => {
  const { title, imageUrl } = { ...card };
  return (
    <div className="card">
      <img src={imageUrl} className="card-image" />
      <div className="card-title">{title}</div>
      <p className="card-body"></p>
      <button className="card-button">
        <span>Read More</span>
      </button>
    </div>
  );
};

export default Card;
