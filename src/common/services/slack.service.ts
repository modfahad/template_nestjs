const SlackStringsProd = "https://hooks.slack.com/services/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";
const SlackStringsDev = "https://hooks.slack.com/services/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";

//PROD
const bugsChannelProd = require("slack-notify")(SlackStringsProd); //order-success/failure
//DEV
const bugsChannelDev = require("slack-notify")(SlackStringsDev); //order-success/failure

//PROD
const ddosChannelProd = require("slack-notify")(SlackStringsProd); //order-success/failure
//DEV
const ddosChannelDev = require("slack-notify")(SlackStringsDev); //order-success/failure

//methods
export interface SlackNotificationParams {
  isProd: boolean;
  logId: string;
  serviceName: string;
  msg: string;
  payload?: any;
  userIdOrEmail?: string;
  headerMsg?: string;
  code?: number;
  endPoint?: string;
  userPhoneNo?: string;
  userName?: string;
}

const _getAlertObject = (params: SlackNotificationParams) => {
  const { serviceName, headerMsg, logId, payload, code, msg, userIdOrEmail, endPoint, userName } = params;
  let stringifiedPayload: string = "";
  const finalErrorMsg = headerMsg ? headerMsg : "Something went wrong";

  try {
    stringifiedPayload = JSON.stringify(payload);
  } catch (e) {
    const { error, message } = e;
    stringifiedPayload = `error in stringifying payload , error=[${error}] , message=[${message}]`;
  }

  const alertObj = {
    text: `${serviceName} : ${finalErrorMsg}`,
    fields: {
      logId,
      msg,
    },
  };

  if (stringifiedPayload) {
    alertObj.fields["payload"] = stringifiedPayload;
  }

  if (userIdOrEmail) {
    alertObj.fields["userIdOrEmail"] = userIdOrEmail;
  }

  if (endPoint) {
    alertObj.fields["endPoint"] = endPoint;
  }

  if (code) {
    alertObj.fields["code"] = code;
  }

  if (userName) {
    alertObj.fields["userName"] = userName;
  }

  //finally return the object
  return alertObj;
};

export const _slackNotifyForError = (params: SlackNotificationParams) => {
  const { isProd } = params;
  let channel = bugsChannelProd;

  if (!isProd) {
    channel = bugsChannelDev;
  }

  try {
    const obj = _getAlertObject(params);
    channel.alert(obj);
  } catch (e) {
    const { message, error } = e;
    console.log(`error in _slackNotifyForError , message=[${message}] , error=[${error}]`);
  }
};

export const _slackNotifyForDDOS = (params: SlackNotificationParams) => {
  const { isProd } = params;
  let channel = ddosChannelProd;

  if (!isProd) {
    channel = ddosChannelDev;
  }

  try {
    const obj = _getAlertObject(params);
    channel.alert(obj);
  } catch (e) {
    const { message, error } = e;
    console.log(`error in _slackNotifyForDDOS , message=[${message}] , error=[${error}]`);
  }
};
