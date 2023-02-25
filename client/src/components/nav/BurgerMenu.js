import "../../assets/styles/BurgerMenu.scss";

const BurgerMenu = (props) => {
  const className = "burgerStripe";

  let className1 = className;
  let className2 = className;
  let className3 = className;

  if (props.burgerModel === "burgerOpen") {
    className1 = className1 + " burger1";
    className2 = className2 + " burger2";
    className3 = className3 + " burger3";
  }

  return (
    <div className="burger">
      <div className={className1}></div>
      <div className={className2}></div>
      <div className={className3}></div>
    </div>
  );
};

export default BurgerMenu;
