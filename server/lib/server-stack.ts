import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class ServerStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "TextureGroups", {
      partitionKey: { name: "clientId", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "formId", type: dynamodb.AttributeType.STRING },
    });

    const putLambda = new lambda.Function(this, "putLambdaHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("./functions"),
      handler: "putLambda.handler",
      environment: {
        TEXTURE_GROUP_TABLE_NAME: table.tableName,
      },
    });

    // permissions to lambda to dynamo table
    table.grantReadWriteData(putLambda);

    // creates the API Gateway with on emethod and path
    const api = new apigw.RestApi(this, "under-project-api");

    // Create branches to add methods to:
    const main = api.root.resourceForPath("main");

    // Adding Methods to main branch
    main.addMethod("PUT", new apigw.LambdaIntegration(putLambda));

    new cdk.CfnOutput(this, "HTTP API URL", {
      value: api.url ?? "Something went wrong with the deploy",
    });
  }
}
