import { DynamoDB } from "aws-sdk";
import { apiGatewayResponse } from "./utillities/response";
import { APIGatewayEvent } from "aws-lambda";

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

exports.handler = async function (event: APIGatewayEvent) {
  console.log("request:", JSON.stringify(event));
  // translating the body if needed
  const body =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  const params = {
    TableName: USER_FORM_DATA_TABLE_NAME!,
    // creating the item
    Item: {
      clientId: body.clientId,
      formId: body.formId,
      ...body,
    },
  };

  //try to put into the table, 200 success, 500 error
  try {
    await createItem(params);
    return apiGatewayResponse(200, "Successfuly created item!");
  } catch (err) {
    return apiGatewayResponse(500, err);
  }
};
