import "./App.css"
import MultiStepForm from "./components/multi-step-form"
import { steps } from "./constants/form-steps"

function App() {
  return (
    <div className="app">
      <MultiStepForm steps={steps} />
    </div>
  )
}

export default App
