import React, { useEffect, useRef, useState } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleCreateEventData } from "./dashboardSlice";
import { db } from "../../firebase/firebase_config";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const CreateEventBox = ({ handleCreateEventCancel }) => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("Phone");
  const [timeDuration, setTimeDuration] = useState("30");
  const isReadyToCreate = Boolean(eventName.trim());
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth_user);
  const [btnLoading, setBtnLoading] = useState(null);
  const eventNameRef = useRef(null);

  useEffect(() => {
    eventNameRef.current.focus();
  }, []);

  const getOnDuration = (value: string) => {
    setTimeDuration(value);
  };

  const getOnLocation = (value: string) => {
    setEventLocation(value);
  };

  const handleEventDataSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const createEventFormData = {
        id: Date.now().toString(),
        createdAt: Timestamp.fromDate(new Date()),
        eventName,
        eventLocation,
        timeDuration,
      };

      const eventRef = doc(
        db,
        "events",
        user?.user_name.concat(user?.token),
        "event_list",
        createEventFormData?.id
      );
      await setDoc(eventRef, createEventFormData);
      dispatch(handleCreateEventData(createEventFormData));
      setEventName("");
      handleCreateEventCancel(false);
      setBtnLoading(false);
    } catch (error) {
      console.log("Create Event Error -> ", error);
    }
  };

  return (
    <div style={{ maxWidth: "580px" }} className="p-4">
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
