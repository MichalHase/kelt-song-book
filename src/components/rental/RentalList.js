import React, { useState, useEffect } from "react";
import RentalItem from "./RentalItem";
import PageNavigation from "../UI/PageNavigation";
import RentalScheduler from "./RentalScheduler";
import { DATABASE_MAIN } from '../contexts/api';
import { useTranslation } from "react-i18next";
import "../localization/i18n";

const RentalList = (props) => {
  const { t } = useTranslation();
  const [repository, setRepository] = useState([]);
  const [filteredRepository, setFilteredRepository] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const limit = 12;
  const [schedulerEnabled, setSchedulerEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionChanged, setActionChanged] = useState("");

  async function fetchRepository() {
    setIsLoading(true);
    await fetch(`${DATABASE_MAIN}/rentalItems.php`)
      .then((response) => {
        //await fetch('https://react-http-5e61a-default-rtdb.europe-west1.firebasedatabase.app/items.json').then(response => {
        response.json().then((data) => {
          const trasformedRepository = data.map((rep) => {
            return {
              id: rep.id,
              name: rep.name,
              description: rep.description,
              fromDate: rep.fromDate,
              toDate: rep.toDate,
              rentier: rep.rentier,
              lastRentier: rep.lastRentier,
              state: rep.state,
              place: rep.place,
            };
          });
          setIsLoading(false);
          setPages(trasformedRepository.length/limit);
          return setRepository(trasformedRepository);
        });
      })
      .catch((error) => {
        console.log(error); 
      });
  }

  useEffect(() => {
    fetchRepository();
  }, [actionChanged]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [props.actualPage]);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setFilteredRepository(
        repository
          .filter((fitem) => fitem.name.includes(searchTerm))
          .map((item) => (
            <RentalItem
              key={"re"+item.id}
              onAction={setActionChanged}
              sourceItem={item}
            />
          ))
      );
    } else {
      setFilteredRepository(
        repository
        .filter(item => item.id > page*limit &&  item.id <=page*limit + limit)
        .map((item) => (
          <RentalItem
            key={"re"+item.id}
            onAction={setActionChanged}
            sourceItem={item}
          />
        ))
      );
    }
  }, [searchTerm, repository, page, actionChanged]);

  const filterChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const previousPageChangeHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextPageChangeHandler = () => {
    if (page < pages-1){
    setPage(page + 1);
  }
  };
  const pageChangeHandler = (event) => {
    setSearchTerm("");
    if (!Number.isInteger(event.target.value)) {
      var newPage = parseInt(event.target.value, 10);
      if (newPage !== page) {
        setPage(newPage);
      }
    }
  };
  const onClickedHandler = () => {
    setSchedulerEnabled(!schedulerEnabled);
  };
  return (
    <div id="rentalList" className="pt-3">
      {isLoading && <div className="spinner-border text-info"></div>}
      
      <div className="text-center pt-2">
        <div className="form-floating mb-3">
          <input
            type="search"
            className="form-control"
            id="search"
            placeholder={t("search")}
            name="search"
            onChange={filterChangeHandler}
            value={searchTerm}
          />
          <label htmlFor="search">{t("search")}</label>
        </div>
      </div>

      <div className="text-center pt-2">
        <div><button className="btn btn-primary" onClick = {onClickedHandler}>{t("scheduler")}</button></div>
        {schedulerEnabled && <div className="p-1"><RentalScheduler /></div>}
      </div>
      
      <div className="text-center pt-2">
        <PageNavigation
          actualPage={page}
          length={pages}
          previousPageChangeHandler={previousPageChangeHandler}
          nextPageChangeHandler={nextPageChangeHandler}
          pageChangeHandler={pageChangeHandler}
        />
      </div>

      <div className="container-fluid-md rentals">
        <div className="row">{filteredRepository}</div>
      </div>
       
      <div className="text-center pb-2">
        <PageNavigation
          actualPage={page}
          length={pages}
          previousPageChangeHandler={previousPageChangeHandler}
          nextPageChangeHandler={nextPageChangeHandler}
          pageChangeHandler={pageChangeHandler}
        />
      </div>
      
    </div>
  );
};

export default RentalList;