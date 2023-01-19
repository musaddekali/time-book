import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebase_config";
import { handleEventDelete } from "../Dashboard/dashboardSlice";

const EventCard = ({ event }) => {
  const { id, eventName, eventLocation, timeDuration } = event;
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth_user);

  const timeLength = (minutes: number) => {
    if (minutes > 59) {
      return minutes / 60 + " Hour";
    }
    return minutes + " Minutes";
  };

  const handleDelete = async () => {
    if (window.confirm("Do you want to delete?")) {
      setIsDeleting(true);
      try {
        const eventRef = doc(
          db,
          "events",
          user?.user_name.concat(user?.token),
          "event_list",
          id
        );
        await deleteDoc(eventRef);
        dispatch(handleEventDelete(id));
        setIsDeleting(false);
      } catch (error) {
        setIsDeleting(false);
        console.log("Event delete error ", error);
      }
    }
  };

  return (
    <div className="col-sm-6 col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{eventName}</h5>
          <p className="card-text">{eventLocation ? eventLocation : ""}</p>
          <p className="card-text">{timeLength(timeDuration)}</p>
        </div>
        <div className="card-footer d-flex gap-3">
          <button className="btn btn-sm btn-outline-success">Copy Link</button>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline-danger"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
