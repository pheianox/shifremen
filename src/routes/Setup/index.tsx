import { Route } from "@solidjs/router"
import Layout from "./Layout"
import LocaleSection from "./LocaleSection"
import VaultSection from "./VaultSection"
import VaultCreateSection from "./VaultCreateSection"
import VaultImportSection from "./VaultImportSection"
import FinishSection from "./FinishSection"

export default () => (
  <Route path="/setup" component={Layout}>
    <Route path="/" component={LocaleSection} />
    <Route path="/locale" component={LocaleSection} />
    <Route path="/vault">
      <Route path="/" component={VaultSection} />
      <Route path="/import" component={VaultImportSection} />
      <Route path="/create" component={VaultCreateSection} />
    </Route>
    <Route path="/finish" component={FinishSection} />
  </Route>
)
