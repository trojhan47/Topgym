// import Locals from "../providers/Locals";
// import Log from "../middlewares/Log";
// import { SmsCommandContext } from "twilio/lib/rest/supersim/v1/smsCommand";

// class SendOtpCode {

//   const { userDoc, tokenDoc } = ;

//   const message = `${tokenDoc.code} is your OTP code for signing in into your Topgym account`;
//   const fromTelephone = Locals.config().twilioMessagingServiceSid;

//   try {
//     const sentMessage = await SmsCommandContext.send(
//       userDoc.telephone,
//       message,
//       fromTelephone,
//       messagingServiceSid
//     );

//     if (!sentMessage) {
//       throw new Error(`could not send OTP to ${userDoc.telephone}` );

//     }

//     Log.info(`${sentMessage.sid}`)
//   } catch (error: any) {
//     Log.error(`${error.message}`);

//     throw new Error(`Unhandled error in sendOtp processor: ${error.message}`);

//   }

//   return { status: "ok" };
// }

// export default new SendOtpCode();
