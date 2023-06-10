import CancleOrder from "./Statistical/CancleOrder";
import ConfirmedOrder from "./Statistical/ConfirmedOrder";
import DeliveredOrder from "./Statistical/DeliveredOrder";
import HandleOrder from "./Statistical/HandleOrder";
import ShipingOrder from "./Statistical/ShipingOrder";
import "./style/StatisticalTotal.css"
const StatisticalTotal = () => {
  return (
    <div className="homeAdmin">
      <div className="homeContainerAdmin">
        <div className="TotalUS">
          <div className="userTotal">
            <HandleOrder />
          </div>
          <div className="deviceTotal">
            <ConfirmedOrder />
          </div>
          <div className="deviceC">
            <ShipingOrder /> 
          </div>
          <div className="deviceD">
             <CancleOrder />
          </div>
        </div>
        <div className="tableU">
          <DeliveredOrder/>
        </div>
      </div>
    </div>

  )
}
export default StatisticalTotal;
