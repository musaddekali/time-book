import { useEffect, useState } from "react";
import { Modal } from "antd";
import Link from "next/link";
import React from "react";
import CreateEventBox from "./CreateEventBox";
import AvailabilityCard from "./AvailabilityCard";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebase_config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  handleCreateEventData,
  handleEventDataLoading,
} from "./dashboardSlice";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dashboard, auth_user } = useSelector((state: any) => state);
  const { createdEventData, isEventDataLoading } = dashboard;
  const { user } = auth_user;
  const dispatch = useDispatch();

  const showCreateEventModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateEventCancel = () => {
    setIsModalOpen(false);
  };

  // get events from firestore
  useEffect(() => {
    async function getAllEvents() {
      dispatch(handleEventDataLoading(true));
      if (user.token) {
        try {
          const eventsRef = query(
            collection(
              db,
              "events",
              user?.user_name.concat(user?.token),
              "event_list"
            ),
            orderBy("createdAt", "desc")
          );
          const allEventsData = [];
          const allEvents = await getDocs(eventsRef);
          allEvents.forEach((item) => {
            allEventsData.push(item.data());
            dispatch(handleCreateEventData(item.data()));
          });
          dispatch(handleEventDataLoading(false));
        } catch (error) {
          dispatch(handleEventDataLoading(false));
          console.log("All events get firebase error -> ", error);
        }
      }
    }
    getAllEvents();
  }, [user]);

  return (
    <section>
      <div className="bg-light d-flex py-4 mt-3">
        <div className="container">
          <div>
            <div className="d-block text-end">
              <button
                onClick={showCreateEventModal}
                className="btn btn-primary"
              >
                + Create Event
              </button>
            </div>
            <ul className="list-unstyled d-flex gap-3 align-items-center">
              <li>
                <Link href="">Events</Link>
              </li>
              <li>
                <Link href="">Scheduled Events</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <AvailabilityCard />
        <div className="row mt-4 gy-4">
          {/* {createdEventData?.length ? (
            createdEventData.map((item) => (
              <EventCard key={item.id} event={item} />
            ))
          ) : (
            <h3>Loading...</h3>
          )} */}
          {isEventDataLoading && <h3>Loading...</h3>}

          {createdEventData?.length > 0 &&
            createdEventData.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}

          {createdEventData?.length === 0 && !isEventDataLoading && (
            <h3 className="text-danger">No Event Created.</h3>
          )}
        </div>

        <Modal
          footer={null}
          open={isModalOpen}
          destroyOnClose
          onCancel={handleCreateEventCancel}
        >
          <CreateEventBox handleCreateEventCancel={handleCreateEventCancel} />
        </Modal>
      </div>
    </section>
  );
};

export default Dashboard;
