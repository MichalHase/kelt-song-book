import React, { Fragment } from "react";
import ActionsList from "../actions/ActionsList";
import CommercialsList from "../commercials/CommercialsList";
import CronicleList from "../cronicle/CronicleList";
import MembersList from "../members/MembersList";

const Home = () => {
  return (
    <Fragment>
      <ActionsList />
      <CommercialsList />
      <CronicleList />
      <MembersList />
    </Fragment>
  );
};

export default Home;
