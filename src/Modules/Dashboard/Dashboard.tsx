import { Modal } from "antd";
import Link from "next/link";
import CreateEventBox from "./components/CreateEventBox";
import EventCard from "./components/EventCard";
import useDashboard from "./useDashboard";

const Dashboard = () => {
  const {
    isModalOpen,
    showCreateEventModal,
    handleCreateEventCancel,
    isEventDataLoading,
    createdEventData,
  } = useDashboard();

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
        {/* <AvailabilityCard /> */}
        <div className="row mt-4 gy-4 justif">
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
