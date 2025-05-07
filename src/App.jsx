import { Toaster } from "sonner"
import Router from "./router"
function App() {
  console.log("App")
  return (
      <>
      <Router />
      <Toaster position="top-center" richColors />
      </>
  )
}

export default App
