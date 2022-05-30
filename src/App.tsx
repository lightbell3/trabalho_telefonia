import { DashboardUser } from "./pages/DashboardUser";
import { DashboardTelephoneLine} from "./pages/DashboardTelephoneLine";
import { Total} from "./pages/DashboardTotal";
import { GlobalStyle } from "./styles/global";


export function App(){
  return(
    <>
      <Total/>
      <GlobalStyle/>
    </>
  )
}