#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ServerStack } from '../lib/server-stack';

const app = new cdk.App();
new ServerStack(app, 'ServerStack');
