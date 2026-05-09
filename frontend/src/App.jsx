import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/dashboard";
import { SendMoney } from "./pages/SendMoney";
import { TransactionHistory } from "./pages/TransactionHistory";
import { ProfileSettings } from "./pages/ProfileSettings";
import { HelpSupport } from "./pages/HelpSupport";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/help" element={<HelpSupport />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App