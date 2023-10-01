import { RequireAuth } from "components";
import { Routes as Router, Route } from "react-router-dom";
import { Addresses, Home } from "views";

export const Routes = () => {
  return (
    <Router>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route element={<RequireAuth />}>
        <Route path="/addresses" element={<Addresses />} />
      </Route>

      {/* catch all */}
      <Route path="*" element={<p>Missing Route</p>} />
    </Router>
  );
};
