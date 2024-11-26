import React, { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { DATABASE_MAIN } from '../contexts/api';

const RentalScheduler = () => {
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    await fetch(`${DATABASE_MAIN}/rentalEventSaved.php`)
    //await fetch(`${DATABASE_MAIN}/rentalEvents.php`)
      .then((response) => {
        response.json().then((data) => {
          const trasformedEvents = data.map((rep) => {
            return {
              event_id: rep.id,
              title: rep.title + " " + rep.rentier,
              start: new Date(rep.start),
              end: new Date(rep.end),
              rentier: rep.rentier,
              color: "#339fff",
            };
          });
          return setEvents(trasformedEvents.filter((fitem) => fitem.rentier));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchEvents();
  }, []);

    const fetchRemote = async (query) => {
    //console.log("Query: ", query);
    //Simulate fetchin remote data
    return new Promise((res) => {
      //setTimeout(() => {
        res(fetchEvents());
      //}, 3000);
    });
  };

  const handleConfirm = async (event, action) => {
    //console.log(event, action);
    if (action === "edit") {
      /** PUT event to remote DB */
    } else if (action === "create") {
      /**POST event to remote DB */
    }
    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          ...event,
          event_id: event.event_id || Math.random(),
        });
      }, 3000);
    });
  };

  const handleDelete = async (deletedId) => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 3000);
    });
  };

  const fields = [
    {
      name: "user_id",
      type: "select",
      // Should provide options with type:"select"
      options: [
        { id: 1, text: "John", value: 1 },
        { id: 2, text: "Mark", value: 2 },
      ],
      config: { label: "User", required: true, errMsg: "Plz Select User" },
    },
    {
      name: "Description",
      type: "input",
      default: "Default Value...",
      config: { label: "Details", multiline: true, rows: 4 },
    },
    /* {
      name: "anotherdate",
      type: "date",
      config: {
        label: "Other Date",
        md: 6,
        modalVariant: "dialog",
        type: "datetime"
      }
    } */
  ];

  return (
    <Scheduler
      remoteEvents={fetchRemote}
      onConfirm={handleConfirm}
      onDelete={handleDelete}
      fields={fields}
      view="month"
      month={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 9,
        endHour: 17,
      }}
      events={events}
      height="500"
      selectedDate={new Date()}
    />
  );
};
export default RentalScheduler;
