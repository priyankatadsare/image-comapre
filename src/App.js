import './App.css';
import { Card, Button, Divider } from "antd";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";

const gridStyle = {
  width: "25%",
  height: "300px",
  textAlign: "center",
  marginTop: "2rem",
  marginLeft: "2rem",
  marginBottom: "1rem",
  color: "black",
  background: "#ffffff",
  fontWeight: "Bold",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  fontSize: "1rem",
  borderRadius: "1rem",
  borderColor: "black",
  boxshadow: "5px 10px #888888",
  borderColor: "black",
};

function App() {

  const [data, setData] = useState();
  const [image, setImage] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => {
        const newData = json.splice(1, 10);
        setData(newData);
      });
  }, []);

  const compare = (data) => {
    setFlag(true);
    setImage(data);
  };

  return (
    <div className="App">
      <div>
      {data &&
        data.map((data, key) => {
          return (
            <div>
            <Card.Grid style={gridStyle}>
              <img src={data.thumbnailUrl} height="80px" width="80px" />
              <h4>{data.title}</h4>
              <h4>{data.albumId}</h4>
              <h4>{data.url}</h4>
              <Button onClick={(e) => compare(data)}>Compare</Button>
            </Card.Grid>
            </div>
          );
        })}
        </div>
        <Divider />
        <h2>Image Comparison</h2>
        <Divider />
        <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-primary">
              Images
            </th>
            <th scope="col" className="text-primary">
              ID
            </th>
            <th scope="col" className="text-primary">
              URL
            </th>
            <th scope="col" className="text-primary">
              Title
            </th>
          </tr>
        </thead>
        {flag && (
          <tbody>
            <tr>
              <td>
                <img src={image.thumbnailUrl} height="80px" width="80px" />
              </td>
              <td>{image.albumId}</td>
              <td>{image.url}</td>
              <td>{image.title}</td>
            </tr>
          </tbody>
        )}
      </table>
      </div>
    </div>
  );
}

export default App;
