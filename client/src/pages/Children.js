import { useSelector } from "react-redux";
import Tile from "../components/tile/Tile.js";

const Children = () => {
  const project = useSelector((state) => state.project);
  const children = [...project.data];

  const jwt = localStorage.getItem("jwt");

  return (
    <main className="main">
      {children.map((child, i) => {
        return (
          <div key={i}>
            <h2>{child.title}</h2>
            {child.children.map((element, i) => {
              return <Tile key={i} element={element} jwt={jwt} />;
            })}
          </div>
        );
      })}
    </main>
  );
};

export default Children;
