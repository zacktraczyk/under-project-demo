import { DynamoDB } from "aws-sdk";
import { apiGatewayResponse } from "../utillities/response";
import { APIGatewayEvent } from "aws-lambda";

const { TEXTURE_GROUP_TABLE_NAME } = process.env;
const dynamoClient = new DynamoDB.DocumentClient();

async function getItems(params: DynamoDB.DocumentClient.QueryInput) {
  try {
    return await dynamoClient.query(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async function (event: APIGatewayEvent) {
  console.log("request:", JSON.stringify(event));
  if (event.pathParameters === null) {
    return apiGatewayResponse(500, "Get not Complete, No id given");
  }
  const id = event.pathParameters.id;

  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: TEXTURE_GROUP_TABLE_NAME!,
    KeyConditionExpression: "#87ea0 = :87ea0",
    ExpressionAttributeValues: {
      ":87ea0": id,
    },
    ExpressionAttributeNames: {
      "#87ea0": "userName",
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
