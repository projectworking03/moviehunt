import "./Rating.css";

const Rating = ({ provider, value }) => {
  return (
    <tr className="rating">
      <td className="rating__name">{provider}</td>
      <td className="rating__value">{value}</td>
    </tr>
  );
};

export default Rating;
