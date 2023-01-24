import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Clock from "../../components/Clock/Clock";
import { db } from "../../firebase/firebase_config";
import Booking from "../../Modules/Booking/Booking";

const EventPreviewPage = () => {
  const router = useRouter();
  const { event_id } = router.query;
  const user = useSelector((state: any) => state.user);
  console.log(user?.user_uid);

  const getSingleEvent = async () => {
    try {
      const ref = doc(
        db,
        "events",
        "J8YMwBHsqph7fxzubyDZsK8qsU62",
        "event_list",
        event_id.toString()
      );
      const res = await getDoc(ref);
      console.log("single doc is -> ", res.data());
    } catch (error) {
      console.log("Single event getting error -> ", error.message);
    }
  };

  useEffect(() => {
    if (event_id) {
      getSingleEvent();
    }
  }, [event_id]);

  return (
    <div>
      <h1>booking id : {event_id}</h1>
      <Clock />
      <Booking />
    </div>
  );
};

export default EventPreviewPage;
