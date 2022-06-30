import { DynamoDB } from "aws-sdk";
import { apiGatewayResponse } from "./utillities/response";
import { APIGatewayEvent } from "aws-lambda";

//pulling table name from evironmnet
const { USER_FORM_DATA_TABLE_NAME } = process.env;

//setting dynamoDB client
const dynamoClient = new DynamoDB.DocumentClient();

// function that tries to do the query
async function getItems(params: DynamoDB.DocumentClient.QueryInput) {
  try {
    return await dynamoClient.query(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async function (event: APIGatewayEvent) {
  console.log("request:", JSON.stringify(event));
  // if its not given a clientId it will error and tell you
  if (event.pathParameters === null) {
    return apiGatewayResponse(500, "Get not Complete, No clientId given");
  }

  //getting the clientId from the html request
  const clientId = event.pathParameters.clientId;

  //setting up the params to be sent
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: USER_FORM_DATA_TABLE_NAME!,
    KeyConditionExpression: "#87ea0 = :87ea0",
    ExpressionAttributeValues: {
      ":87ea0": clientId,
    },
    ExpressionAttributeNames: {
      "#87ea0": "clientId",
    },
  };

  try {
    const data: DynamoDB.DocumentClient.QueryOutput | any = await getItems(
      params
    );
    return apiGatewayResponse(200, data.Items);
  } catch (err) {
    return apiGatewayResponse(500, err);
  }
};
