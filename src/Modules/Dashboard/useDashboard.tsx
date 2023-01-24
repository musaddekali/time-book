import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase_config";
import { handleEventDataLoading, setAllEventData } from "./dashboardSlice";

const useDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { dashboard, auth_user } = useSelector((state: any) => state);
  const { createdEventData, isEventDataLoading } = dashboard;
  const { user } = auth_user;

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
      if (user.uid && !createdEventData.length) {
        try {
          const eventsRef = query(
            collection(db, "events", user?.uid, "event_list"),
            orderBy("createdAt", "desc")
          );
          const allEventsData = [];
          const allEvents = await getDocs(eventsRef);
          allEvents.forEach((item) => {
            allEventsData.push(item.data());
          });
          dispatch(setAllEventData(allEventsData));
          dispatch(handleEventDataLoading(false));
          console.log("All events -> ", allEventsData);
        } catch (error) {
          dispatch(handleEventDataLoading(false));
          console.log("All events get firebase error -> ", error);
        }
      }
    }
    getAllEvents();
  }, [user]);

  return {
    isModalOpen,
    showCreateEventModal,
    handleCreateEventCancel,
    isEventDataLoading,
    createdEventData
  };
};

export default useDashboard;
