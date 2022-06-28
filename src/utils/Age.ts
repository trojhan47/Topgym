export default class Age {
	/**
	 * A util function to calculate age after getting date of birth
	 * @param dateString
	 * @returns Age
	 */
	public static getAge(dateString: Date) {
		const today = new Date();
		const birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}
}
