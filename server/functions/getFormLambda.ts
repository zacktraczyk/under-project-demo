import { DynamoDB } from "aws-sdk";
import { apiGatewayResponse } from "./utillities/response";
import { APIGatewayEvent } from "aws-lambda";

//pulling table name from evironmnet
const { USER_FORM_DATA_TABLE_NAME } = process.env;

//setting dynamoDB client
const dynamoClient = new DynamoDB.DocumentClient();

// function that tries to do the Get
async function getItems(params: DynamoDB.DocumentClient.GetItemInput) {
  try {
    return await dynamoClient.get(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async function (event: APIGatewayEvent) {
  console.log("request:", JSON.stringify(event));

  // if its not given a clientId it will error and tell you
  if (event.pathParameters === null) {
    return apiGatewayResponse(500, "Get not Complete, pathParameter null");
  } else if (event.pathParameters.clientId === null) {
    return apiGatewayResponse(500, "Get not Complete, clientId null");
  } else if (event.pathParameters.formId === null) {
    return apiGatewayResponse(500, "Get not Complete, formId null");
  } else {
    //getting the clientId from the html request
    const clientId = event.pathParameters.clientId;
    const formId = event.pathParameters.formId;

    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: USER_FORM_DATA_TABLE_NAME!,
      Key: {
        clientId: clientId,
        formId: formId,
      },
    };

    try {
      const data: DynamoDB.DocumentClient.GetItemOutput | any = await getItems(
        params
      );
      return apiGatewayResponse(200, data.Item);
    } catch (err) {
      return apiGatewayResponse(500, err);
    }
  }
};
