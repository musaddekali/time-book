import React, { useEffect, useRef, useState } from "react";
import { Select, Checkbox, Tooltip, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSingleEvent } from "../dashboardSlice";
import { db } from "../../../firebase/firebase_config";
import { doc, setDoc } from "firebase/firestore";
import dayjs from "dayjs";
import moment from "moment";

const CreateEventBox = ({ handleCreateEventCancel }) => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("Phone");
  const [timeDuration, setTimeDuration] = useState("30");
  const isReadyToCreate = Boolean(eventName.trim());
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth_user);
  const [btnLoading, setBtnLoading] = useState(null);
  const eventNameRef = useRef(null);
  const CheckboxGroup = Checkbox.Group;
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [selectedWeekDays, setSelectedWeekDays] = useState(weekDays);
  // const [availableTime, setAvailableTime] = useState([
  //   moment("10:00", "HH:mm").format("LT"),
  //   moment("19:00", "HH:mm").format("LT"),
  // ]);
  const [availableTime, setAvailableTime] = useState(["10.00 am", "7.00 pm"]);
  console.log("available time ", availableTime);
  // console.log('Day js', dayjs().format());
  // console.log('Moment js', moment().format('Lt'));
  console.log("available time am pm to 24h -> ", [
    moment(availableTime[0], ["h:mm A"]).format("HH:mm"),
    moment(availableTime[1], ["h:mm A"]).format("HH:mm"),
  ]);

  useEffect(() => {
    eventNameRef.current.focus();
  }, []);

  const getOnDuration = (value: string) => {
    setTimeDuration(value);
  };

  const getOnLocation = (value: string) => {
    setEventLocation(value);
  };

  const getAvailableWeekDays = (list) => {
    setSelectedWeekDays(list);
  };

  const getAbailableTimeRange = (time, timeString) => {
    setAvailableTime(timeString);
  };

  // store event
  const handleEventDataSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const createEventFormData = {
        id: Date.now().toString(),
        created_at: new Date().toString(),
        event_name: eventName,
        event_location: eventLocation,
        time_duration: timeDuration,
        selected_week_days: selectedWeekDays,
        available_time: [
          moment(availableTime[0], ["h:mm A"]).format("HH:mm"),
          moment(availableTime[1], ["h:mm A"]).format("HH:mm"),
        ],
        user_name: user?.user_name,
        uid: user?.uid,
        user_image: user?.user_image,
      };

      const eventRef = doc(
        db,
        "events",
        user?.uid,
        "event_list",
        createEventFormData?.id
      );
      await setDoc(eventRef, createEventFormData);
      dispatch(setSingleEvent(createEventFormData));
      setEventName("");
      handleCreateEventCancel(false);
      setBtnLoading(false);
    } catch (error) {
      console.log("Create Event Error -> ", error);
    }
  };

  return (
    <div style={{ maxWidth: "650px" }} className="p-4">
      <form onSubmit={handleEventDataSubmit}>
        <input
          ref={eventNameRef}
          onChange={(e) => setEventName(e.target.value)}
          className="form-control mb-4"
          type="text"
          placeholder="Event Name"
          required
        />
        <div className="mb-4 d-flex gap-3 align-items-center">
          <span>Select Location</span>
          <Select
            defaultValue="Phone"
            style={{ width: 120 }}
            size="large"
            onChange={getOnLocation}
            options={[
              {
                value: "phone",
                label: "Phone",
              },
              {
                value: "chat",
                label: "Chat",
              },
              {
                value: "meet",
                label: "Meet",
              },
            ]}
          />
        </div>
        <div className="d-flex gap-3 align-items-center">
          <span>Time Duration</span>
          <Select
            defaultValue="30 Min"
            style={{ width: 120 }}
            size="large"
            onChange={getOnDuration}
            options={[
              {
                value: "15",
                label: "15 Min",
              },
              {
                value: "30",
                label: "30 Min",
              },
              {
                value: "60",
                label: "60 Min",
              },
            ]}
          />
        </div>

        <div className="my-4">
          <div className="d-flex align-items-center gap-3 mb-2">
            <h5 className="card-title">Available Hours</h5>
          </div>
          <TimePicker.RangePicker
            onChange={getAbailableTimeRange}
            format={"h:mm A"}
            defaultValue={[dayjs("10.00", "HH:mm"), dayjs("19.00", "HH:mm")]}
            size="large"
          />
          {/* <small className="px-3">
            {availableTime?.[0]} - {availableTime?.[1]}
          </small> */}
        </div>

        <div>
          <div className="d-flex align-items-center gap-3 mb-2 mt-4">
            <h5 className="card-title mb-3">
              Available Days{" "}
              <span className="text-success">{selectedWeekDays.length}</span>
            </h5>
          </div>
          <div className="_ant_week_checkbox">
            <CheckboxGroup
              options={weekDays}
              value={selectedWeekDays}
              onChange={getAvailableWeekDays}
            />
          </div>
        </div>
        <div className="mt-4 text-end">
          <button
            className="btn btn-primary"
            disabled={!isReadyToCreate && !btnLoading}
          >
            {btnLoading ? <span className="spinner-border" /> : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventBox;
