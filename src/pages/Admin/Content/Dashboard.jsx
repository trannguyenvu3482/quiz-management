import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOverview } from "../../../services/apiService";
import { toast } from "react-toastify";
import _, { toUpper } from "lodash";

const data = [
  {
    name: "Quizzes",
    Qz: 4000,
  },
  {
    name: "Questions",
    Qs: 3000,
  },
  {
    name: "Answers",
    As: 2000,
  },
];

const Dashboard = () => {
  const [chartData, setChartData] = useState(data);
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOverview();

      if (res && res.EC === 0) {
        setSummaryData({
          users: res.DT.users.total,
          answers: res.DT.others.countAnswers,
          questions: res.DT.others.countQuestions,
          quizzes: res.DT.others.countQuiz,
        });

        setChartData([
          {
            name: "Quizzes",
            Qz: res.DT.others.countQuiz,
          },
          {
            name: "Questions",
            Qs: res.DT.others.countQuestions,
          },
          {
            name: "Answers",
            As: res.DT.others.countAnswers,
          },
        ]);
      } else {
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container h-screen bg-cyan-50 px-10 pt-16">
      <div className="top border-b border-gray-300 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
            Today: {new Date().toDateString().slice(4).slice(0, 6)}
          </button>
        </div>

        <p className="mt-2">Welcome, Users! Have a great day ✨</p>
      </div>

      <div className="bottom mt-4 flex gap-4">
        <div className="left grid w-4/12 grid-cols-2 grid-rows-2 gap-4">
          {!_.isEmpty(summaryData) &&
            Object.keys(summaryData).map((item, index) => (
              <div
                key={index}
                className="card rounded-lg bg-white p-4 hover:scale-105 hover:shadow-lg"
              >
                <h2 className="text-lg font-semibold">
                  Total {_.startCase(item)}
                </h2>
                <p className="text-4xl font-bold">{summaryData[item]}</p>
              </div>
            ))}
        </div>
        <div className="right w-8/12">
          <div className="card hover:translate-z-[2px] rounded-lg bg-white p-4 hover:shadow-md">
            <h2 className="mb-4 text-lg font-semibold">
              Users answer correct:
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Qz"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                  stackId="a"
                />
                <Bar
                  dataKey="Qs"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                  stackId="a"
                />
                <Bar
                  dataKey="As"
                  fill="#ffc658"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
