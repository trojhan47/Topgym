import cors from "cors";
import { Application } from "express";

import Locals from "../providers/Locals";
import Log from "../middlewares/Log";

class CORS {
	public mount(app: Application): Application {
		Log.info(`Booting the \'CORS\' middleware...`);

		const options = {
			origin: Locals.config().url,
			optionsSuccessStatus: 200, // Some legacy browsers choke on 204
		};

		app.use(cors(options));

		return app;
	}
}

export default new CORS();
