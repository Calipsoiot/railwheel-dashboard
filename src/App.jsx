
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/production")
        .then((res) => res.json())
        .then((data) => setData(data));
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const productionChart = {
    labels: data.map((item) => item.wheelType),
    datasets: [
      {
        label: "Production",
        data: data.map((item) => item.produced),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const defectiveChart = {
    labels: data.map((item) => item.wheelType),
    datasets: [
      {
        label: "Defective",
        data: data.map((item) => item.defective),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const efficiencyChart = {
    labels: data.map((item) => item.wheelType),
    datasets: [
      {
        label: "Efficiency %",
        data: data.map(
          (item) =>
            (((item.produced - item.defective) / item.produced) * 100).toFixed(
              2
            )
        ),
        backgroundColor: [
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
      },
    ],
  };

  const totalProduced = data.reduce(
    (sum, item) => sum + item.produced,
    0
  );

  const totalDefective = data.reduce(
    (sum, item) => sum + item.defective,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Rail Wheel Factory Dashboard
      </h1>

      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            minWidth: "200px",
            textAlign: "center",
          }}
        >
          <h3>Total Production</h3>
          <h2>{totalProduced}</h2>
        </div>

        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            minWidth: "200px",
            textAlign: "center",
          }}
        >
          <h3>Total Defects</h3>
          <h2>{totalDefective}</h2>
        </div>
      </div>

      {/* Production + Defects Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          marginBottom: "50px",
        }}
      >
        {/* Production */}
        <div>
          <h3>Production by Wheel Type</h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div style={{ width: "250px" }}>
              <Pie data={productionChart} />
            </div>

            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Wheel Type</th>
                  <th>Produced</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.wheelType}</td>
                    <td>{item.produced}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Defects */}
        <div>
          <h3>Defects by Wheel Type</h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div style={{ width: "250px" }}>
              <Pie data={defectiveChart} />
            </div>

            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Wheel Type</th>
                  <th>Defective</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.wheelType}</td>
                    <td>{item.defective}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Efficiency Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>
            Efficiency (%)
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div style={{ width: "250px" }}>
              <Pie data={efficiencyChart} />
            </div>

            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Wheel Type</th>
                  <th>Efficiency %</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.wheelType}</td>
                    <td>
                      {(
                        ((item.produced - item.defective) /
                          item.produced) *
                        100
                      ).toFixed(2)}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

