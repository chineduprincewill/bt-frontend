import React, { useState } from 'react'

export default function useBookMentorshipModal() {

	const [showModal, setShowModal] = useState(false)
	const [currentStep, setCurrentStep] = useState(0)

	function nextStep() {
		setCurrentStep(currentStep + 1)
	}

	function prevStep() {
		setCurrentStep(currentStep - 1)
	}

  return {
	showModal, setShowModal, currentStep, nextStep, prevStep
  }
}
