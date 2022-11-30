import { Route } from "@solidjs/router"
import Layout from "./Layout"
import Sidebar from "./Sidebar"

export default () => (
  <Route path="/vault" component={Layout}>
    <Route path="/" />
    <Route path="/:id" component={Sidebar} />
  </Route>
)
