import { Appbar } from "../assets/components/Appbar"
import { Balance } from "../assets/components/Balance"
import { Users} from "../assets/components/User"

export const Dashboard = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}