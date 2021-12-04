import "./Rating.css";

const Rating = ({ name, value }) => {
  return (
    <tr className="rating">
      <td className="rating__name">{name}</td>
      <td className="rating__value">{value}</td>
    </tr>
  );
};

export default Rating;
