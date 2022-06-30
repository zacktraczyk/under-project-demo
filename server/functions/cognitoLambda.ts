import { Callback } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { apiGatewayResponse } from "./utillities/response";

//pulling table name from evironmnet
const { USER_FORM_DATA_TABLE_NAME } = process.env;

//setting dynamoDB client
const dynamoClient = new DynamoDB.DocumentClient();

//function ties to perform the actual put and pass any errors back up
async function createItem(params: {
  TableName: string;
  Item: {
    clientId: string;
    formId: string;
  };
}) {
  try {
    await dynamoClient.put(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async function (
  event: any,
  context: any,
  callback: Callback
) {
  console.log("EVENT: ", event);
  const params = {
    TableName: USER_FORM_DATA_TABLE_NAME!,
    // creating the item
    Item: {
      clientId: event.userName,
      formId: event.request.userAttributes.sub,
    },
  };

  //try to put into the table, 200 success, 500 error
  try {
    await createItem(params);
    console.log("Successfuly created item!");
    callback(null, event);
  } catch (err) {
    console.error(err);
    callback(null, event);
  }
};
