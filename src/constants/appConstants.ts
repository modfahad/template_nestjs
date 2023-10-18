export const REDIS_EVENT_RETRY_COUNT_LIMIT = 3;
export const USER_ERROR_IGNORE_COUNT_LIMIT = 3;

export class ErrorMessage {
  static SOMETHING_WENT_WRONG = "Something went wrong";
  static ROLL_BACK = "Internal server error while performing a transaction . Please try after some time.";
  static INVALID_ID = "Invalid id in request.";
  static GENERIC_ERROR = "Internal Server Error.";
  static NOT_FOUND = "No entries found.";
  static EMAIL_OR_PHONE_EXISTS = "The emailId or phone number already exists.";
  static EMAIL_EXISTS = "The emailId already exists.";
  static EMAIL_AND_PHONE_NOT_FOUND = "Please enter Email or Phone to login.";
  static WRONG_CREDENTIALS = "Wrong credentials.";
  static ACCESS_TOKEN_EXPIRED = "Access token expired.";
  static REFRESH_TOKEN_EXPIRED = "Refresh token expired. Please login again.";
  static MISSING_REFRESH_TOKEN = "refresh token is missing.";
  static UN_AUTHORIZED = "Unauthorized access token.";
  static OTP_EXPIRED = "OTP has expired, please generate a new OTP";
  static OTP_INCORRECT = "Incorrect OTP or Mobile Number";
  static OTP_VERIFICATION_FAILED = "OTP verification failed.";
  static UNABLE_TO_SEND_OTP = "unable to send otp on number.";
  static PHONE_NOT_FOUND = "phone number not found in records.";
  static EMAIL_NOT_FOUND = "email not found in records.";
  static ADDRESS_INDEX_OUT_OF_BOUNDS = "address index out of bounds";
  static WRONG_CARD_DETAILS = "Wrong card details provided.";
  static INVALID_SQ_IDS = "Some invalid ids of simple question in request.";
  static INVALID_CQ_IDS = "Some invalid ids of complex question in request.";
  static PAYMENT_PAYLOAD_DETAILS = "Please check your payment details payload. Invalid payload";
  static INVALID_PAYLOAD = "Invalid payload for razorpay";
  static EMPTY_WEBHOOK_PAYLOAD = "Razorpay webhook returned empty payload";
  static INVALID_PLAN_DETAILS = "Invalid plan details payload";
  static INVALID_ORDER_DETAILS = "Invalid order details payload";
  static NO_ORDER_FOUND = "Order not found for given order ID";
  static USER_BLOCKED_MSG = "Your subscription has been cancelled. Please contact customer support";
  static INVOKE_MASKED_MOBILE =
    "Email Validation Failed or phone Validation Failed. Please try to invoke CRQ externally.";
  static INVALID_PAYLOAD_EXPERIAN = "Invalid Experian Payload";
  static INVALID_PINCODE = "Invalid Pincode passed in experian payload";
  static INVALID_FULLNAME = "Invalid Fullname passed in payload";
  static EXPERIAN_OTP_MISMATCH = "OTP validation failed, OTP is not match";
  static EXPERIAN_OTP_EXPIRED = "OTP validation failed, OTP is already expired";
  static EXPERIAN_REGISTER_AGAIN = "OTP validation already tried,register consumer again for new OTP";
  static EXPERIAN_NUMBER_MISMATCH =
    "OTP validation failed, mobile number is not matching with which consumer registered for an OTP";
  static EXPERIAN_CRITICAL_ERROR_CODE = "0";
  static TOO_MANY_REQUESTS = "Too many attempts. Please retry in some time.";
  static INVALID_BASE_URL = "Invalid baseUrl in request. Please Retry after some time.";
}

export class RequestStatusMsg {
  static SUCCESS = "SUCCESS";
  static PENDING = "PENDING";
  static FAILED = "FAILED";
}
export class ErrorCode {
  static GENERIC_CLIENT_ERROR = 400;
  static ACCESS_TOKEN_EXPIRED = 410;
  static REFRESH_TOKEN_EXPIRED = 411;
  static OTP_EXPIRED = 412;
  static OTP_INCORRECT = 413;
  static USER_NOT_SUBSCRIBER = 414;
  static GENERIC_SERVER_ERROR = 500;
  static TOO_MANY_REQUESTS = 429;
  static USER_NOT_FOUND = 206;
  static PPMC_TEST_NOT_FOUND = 206;
  static PPMC_TEST_NOT_BOOKED = 206;
}
