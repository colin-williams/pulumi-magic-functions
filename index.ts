import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { ObjectIdentifier } from "aws-sdk/clients/s3";

// Create an AWS resource (S3 Bucket)
const dataBucket = new aws.s3.Bucket("rearc-demo-bucket");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// Export the name of the bucket
export const bucketName = dataBucket.id;
const { spawn } = require('child_process');


// A handler function that will list objects in the bucket and bulk delete them
const putObjects: aws.cloudwatch.EventRuleEventHandler = async (   event: aws.cloudwatch.EventRuleEvent                                        , .
  ) => {
    //console.log(`stdout: ${stdout}`)
    //console.log(`stdout: ${wget.stdout.toString}`)
    JSDOM.fromURL("https://download.bls.gov/pub/time.series/pr/ ").then((dom:any) => {
      console.log(dom.serialize());
    });

    const putObjectsSchedule: aws.cloudwatch.EventRuleEventSubscription = aws.cloudwatch.onSchedule(
      "putObjects",
      "cron(01 23 * * ? *)",
      putObjects
    );
  }