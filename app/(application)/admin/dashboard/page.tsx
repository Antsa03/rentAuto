"use client";
import { useClient } from "@/hooks/useFechData.hook";
import GraphData from "@/types/GraphData.type";
import Statistic from "@/types/Statistic.type";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Space } from "antd";
import React from "react";
import { useQuery } from "react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";

const AdminDashboard: React.FC = () => {
  const statistic_data = useClient<Statistic>("/api/admin/dashboard/statistic");

  const statistic = useQuery({
    queryKey: ["statistic"],
    queryFn: statistic_data.fetchData,
  });

  const graph_data = useClient<GraphData[]>("/api/admin/dashboard/graph-data");

  const graph = useQuery({
    queryKey: ["graphData"],
    queryFn: graph_data.fetchData,
  });

  if (statistic.isLoading || graph_data.isLoading)
    return <h1>Chargement ...</h1>;

  if (statistic.isError || graph_data.isLoading)
    return <h1>Une erreur a survenu</h1>;

  return (
    <main className="main-container">
      <div className="main-title">
        <h1 className="text-3xl text-customBlue font-extrabold my-4">
          <Space size="small">
            <Icon icon="fluent-mdl2:b-i-dashboard" />
            <span>Tableau de bord</span>
          </Space>
        </h1>
      </div>

      <div className="main-cards">
        <div className="card bg-customGreen">
          <div className="card-inner">
            <h3>Voitures</h3>
            <Icon icon="gis:car" className="card_icon" />
          </div>
          <h1>{statistic.data?.nbr_voiture}</h1>
        </div>
        <div className="card bg-customBlue">
          <div className="card-inner">
            <h3>Clients</h3>
            <Icon icon="ion:people" className="card_icon" />
          </div>
          <h1>{statistic.data?.nbr_client}</h1>
        </div>
        <div className="card bg-gray-500">
          <div className="card-inner">
            <h3>Prix total de location</h3>
            <Icon icon="mdi:money" className="card_icon" />
          </div>
          <h1>
            {Number(statistic.data?.total_prix_location).toLocaleString() +
              " Ar"}
          </h1>
        </div>
        {/* <div className="card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>12</h1>
        </div> */}
      </div>

      {graph.data && (
        <div className="charts">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={500}
              height={300}
              data={graph.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="immatriculation" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Nombre de location" fill="#154603" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={graph.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="immatriculation" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="Nombre de location" stroke="#1E2833" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </main>
  );
};

export default AdminDashboard;
