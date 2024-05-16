import Arcade from "../assets/images/icon-arcade.svg"
import Advanced from "../assets/images/icon-advanced.svg"
import Pro from "../assets/images/icon-pro.svg"
import { Step } from "../components/multi-step.interface"
export const steps: Step[] = [
  {
    title: "Personal Info",
    description: "Please provide your name, email address, and phone number.",
    stepName: "your info",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "email", label: "Email Address", type: "email" },
      { key: "phone-number", label: "Phone Number", type: "number" },
    ],
  },
  {
    title: "Select you plan",
    description: "You have the option of monthly or yearly billing.",
    stepName: "Select plan",
    fields: [
      {
        key: "arcade",
        label: "Arcade",
        price: "9",
        label3: "2 months free",
        type: "radio",
        icon: Arcade,
      },
      {
        key: "advanced",
        label: "Advanced",
        price: "12",
        label3: "2 months free",
        type: "radio",
        icon: Advanced,
      },
      {
        key: "pro",
        label: "Pro",
        price: "15",
        label3: "2 months free",
        type: "radio",
        icon: Pro,
      },
    ],
  },
  {
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
    stepName: "add-ons",
    fields: [
      {
        key: "Online-service",
        label: "Online-service",
        label2: "Access to multiplayer games",
        price: "1",
        type: "checkbox",
      },
      {
        key: "Larger-storage",
        label: "Larger storage",
        label2: "Extra 1TB of cloud save",
        price: "2",
        type: "checkbox",
      },
      {
        key: "pro",
        label: "Customizable Profile",
        label2: "Custom theme on your profile",
        price: "2",
        type: "checkbox",
      },
    ],
  },
  {
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
    stepName: "summary",
  },
]
