/**
 * Define the Role API logic
 *
 *  @author Kennedy Oseni <kennyose01@gmail.com>
 */

import { Request, Response } from "express";
import Log from "../../middlewares/Log";
import validator from "validator";
import _ from "lodash";

import Role from "../../models/Role";
import AccessControl from "../../providers/AccessControl";

export default class RoleCtr {
	/**
	 * Create a Role.
	 * @route POST /api/role/create
	 */
	public static async createOne(req: Request, res: Response) {
		const { type = "", name = "" } = req.body;
		let roleDoc: any;
		let roleObj: any;

		Log.info("it ios getting here");

		if (
			!["string"].includes(typeof name) ||
			validator.isEmpty(name, { ignore_whitespace: true })
		) {
			return res.status(400).json({ message: "bad name field" });
		}

		if (
			!["string"].includes(typeof type) ||
			validator.isEmpty(type, { ignore_whitespace: true })
		) {
			return res.status(400).json({ message: "bad type field" });
		}

		roleObj = { name, type };

		try {
			roleDoc = new Role(roleObj);

			await roleDoc.save();
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}

		// Reset AccessControl Instance
		try {
			const ac = await AccessControl;

			await ac.reset();
		} catch (error: any) {
			Log.error(`${error.message}`);
		}

		return res.status(200).json({ message: "success" });
	}

	/**
	 * Get Roles.
	 * @route GET /api/role
	 */
	public static async getMany(req: Request, res: Response) {
		const search = req.query.search ? `${req.query.search}` : ``;
		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 10;
		const sortOrder =
			req.query.sortOrder && req.query.sortOrder === "ascend" ? 1 : -1;
		const sortCol = req.query.sortCol
			? (req.query.sortCol as string).replace(/[,]/, ".")
			: "createdAt";
		const filterType = req.query.filterType
			? `${_.capitalize(req.query.filterType as string)}`
			: ``;

		const filterQueries = [];
		let searchQuery;
		let resData;

		searchQuery = {
			$match: {
				name: { $regex: search, $options: "i" },
			},
		};

		try {
			if (["Staff", "Customer", "Driver", "Partner"].includes(filterType)) {
				filterQueries.push({
					$match: {
						type: filterType,
					},
				});
			}
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}

		try {
			resData = await Role.aggregate([
				searchQuery,
				...filterQueries,
				{
					$sort: {
						[`${sortCol}`]: sortOrder,
					},
				},
				{
					$facet: {
						metadata: [
							{
								$count: "total",
							},
						],
						data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
					},
				},
				{
					$unwind: "$metadata",
				},
				{
					$project: {
						data: 1,
						meta: {
							total: "$metadata.total",
							limit: { $literal: limit },
							page: { $literal: page },
							pages: {
								$ceil: {
									$divide: ["$metadata.total", limit],
								},
							},
						},
					},
				},
			]).exec();
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}

		return res.status(200).json(resData[0]);
	}

	/**
	 * Get a Role.
	 * @route GET /api/role/:roleRef
	 */
	public static async getOne(req: Request, res: Response) {
		const { roleRef } = req.params;
		let roleDoc;

		if (!validator.isMongoId(roleRef)) {
			return res.status(400).json({ message: "bad roleRef param" });
		}

		try {
			roleDoc = await Role.findById(roleRef);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}

		return res.status(200).json(roleDoc);
	}

	/**
	 * Update a Role's description.
	 * @route POST /api/role/update/:roleRef
	 */
	public static async updateOne(req: Request, res: Response) {
		const { roleRef = "" } = req.params;
		const { name = "", type = "" } = req.body;
		let roleDoc;

		if (!roleRef) {
			return res.status(400).json({
				message: "bad roleRef",
			});
		}

		// Check if roleDoc exists
		try {
			roleDoc = await Role.findOne({
				_id: roleRef,
			});
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
		if (!roleDoc) {
			return res.status(400).json({ message: "No role doc found" });
		}

		if (name && name !== "undefined") {
			roleDoc.name = name;
		}

		if (type || type !== "undefined") {
			roleDoc.type = type;
		}

		try {
			await roleDoc.save();
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}

		// Reset AccessControl Instance
		try {
			const ac = await AccessControl;

			await ac.reset();
		} catch (error: any) {
			Log.error(`${error.message}`);
		}

		return res.status(200).json({ message: "success" });
	}

	/**
	 * Update a Role's permissions.
	 * @route POST /api/role/edit-permissions/:roleRef
	 */
	public static async editPermissions(req: Request, res: Response) {
		const { roleRef } = req.params;
		const {
			/*
			createAnyLocation,
			readAnyLocation,
			updateAnyLocation,
			deleteAnyLocation,
			createOwnLocation,
			readOwnLocation,
			updateOwnLocation,
			deleteOwnLocation,

			createAnyCategory,
			readAnyCategory,
			updateAnyCategory,
			deleteAnyCategory,
			createOwnCategory,
			readOwnCategory,
			updateOwnCategory,
			deleteOwnCategory,

      createAnyVehicle,
			readAnyVehicle,
			updateAnyVehicle,
			deleteAnyVehicle,
			createOwnVehicle,
			readOwnVehicle,
			updateOwnVehicle,
			deleteOwnVehicle,

      			createAnyDriver,
			readAnyDriver,
			updateAnyDriver,
			deleteAnyDriver,
			createOwnDriver,
			readOwnDriver,
			updateOwnDriver,
			deleteOwnDriver,

			createAnyRequest,
			readAnyRequest,
			updateAnyRequest,
			deleteAnyRequest,
			createOwnRequest,
			readOwnRequest,
			updateOwnRequest,
			deleteOwnRequest,

			createAnyPartner,
			readAnyPartner,
			updateAnyPartner,
			deleteAnyPartner,
			createOwnPartner,
			readOwnPartner,
			updateOwnPartner,
			deleteOwnPartner,

    	createAnyTrip,
			readAnyTrip,
			updateAnyTrip,
			deleteAnyTrip,
			createOwnTrip,
			readOwnTrip,
			updateOwnTrip,
			deleteOwnTrip,

*/
			createAnyCustomer,
			readAnyCustomer,
			updateAnyCustomer,
			deleteAnyCustomer,
			createOwnCustomer,
			readOwnCustomer,
			updateOwnCustomer,
			deleteOwnCustomer,

			createAnyRole,
			readAnyRole,
			updateAnyRole,
			deleteAnyRole,
			createOwnRole,
			readOwnRole,
			updateOwnRole,
			deleteOwnRole,

			createAnyStaff,
			readAnyStaff,
			updateAnyStaff,
			deleteAnyStaff,
			createOwnStaff,
			readOwnStaff,
			updateOwnStaff,
			deleteOwnStaff,

			createAnyUser,
			readAnyUser,
			updateAnyUser,
			deleteAnyUser,
			createOwnUser,
			readOwnUser,
			updateOwnUser,
			deleteOwnUser,

			createAnyPayment,
			readAnyPayment,
			updateAnyPayment,
			deleteAnyPayment,
			createOwnPayment,
			readOwnPayment,
			updateOwnPayment,
			deleteOwnPayment,
		} = req.body;
		let roleDoc;

		try {
			roleDoc = await Role.findById(roleRef);
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}

		if (!roleDoc) {
			return res.status(400).json({ message: "no role document found" });
		}
		/*
		// location
		roleDoc.permissions.location["create:any"] = createAnyLocation;
		roleDoc.permissions.location["read:any"] = readAnyLocation;
		roleDoc.permissions.location["update:any"] = updateAnyLocation;
		roleDoc.permissions.location["delete:any"] = deleteAnyLocation;
		roleDoc.permissions.location["create:own"] = createOwnLocation;
		roleDoc.permissions.location["read:own"] = readOwnLocation;
		roleDoc.permissions.location["update:own"] = updateOwnLocation;
		roleDoc.permissions.location["delete:own"] = deleteOwnLocation;

		// category
		roleDoc.permissions.category["create:any"] = createAnyCategory;
		roleDoc.permissions.category["read:any"] = readAnyCategory;
		roleDoc.permissions.category["update:any"] = updateAnyCategory;
		roleDoc.permissions.category["delete:any"] = deleteAnyCategory;
		roleDoc.permissions.category["create:own"] = createOwnCategory;
		roleDoc.permissions.category["read:own"] = readOwnCategory;
		roleDoc.permissions.category["update:own"] = updateOwnCategory;
		roleDoc.permissions.category["delete:own"] = deleteOwnCategory;

    		// driver
		roleDoc.permissions.driver["create:any"] = createAnyDriver;
		roleDoc.permissions.driver["read:any"] = readAnyDriver;
		roleDoc.permissions.driver["update:any"] = updateAnyDriver;
		roleDoc.permissions.driver["delete:any"] = deleteAnyDriver;
		roleDoc.permissions.driver["create:own"] = createOwnDriver;
		roleDoc.permissions.driver["read:own"] = readOwnDriver;
		roleDoc.permissions.driver["update:own"] = updateOwnDriver;
		roleDoc.permissions.driver["delete:own"] = deleteOwnDriver;

		// request
		roleDoc.permissions.request["create:any"] = createAnyRequest;
		roleDoc.permissions.request["read:any"] = readAnyRequest;
		roleDoc.permissions.request["update:any"] = updateAnyRequest;
		roleDoc.permissions.request["delete:any"] = deleteAnyRequest;
		roleDoc.permissions.request["create:own"] = createOwnRequest;
		roleDoc.permissions.request["read:own"] = readOwnRequest;
		roleDoc.permissions.request["update:own"] = updateOwnRequest;
		roleDoc.permissions.request["delete:own"] = deleteOwnRequest;

		// partner
		roleDoc.permissions.partner["create:any"] = createAnyPartner;
		roleDoc.permissions.partner["read:any"] = readAnyPartner;
		roleDoc.permissions.partner["update:any"] = updateAnyPartner;
		roleDoc.permissions.partner["delete:any"] = deleteAnyPartner;
		roleDoc.permissions.partner["create:own"] = createOwnPartner;
		roleDoc.permissions.partner["read:own"] = readOwnPartner;
		roleDoc.permissions.partner["update:own"] = updateOwnPartner;
		roleDoc.permissions.partner["delete:own"] = deleteOwnPartner;

    		// trip
		roleDoc.permissions.trip["create:any"] = createAnyTrip;
		roleDoc.permissions.trip["read:any"] = readAnyTrip;
		roleDoc.permissions.trip["update:any"] = updateAnyTrip;
		roleDoc.permissions.trip["delete:any"] = deleteAnyTrip;
		roleDoc.permissions.trip["create:own"] = createOwnTrip;
		roleDoc.permissions.trip["read:own"] = readOwnTrip;
		roleDoc.permissions.trip["update:own"] = updateOwnTrip;
		roleDoc.permissions.trip["delete:own"] = deleteOwnTrip;

    		// vehicle
		roleDoc.permissions.vehicle["create:any"] = createAnyVehicle;
		roleDoc.permissions.vehicle["read:any"] = readAnyVehicle;
		roleDoc.permissions.vehicle["update:any"] = updateAnyVehicle;
		roleDoc.permissions.vehicle["delete:any"] = deleteAnyVehicle;
		roleDoc.permissions.vehicle["create:own"] = createOwnVehicle;
		roleDoc.permissions.vehicle["read:own"] = readOwnVehicle;
		roleDoc.permissions.vehicle["update:own"] = updateOwnVehicle;
		roleDoc.permissions.vehicle["delete:own"] = deleteOwnVehicle;

*/
		// customer
		roleDoc.permissions.customer["create:any"] = createAnyCustomer;
		roleDoc.permissions.customer["read:any"] = readAnyCustomer;
		roleDoc.permissions.customer["update:any"] = updateAnyCustomer;
		roleDoc.permissions.customer["delete:any"] = deleteAnyCustomer;
		roleDoc.permissions.customer["create:own"] = createOwnCustomer;
		roleDoc.permissions.customer["read:own"] = readOwnCustomer;
		roleDoc.permissions.customer["update:own"] = updateOwnCustomer;
		roleDoc.permissions.customer["delete:own"] = deleteOwnCustomer;

		// role
		roleDoc.permissions.role["create:any"] = createAnyRole;
		roleDoc.permissions.role["read:any"] = readAnyRole;
		roleDoc.permissions.role["update:any"] = updateAnyRole;
		roleDoc.permissions.role["delete:any"] = deleteAnyRole;
		roleDoc.permissions.role["create:own"] = createOwnRole;
		roleDoc.permissions.role["read:own"] = readOwnRole;
		roleDoc.permissions.role["update:own"] = updateOwnRole;
		roleDoc.permissions.role["delete:own"] = deleteOwnRole;

		// staff
		roleDoc.permissions.staff["create:any"] = createAnyStaff;
		roleDoc.permissions.staff["read:any"] = readAnyStaff;
		roleDoc.permissions.staff["update:any"] = updateAnyStaff;
		roleDoc.permissions.staff["delete:any"] = deleteAnyStaff;
		roleDoc.permissions.staff["create:own"] = createOwnStaff;
		roleDoc.permissions.staff["read:own"] = readOwnStaff;
		roleDoc.permissions.staff["update:own"] = updateOwnStaff;
		roleDoc.permissions.staff["delete:own"] = deleteOwnStaff;

		// user
		roleDoc.permissions.user["create:any"] = createAnyUser;
		roleDoc.permissions.user["read:any"] = readAnyUser;
		roleDoc.permissions.user["update:any"] = updateAnyUser;
		roleDoc.permissions.user["delete:any"] = deleteAnyUser;
		roleDoc.permissions.user["create:own"] = createOwnUser;
		roleDoc.permissions.user["read:own"] = readOwnUser;
		roleDoc.permissions.user["update:own"] = updateOwnUser;
		roleDoc.permissions.user["delete:own"] = deleteOwnUser;

		// payment
		roleDoc.permissions.payment["create:any"] = createAnyPayment;
		roleDoc.permissions.payment["read:any"] = readAnyPayment;
		roleDoc.permissions.payment["update:any"] = updateAnyPayment;
		roleDoc.permissions.payment["delete:any"] = deleteAnyPayment;
		roleDoc.permissions.payment["create:own"] = createOwnPayment;
		roleDoc.permissions.payment["read:own"] = readOwnPayment;
		roleDoc.permissions.payment["update:own"] = updateOwnPayment;
		roleDoc.permissions.payment["delete:own"] = deleteOwnPayment;

		try {
			await roleDoc.save();
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}

		// Reset AccessControl Instance
		try {
			const ac = await AccessControl;

			await ac.reset();
		} catch (error: any) {
			Log.error(`${error.message}`);
		}

		return res.status(200).json({ message: "success" });
	}

	/**
	 * Delete a Role.
	 * @route POST /api/role/deletes/:roleRef
	 */
	public static async deleteOne(req: Request, res: Response) {
		const { roleRef } = req.params;

		if (!roleRef || !validator.isMongoId(roleRef)) {
			return res.status(400).json({ message: "bad roleRef param" });
		}

		try {
			await Role.deleteOne({ _id: roleRef });
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}

		// Reset AccessControl Instance
		try {
			const ac = await AccessControl;

			await ac.reset();
		} catch (error: any) {
			Log.error(`${error.message}`);
		}

		return res.status(200).json({ message: "success" });
	}
}
