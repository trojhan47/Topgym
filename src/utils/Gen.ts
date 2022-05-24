/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc Register new User
   @desc  POST /api/Users
   @access Public
 */

import { customAlphabet } from "nanoid";

export default class UniqueGen {
	/**
   * @description Unique reference Generator function
   * generateUniqueRef
   * @param {string} label
   */
	private static async generateUniqueRef(label?: string, length?: number) {
		const nanoid = customAlphabet(
			"1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
			15
		);

		const ref = await nanoid(length);
		if (!label) {
			return `${ref}`;
		}
		return `${label}_${ref}`;
	}

	private static async generateRandNumber(length?: number) {
		const nanoid = customAlphabet("1234567890", 10);
		const ref = await nanoid(length);
		return `${ref}`;
	}

	/**
   * generateCustomerRef
   */
	public static async generateCustomerRef() {
		const uniqueRef = await this.generateUniqueRef("CUS");
		return uniqueRef;
	}

	/**
   * generateSlugToken
   */
	public static async generateSlugToken() {
		const uniqueRef = await this.generateUniqueRef(undefined, 9);
		return uniqueRef;
	}

	/**
   * generateVerificationToken
   */
	public static async generateVerificationToken() {
		const uniqueRef = await this.generateRandNumber(4);
		return `${uniqueRef}`;
	}
}
