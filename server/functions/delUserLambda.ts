import { DynamoDB } from "aws-sdk";
import { apiGatewayResponse } from "./utillities/response";
import { APIGatewayEvent } from "aws-lambda";

//pulling table name from evironmnet
const { USER_FORM_DATA_TABLE_NAME } = process.env;

//setting dynamoDB client
const dynamoClient = new DynamoDB.DocumentClient();

// function that tries to do the delete
async function delItem(params: DynamoDB.DocumentClient.DeleteItemInput) {
  try {
    return await dynamoClient.delete(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async function (event: APIGatewayEvent) {
  console.log("request:", JSON.stringify(event));

  // if its not given a clientId it will error and tell yo
  if (event.pathParameters === null) {
    return apiGatewayResponse(500, "Get not Complete, No clientId given");
  }

  //getting the clientId from the html request
  const clientId = event.pathParameters.clientId;

  //setting up params to be sent
  const params: DynamoDB.DocumentClient.DeleteItemInput = {
    TableName: USER_FORM_DATA_TABLE_NAME!,
    Key: {
      clientId: clientId,
    },
  };

  //actually try to make the request now
  try {
    const data: DynamoDB.DocumentClient.DeleteItemOutput | any = await delItem(
      params
    );
    return apiGatewayResponse(200, "Succesfully deleted item");
  } catch (err) {
    return apiGatewayResponse(500, err);
  }
};
