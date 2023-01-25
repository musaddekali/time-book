import React, { useState } from "react";

const useBooking = (event) => {
  // const { selected_week_days } = event;
  const [isDateActive, setIsDateActive] = useState(false);
  const [selectedDate, onDateChange] = useState(new Date());
  const times = ["10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm"];
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
  function getMissingWeekDays(week_days: string | string[]): string[] {
    let missDays = [];
    weekDays.map((day, index) => {
      if (week_days.includes(day)) return;
      return missDays.push(index);
    });
    return missDays;
  }

  const notAvailableDays = getMissingWeekDays(event?.selected_week_days); //return array

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
  function clndrEnableTileContentHtml(date, html) {
    const d = date;
    const clndrDay = d.getDay();
    // const str = '<span className="_calendar_active_date_dot" />';
    if (notAvailableDays.includes(clndrDay) || date < new Date()) return;
    // if (date < new Date()) return;
    return html;
  }

  return {
    weekDays,
    isDateActive,
    handleIsDateActive,
    onDateChange,
    timeLength,
    clndrEnableTileContentHtml,
    disableDate,
    selectedDate,
    times
  };
};

export default useBooking;
