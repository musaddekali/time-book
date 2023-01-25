// import { Calendar } from "antd";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import useBooking from "./useBooking";

const Booking = ({ event }) => {
  const {
    isDateActive,
    handleIsDateActive,
    onDateChange,
    timeLength,
    clndrEnableTileContentHtml,
    disableDate,
    selectedDate,
  } = useBooking(event);
  const [activeBtn, setActiveBtn] = useState(null);
  const { user } = useSelector((state: any) => state.auth_user);

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
                {event?.user_image && (
                  <img
                    className="rounded rounded-circle mb-3 shadow"
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "cover",
                    }}
                    src={event?.user_image}
                    alt={event?.user_name}
                  />
                )}
              </div>
              <h6>{event?.user_name}</h6>
              <h3>{event?.event_name}</h3>
              <p>
                <strong>Time: </strong>
                <span>{timeLength(event?.time_duration)}</span>
              </p>
              <p>
                <strong>Type: </strong>
                <span>{event?.event_location}</span>
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
                      return clndrEnableTileContentHtml(
                        date,
                        <span className="_calendar_active_date_dot" />
                      );
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
