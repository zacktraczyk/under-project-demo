import { DynamoDB } from "aws-sdk";
import { apiGatewayResponse } from "../utillities/response";
import { APIGatewayEvent } from "aws-lambda";

const { TEXTURE_GROUP_TABLE_NAME } = process.env;
const dynamoClient = new DynamoDB.DocumentClient();

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
  const body =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  const params = {
    TableName: TEXTURE_GROUP_TABLE_NAME!,
    Item: {
      clientId: body.clientId,
      formId: body.formId,
      ...body,
    },
  };

  try {
    await createItem(params);
    return apiGatewayResponse(200, "Successfuly created item!");
  } catch (err) {
    return apiGatewayResponse(500, err);
  }
};
