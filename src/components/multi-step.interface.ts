export interface StepField {
  key: string
  label: string
  label2?: string
  label3?: string
  price?: string
  icon?: string
  type: "text" | "email" | "number" | "password" | "date" | "checkbox" | "radio"
  validationMessage?: string
}

export interface Step {
  title: string
  description: string
  stepName: string
  fields?: StepField[]
}

export interface FormData {
  [key: string]: string | number | undefined // Define all possible data types for form fields
}

export interface MultiStepFormProps {
  steps: Step[]
}