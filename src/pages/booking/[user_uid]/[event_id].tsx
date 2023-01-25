import { doc, getDoc } from "firebase/firestore";
import Clock from "../../../components/Clock/Clock";
import { db } from "../../../firebase/firebase_config";
import Booking from "../../../Modules/Booking/Booking";

const EventPreviewPage = ({ event, ctx }) => {
  // console.log("server data ", event, typeof event);

  return (
    <div>
      <div className="card w-25">
        <div className="card-header">
          <h4 className="card-title">Event data</h4>
        </div>
        <div className="card-body">
        <p>
        User id : <strong>{ctx.user_uid}</strong> <br />
        Event Id: <strong>{ctx.event_id}</strong> <br />
        Available time will Start {event?.available_time[0]} End{" "}
        {event?.available_time[1]} <br />
        Selected week days : {event?.selected_week_days.join(',')}
      </p>
        </div>
      </div>
      <Clock />
      <Booking event={event} />
    </div>
  );
};

export default EventPreviewPage;

export const getServerSideProps = async (ctx) => {
  let event = null;
  try {
    const res = await getDoc(
      doc(db, "events", ctx.query.user_uid, "event_list", ctx.query.event_id)
    );
    event = res.data();
  } catch (error) {
    console.log("Data not found");
  }
  return {
    props: { event, ctx: ctx.query },
  };
};
