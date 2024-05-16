import { Step } from "./multi-step.interface"
interface StepListProps {
  steps: Step[] // Define the prop type
  step: number // Define the prop type for the active step
}
const StepList: React.FC<StepListProps> = ({ steps, step }) => {
  return (
    <div className="steps-container">
      <ul className="step-list">
        {steps.map((stepInfo, index) => (
          <li key={index}>
            <div className={`step-number ${index === step ? "active" : ""}`}>
              {index + 1}
            </div>
            <div className="step-name-container">
              <div>step {index + 1}</div>
              <div>{stepInfo.stepName}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepList
