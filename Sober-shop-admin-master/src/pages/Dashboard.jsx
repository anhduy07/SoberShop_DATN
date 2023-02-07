import React, { useEffect, useState } from "react";
import StatusCard from "components/StatusCard/StatusCard";
import statisticalApi from "api/statisticalApi";
import { OpenInNew, PersonAdd, ShopTwo } from "@mui/icons-material";

export default function Dashboard() {
  const [result, setResult] = useState();

  useEffect(() => {
    const getStatis = async () => {
      const res = await statisticalApi.get();
      setResult(res);
    };
    getStatis();
  }, []);

  return (
    <div className="dashboard">
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>
      <div className="row">
        <div className="col-4 col-md-6">
					<StatusCard
						title="Product"
						count={result?.total_product ? result.total_product : 0}
						icon={<OpenInNew />}
						color="blue"
					/>
				</div>
				<div className="col-4 col-md-6">
					<StatusCard
						title="Customer"
						count={result?.total_user ? result.total_user : 0}
						icon={<PersonAdd />}
						color="pink"
					/>
				</div>
				<div className="col-4 col-md-6">
					<StatusCard
						title="Orders"
						count={result?.total_order ? result.total_order : 0}
						icon={<ShopTwo />}
						color="green"
					/>
				</div>
      </div>
    </div>
  );
}
