import { DynamoDB } from "aws-sdk";
import { apiGatewayResponse } from "./utillities/response";
import { APIGatewayEvent } from "aws-lambda";

//pulling table name from evironmnet
const { USER_FORM_DATA_TABLE_NAME } = process.env;

//setting dynamoDB client
const dynamoClient = new DynamoDB.DocumentClient();

//setting up parameters
const params = {
  TableName: USER_FORM_DATA_TABLE_NAME!,
};

//function to try and get all items, returns error back up if fails
async function listItems() {
  try {
    return await dynamoClient.scan(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async function (event: APIGatewayEvent) {
  console.log("request:", JSON.stringify(event));
  //try to get all items, send 200 with results if works, send 500 with error if failed
  try {
    const data: DynamoDB.DocumentClient.QueryOutput | any = await listItems();
    return apiGatewayResponse(200, data.Items);
  } catch (err) {
    return apiGatewayResponse(500, err);
  }
};
