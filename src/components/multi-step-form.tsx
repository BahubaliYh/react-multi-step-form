import { useState } from "react"
import { MultiStepFormProps, FormData } from "./multi-step.interface"
import StepList from "./step-list"
import ThankyouIcon from "../assets/images/icon-thank-you.svg"
const MultiStepForm: React.FC<MultiStepFormProps> = ({ steps }) => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})
  const [selectedPlan, setSelectedPlan] = useState<{
    key: string
    label: string
    price: string
  } | null>(null) // Changed state to hold single selected plan
  const [selectedAddons, setSelectedAddons] = useState<
    { key: string; label: string; price: string }[]
  >([])
  const [subscriptionType, setSubscriptionType] = useState<
    "Monthly" | "Yearly"
  >("Yearly")

  const currentStep = steps[step]

  const nextStep = (e: { preventDefault: () => void }) => {
    console.log("next step is calling")
    e.preventDefault()
    const errors: Record<string, string> = {}
    currentStep.fields?.forEach((field) => {
      if (
        field.type !== "checkbox" &&
        field.type !== "radio" &&
        !formData[field.key]
      ) {
        errors[field.key] = "This field is required"
      }
    })
    setValidationErrors(errors)
    console.log("next step is calling", errors)
    if (Object.keys(errors).length === 0) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const calculateTotalPrice = () => {
    let total = 0

    // Calculate total price of selected addons
    selectedAddons.forEach((addon) => {
      if (subscriptionType === "Yearly") {
        total += parseFloat(addon.price) * 10
      } else {
        total += parseFloat(addon.price)
      }
    })

    // Add the price of the selected plan
    if (selectedPlan) {
      const planPrice = parseFloat(selectedPlan.price) || 0
      if (subscriptionType === "Yearly") {
        total += planPrice * 10
      } else {
        total += planPrice
      }
    }

    return total
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = e.target
    const errors = { ...validationErrors }
    delete errors[key]
    setValidationErrors(errors)
    setFormData({ ...formData, [key]: value })
  }

  const togglePlanSelection = (key: string, label: string, price?: string) => {
    console.log("toggle selection calling", currentStep.stepName)
    const defaultPrice = "" // Set a default price value if it's undefined
    if (currentStep.stepName === "Select plan") {
      setSelectedPlan({ key, label, price: price ?? defaultPrice })
      console.log("selected plan", selectedPlan)
    } else if (currentStep.stepName === "add-ons") {
      console.log("selected add ons", selectedAddons)
      setSelectedAddons((prevSelectedAddons) => {
        if (prevSelectedAddons.some((addon) => addon.key === key)) {
          return prevSelectedAddons.filter((addon) => addon.key !== key)
        } else {
          return [
            ...prevSelectedAddons,
            { key, label, price: price ?? defaultPrice },
          ] // Use defaultPrice if price is undefined
        }
      })
    }
  }

  const handleSubscriptionToggle = () => {
    setSubscriptionType((prevType) =>
      prevType === "Monthly" ? "Yearly" : "Monthly"
    )
  }

  return (
    <>
      <div className="form-container">
        <StepList steps={steps} step={step} />
        <div className={`${step != 4 ? "column" : "row"} form-content`}>
          {step == 4 ? (
            <div className="success-page">
              <img src={ThankyouIcon} alt="" />
              <h1>Thank you!</h1>
              <p>
                {" "}
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
              </p>
            </div>
          ) : (
            <>
              <header>
                <h1>{currentStep.title}</h1>
                <p>{currentStep.description}</p>
              </header>
              {step == 3 && (
                <>
                  <section className="summary-section">
                    <div className="bill-header">
                      {
                        <div key={selectedPlan?.key}>
                          <p className="plan-label">
                            {selectedPlan?.label} <br />
                            <button onClick={() => setStep(1)}>Change</button>
                          </p>
                          <p className="summary-plan-price">
                            $
                            {subscriptionType === "Yearly"
                              ? (Number(selectedPlan?.price) || 0) * 10
                              : Number(selectedPlan?.price) || 0}
                            {subscriptionType === "Yearly" ? "/yr" : "/mo"}
                          </p>
                        </div>
                      }
                    </div>
                    {selectedAddons.map((addon) => (
                      <div>
                        <p className="addon-label">{addon.label}</p>
                        <p className="addon-price">
                          {" "}
                          +$
                          {subscriptionType === "Yearly"
                            ? (Number(addon.price) || 0) * 10
                            : Number(addon.price) || 0}
                          {subscriptionType === "Yearly" ? "/yr" : "/mo"}
                        </p>
                      </div>
                    ))}
                  </section>
                  <div className="total-section">
                    <p>Total (per month)</p>
                    <p>+${calculateTotalPrice()}/mo</p>
                  </div>
                </>
              )}
              <form>
                <div className={`${step == 1 ? "row" : "column"} mobile-flex`}>
                  {currentStep.fields?.map((field) => (
                    <div className="form-group" key={field.key}>
                      {field.type === "checkbox" || field.type === "radio" ? (
                        <div
                          className={`plan-option ${
                            step == 2
                              ? "horizontalCheckbox"
                              : "verticleCheckbox"
                          }`}
                          key={field.key}
                        >
                          <input
                            id={field.key}
                            type={field.type}
                            name="plan"
                            checked={
                              step == 1
                                ? selectedPlan?.key === field.key
                                : step == 2 &&
                                  selectedAddons.some(
                                    (addon) => addon.key === field.key
                                  )
                            }
                            onChange={() =>
                              togglePlanSelection(
                                field.key,
                                field.label,
                                field.price
                              )
                            }
                          />
                          <label
                            htmlFor={field.key}
                            className={` ${
                              step == 2 ? "add-ons-card" : "plan-card"
                            }`}
                          >
                            <div className="plan-details">
                              <img src={field.icon} alt="" />
                              <div className="label-section">
                                <h4>{field.label}</h4>
                                {step == 2 && (
                                  <p className="plan-price">{field.label2}</p>
                                )}
                                {step === 1 && (
                                  <div>
                                    <p className="plan-price">
                                      $
                                      {subscriptionType === "Yearly"
                                        ? (Number(field.price) || 0) * 10
                                        : Number(field.price) || 0}
                                      {subscriptionType === "Yearly"
                                        ? "/yr"
                                        : "/mo"}
                                    </p>
                                    {subscriptionType === "Yearly" && (
                                      <p className="plan-offer">
                                        {field.label3}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                              {step == 2 && (
                                <p className="plan-offer">
                                  +$
                                  {subscriptionType === "Yearly"
                                    ? (Number(field.price) || 0) * 10
                                    : Number(field.price) || 0}
                                  {subscriptionType === "Yearly"
                                    ? "/yr"
                                    : "/mo"}
                                </p>
                              )}
                            </div>
                          </label>
                        </div>
                      ) : (
                        <>
                          <div className="label-group">
                            <label htmlFor={field.key}>{field.label}</label>
                            <label className="error">
                              {validationErrors[field.key]}
                            </label>
                          </div>
                          <input
                            id={field.key}
                            type={field.type}
                            value={formData[field.key] || ""}
                            onChange={(e) => handleChange(e, field.key)}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {step === 1 && (
                  <div className="switch-container">
                    <p
                      className={
                        subscriptionType === "Monthly"
                          ? "text-dark"
                          : "text-light"
                      }
                    >
                      Monthly
                    </p>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={subscriptionType === "Yearly"}
                        onChange={handleSubscriptionToggle}
                      />
                      <span className="slider round"></span>
                    </label>
                    <p
                      className={
                        subscriptionType === "Yearly"
                          ? "text-dark"
                          : "text-light"
                      }
                    >
                      Yearly
                    </p>
                  </div>
                )}

                <div
                  className={`buttons-container ${
                    step === 0 ? "right-align" : ""
                  }`}
                >
                  {step > 0 && (
                    <button
                      className="prev-btn"
                      type="button"
                      onClick={prevStep}
                    >
                      Go Back
                    </button>
                  )}
                  {step < steps.length - 1 && (
                    <button
                      className="next-btn"
                      type="submit"
                      onClick={nextStep}
                    >
                      Next Step
                    </button>
                  )}
                  {step === steps.length - 1 && (
                    <button
                      type="submit"
                      className="confirm-btn"
                      onClick={nextStep}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default MultiStepForm
