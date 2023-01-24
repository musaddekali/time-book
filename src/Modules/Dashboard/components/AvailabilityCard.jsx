import {useState} from 'react';
import { TimePicker, Tooltip, Checkbox} from "antd";

const AvailabilityCard = () => {
  const [timeHour, setTimeHout] = useState("12");
  const [availableTime, setAvailableTime] = useState(null);
  const [selectedWeekDay, setSelectedWeekDay] = useState([]);
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const CheckboxGroup = Checkbox.Group;

  const toggleTimeHour = () => {
    if (timeHour === "12") {
      setTimeHout("24");
    } else if (timeHour === "24") {
      setTimeHout("12");
    }
  };

  const getAbailableTimeRange = (time, timeString) => {
    setAvailableTime(timeString);
  };

  const getAvailableWeekDays = (list) => {
    setSelectedWeekDay(list);
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6">
        <div className="card">
          <div className="card-footer">
            <h4 className="card-title ">Set you availability</h4>
            <p className="card-text">Tell Time Book when you are ready to accept meeting.</p>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <div className="d-flex align-items-center gap-3 mb-2">
                <h5 className="card-title">Available Hours</h5>
                <Tooltip title="Change the current time hour">
                  <button onClick={toggleTimeHour} className="btn btn-sm btn-warning mb-2">
                    {timeHour}h
                  </button>
                </Tooltip>
              </div>
              <TimePicker.RangePicker onChange={getAbailableTimeRange} format={`h:mm ${timeHour === "12" ? "a" : ""}`} size="large" />
              <small className="px-3">
                {availableTime?.[0]} - {availableTime?.[1]}
              </small>
            </div>
            <div>
              <div className="d-flex align-items-center gap-3 mb-2">
                <h5 className="card-title">
                  Available Days <span className="text-success">{selectedWeekDay.length}</span>
                </h5>
              </div>
              <div className="_ant_week_checkbox">
                <CheckboxGroup options={weekDays} value={selectedWeekDay} onChange={getAvailableWeekDays} />
              </div>
            </div>
            <div className="text-end mt-3">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCard;