import React from "react";
import DashboardList from "../dashboard/DashboardList";
import { useTranslation } from "react-i18next";
import "../localization/i18n";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <div id="dashboard">
      <div className="navbar-nav bg-dark p-2">
        <h2 className="text-light">
          <i className="bi bi-dash-square" /> {t("dashboard")}
        </h2>
        <p className="text-light">{t("dashboardMessage")}</p>
      </div>
      <DashboardList />
    </div>
  );
};

export default Dashboard;
