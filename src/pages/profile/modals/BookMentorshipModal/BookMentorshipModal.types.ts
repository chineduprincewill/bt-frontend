export interface IMentorshipBookingStep {
	onCloseModal: () => void
	currentStep: number
	nextStep: () => void
	prevStep: () => void
}