// import { Calendar } from "antd";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";

const event_data = {
  event_name: "30 min Talk about job",
  event_location: "Phone",
  event_duration: 30,
  selected_week_days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
  created_at: new Date("2023-01-10").toString(),
};

const {
  event_name,
  event_location,
  event_duration,
  selected_week_days,
  created_at,
} = event_data;

const Booking = () => {
  const [selectedDate, onDateChange] = useState(new Date());
  const [activeBtn, setActiveBtn] = useState(null);
  const { user } = useSelector((state: any) => state.auth_user);
  const [isDateActive, setIsDateActive] = useState(false);

  const handleIsDateActive = () => {
    console.log(selectedDate);
    setIsDateActive(true);
  };

  // minute convertar
  const timeLength = (minutes: number) => {
    if (minutes > 59) {
      return minutes / 60 + " Hour";
    }
    return minutes + " Minutes";
  };

  // get missing week days
  function getMissingWeekDays(selected_week_days: string | string[]) {
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let missDays = [];

    weekDays.map((day, index) => {
      if (selected_week_days.includes(day)) return;
      return missDays.push(index);
    });

    return missDays;
  }

  const notAvailableDays = getMissingWeekDays(selected_week_days); //return array
  // console.log("missing days -> ", notAvailableDays);
  // console.log("selected days -> ", selectedDate);

  // Make Date slot disable function
  function disableDate(date) {
    const d = date;
    const clndrDay = d.getDay();
    if (notAvailableDays.includes(clndrDay)) {
      // console.log("disable day", d);
      return true;
    }
  }

  // set calendar tileContent
  function clndrEnableTileContentHtml(date) {
    const d = date;
    const clndrDay = d.getDay();
    if (notAvailableDays.includes(clndrDay) || date < new Date()) return;
    // if (date < new Date()) return;
    return <span className="_calendar_active_date_dot" />;
  }

  // console.log("demo-book-data-> ", data);

  const checkActiveBtn = (i: number) => {
    setActiveBtn(i);
  };

  // console.log("selected day -> ", selectedDate, "current Date -> ", new Date());

  const times = ["10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm"];

  return (
    <section>
      <div className="container">
        <h1 className="mt-4 mb-5 text-center">Book you time for connection</h1>
        <div className="row justify-content-center">
          <div className="col-md-4 d-flex pe-0">
            <div className="border w-100 h-100 p-4 rounded">
              <div>
                {user?.user_image && (
                  <img
                    className="rounded rounded-circle mb-3 shadow"
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "cover",
                    }}
                    src={user?.user_image}
                    alt={user?.user_name}
                  />
                )}
              </div>
              <h6>{user?.user_name}</h6>
              <h3>{event_name}</h3>
              <p>
                <strong>Time: </strong>
                <span>{timeLength(event_duration)}</span>
              </p>
              <p>
                <strong>Type: </strong>
                <span>{event_location}</span>
              </p>
            </div>
          </div>
          <div className="col-md-8 ps-0">
            <div className="_calendar_wrap d-flex ">
              <div className="_calendar_left">
                <div className="_calendar">
                  <Calendar
                    onClickDay={() => {
                      handleIsDateActive();
                    }}
                    showNeighboringMonth={false}
                    tileDisabled={({ activeStartDate, date, view }) => {
                      return disableDate(date) || date < new Date();
                    }}
                    tileContent={({ activeStartDate, date, view }) => {
                      return clndrEnableTileContentHtml(date);
                    }}
                    // onActiveStartDateChange={({ action, activeStartDate, value, view }) => alert('New view is:')}
                    onChange={onDateChange}
                    value={selectedDate}
                    view={"month"}
                    tileClassName="_calendar_date_box"
                    prev2Label={null}
                    next2Label={null}
                  />
                </div>
              </div>
              {isDateActive && (
                <div className="_calendar_right border rounded p-2">
                  {times.map((t, i) => (
                    <div
                      key={i}
                      className={`_avail_time_box overflow-hidden mb-3 ${
                        activeBtn === i ? "_active" : ""
                      }`}
                    >
                      <button
                        onClick={() => checkActiveBtn(i)}
                        className="btn btn-outline-primary _avail_time_btn"
                      >
                        {t}
                      </button>
                      <button className="btn btn-primary _avail_time_btn _avail_time_btn_confirm">
                        Confirm
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
