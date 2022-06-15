import UserDbQuery from "./User";

class CustomerDbQuery {
	/**
	 *  Get a list of Aggregation Pipeline Objects that joins a Customer Data.
	 * @param localFieldname  - name of field in localDoc to use for join operation. Defaults to "customer"
	 * @param joinedFieldname  - name of joined field. Defaults to "customer"
	 * @returns IAggregationPipelineStage[]
	 */

	public static join(localFieldname?: string, joinedFieldname?: string): any[] {
		const localField = localFieldname ? localFieldname : "customer";
		const joinedField = joinedFieldname ? joinedFieldname : "customer";

		return [
			{
				$lookup: {
					from: "customers",
					let: { customerRef: `$${localField}` },
					pipeline: [
						{
							$match: {
								$expr: { $eq: ["$_id", "$$customerRef"] },
							},
						},

						...UserDbQuery.join(),
					],
					as: joinedField,
				},
			},
			{
				$unwind: {
					path: `$${joinedField},`,
					preserveNullAndEmptyArrays: true,
				},
			},

			{
				$addFields: {
					[`${joinedField}.name`]: `$${joinedField}.user.name`,
					[`${joinedField}.email`]: `$${joinedField}.user.email`,
					[`${joinedField}.telephone`]: `$${joinedField}.user.telephone`,
					[`${joinedField}.subscriptionStatus`]: `$${joinedField}.user.subscriptionStatus`,
					[`${joinedField}.type`]: `$${joinedField}.user.type`,
					[`${joinedField}.googleRef`]: `$${joinedField}.user.googleRef`,
					[`${joinedField}.avatar`]: `$${joinedField}.user.avatar`,
					[`${joinedField}.active`]: `$${joinedField}.user.active`,
					[`${joinedField}.isEmailVerified`]: `$${joinedField}.user.isEmailVerified`,
					[`${joinedField}.isTelephoneVerified`]: `$${joinedField}.user.isTelephoneVerified`,
					[`${joinedField}.deleted`]: `$${joinedField}.user.deleted`,
					[`${joinedField}.customerPublicRef`]: `$${joinedField}.ref`,
					[`${joinedField}.customerRef`]: `$${joinedField}._id`,
					[`${joinedField}._id`]: `$${joinedField}.user._id`,
				},
			},
			{
				$project: { [`${joinedField}.user`]: 0 },
			},
		];
	}
}

export default CustomerDbQuery;
