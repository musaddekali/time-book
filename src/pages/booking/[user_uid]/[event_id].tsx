import { doc, getDoc } from "firebase/firestore";
import Clock from "../../../components/Clock/Clock";
import { db } from "../../../firebase/firebase_config";
import Booking from "../../../Modules/Booking/Booking";

const EventPreviewPage = ({ event, ctx }) => {
  // console.log("server data ", event, typeof event);

  return (
    <div>
      <h1>
        User id : {ctx.user_uid} Event Id: {ctx.event_id}
      </h1>
      <Clock />
      <Booking event={event}/>
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
