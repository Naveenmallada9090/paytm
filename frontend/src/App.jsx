import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Dashboard } from "./pages/dashboard";
import { SendMoney } from "./pages/sendmoney";
import { TransactionHistory } from "./pages/transactionhistory";
import { ProfileSettings } from "./pages/profilesettings";
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