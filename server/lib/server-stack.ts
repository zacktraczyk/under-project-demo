import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { Grant } from "aws-cdk-lib/aws-iam";

export class ServerStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "User-Form-Data", {
      partitionKey: { name: "clientId", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "formId", type: dynamodb.AttributeType.STRING },
    });

    // Lambda that handles putting
    const putLambda = new lambda.Function(this, "putLambdaHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("./functions"),
      handler: "putLambda.handler",
      environment: {
        USER_FORM_DATA_TABLE_NAME: table.tableName,
      },
    });

    // Lambda that handles scan
    const scanLambda = new lambda.Function(this, "scanLambdaHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("./functions"),
      handler: "scanLambda.handler",
      environment: {
        USER_FORM_DATA_TABLE_NAME: table.tableName,
      },
    });

    // Lambda that handles Getting all the entries for a given user
    const queryUserLambda = new lambda.Function(
      this,
      "queryUserLambdaHandler",
      {
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("./functions"),
        handler: "queryUserLambda.handler",
        environment: {
          USER_FORM_DATA_TABLE_NAME: table.tableName,
        },
      }
    );

    // Lambda that handles deleting given a userId
    const delUserLambda = new lambda.Function(this, "delUserLambdaHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("./functions"),
      handler: "delUserLambda.handler",
      environment: {
        USER_FORM_DATA_TABLE_NAME: table.tableName,
      },
    });

    const getFormLambda = new lambda.Function(this, "getFormLambdaHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("./functions"),
      handler: "getFormLambda.handler",
      environment: {
        USER_FORM_DATA_TABLE_NAME: table.tableName,
      },
    });

    const delFormLambda = new lambda.Function(this, "delFormLambdaHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("./functions"),
      handler: "delFormLambda.handler",
      environment: {
        USER_FORM_DATA_TABLE_NAME: table.tableName,
      },
    });

    // permissions to lambda to dynamo table
    table.grantWriteData(putLambda);
    table.grantReadData(scanLambda);
    table.grantReadData(queryUserLambda);
    table.grantReadWriteData(delUserLambda);
    table.grantReadData(getFormLambda);
    table.grantReadWriteData(delFormLambda);

    // creates the API Gateway with on emethod and path
    const api = new apigw.RestApi(this, "under-project-api");

    // Create branches to add methods to:
    const main = api.root.resourceForPath("main");
    const users = main.addResource("{clientId}");
    const form = users.addResource("{formId}");

    // Adding Methods to main branch
    main.addMethod("PUT", new apigw.LambdaIntegration(putLambda));
    main.addMethod("GET", new apigw.LambdaIntegration(scanLambda));

    // Adding methods to users branch
    users.addMethod("GET", new apigw.LambdaIntegration(queryUserLambda));
    //This was removed because there must be a way to do it easily and its not very useful lol
    //users.addMethod("DELETE", new apigw.LambdaIntegration(delUserLambda));

    // Adding methods to the form branch
    form.addMethod("GET", new apigw.LambdaIntegration(getFormLambda));
    form.addMethod("DELETE", new apigw.LambdaIntegration(delFormLambda));

    new cdk.CfnOutput(this, "HTTP API URL", {
      value: api.url ?? "Something went wrong with the deploy",
    });
  }
}
