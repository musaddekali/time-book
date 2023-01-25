import Link from "next/link";
import useDashboard from "../useDashboard";

const EventCard = ({ event }) => {
  const { id, event_name, event_location, time_duration, created_at, uid } = event;
  const { handleDeleteEvent, timeLength, isEventDeleting } = useDashboard();

  return (
    <div className="col-sm-6 col-md-3 d-flex">
      <div className="card w-100">
        <div className="card-body">
          <Link href={`booking/${uid}/${id}`} target="_blank">
            <span className="card-link mb-3 d-block">Event preview</span>
          </Link>
          <h5 className="card-title">{event_name}</h5>
          <p className="card-text">{event_location ? event_location : ""}</p>
          <p className="card-text">{timeLength(time_duration)}</p>
        </div>
        <div className="card-footer d-flex gap-3">
          <button className="btn btn-sm btn-outline-success">Copy Link</button>
          <button
            onClick={() => handleDeleteEvent(id)}
            className="btn btn-sm btn-outline-danger"
          >
            {isEventDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
