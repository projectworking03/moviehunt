import "./ErrorPage.css";
import Header from "../components/Header";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className="errorPage">
        <h1>No movie found with this ID!</h1>
      </div>
    </>
  );
};

export default ErrorPage;
