import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase_config";
import { handleEventDataLoading, handleEventDelete, setAllEventData } from "./dashboardSlice";

const useDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { dashboard, auth_user } = useSelector((state: any) => state);
  const { createdEventData, isEventDataLoading } = dashboard;
  const { user } = auth_user;
  const [isEventDeleting, setIsEventDeleting] = useState(false);

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
      if (user.uid) {
        try {
          const eventsRef = query(
            collection(db, "events", user?.uid, "event_list"),
            orderBy("created_at", "desc")
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

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Do you want to delete?")) {
      setIsEventDeleting(true);
      try {
        const eventRef = doc(db, "events", user?.uid, "event_list", id);
        await deleteDoc(eventRef);
        dispatch(handleEventDelete(id));
        setIsEventDeleting(false);
      } catch (error) {
        setIsEventDeleting(false);
        console.log("Event delete error ", error);
      }
    }
  };

  // convert minute to hour and add HOUR/MINUTE string
  const timeLength = (minutes: number) => {
    if (minutes > 59) {
      return minutes / 60 + " Hour";
    }
    return minutes + " Minutes";
  };



  return {
    isModalOpen,
    showCreateEventModal,
    handleCreateEventCancel,
    isEventDataLoading,
    createdEventData,
    handleDeleteEvent,
    timeLength,
    isEventDeleting
  };
};

export default useDashboard;
