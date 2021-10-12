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
const putObjects: aws.cloudwatch.EventRuleEventHandler = async (
    //console.log(`stdout: ${stdout}`)
    //console.log(`stdout: ${wget.stdout.toString}`)
    JSDOM.fromURL("https://download.bls.gov/pub/time.series/pr/ ").then((dom:any) => {
      console.log(dom.serialize());
    });
    
    
    //const awsS3Spawn = spawnSync(`aws s3 sync /tmp/download.bls.gov ${bucketName.get}`);


const putObjectsSchedule: aws.cloudwatch.EventRuleEventSubscription = aws.cloudwatch.onSchedule(
  "putObjects",
  "cron(01 23 * * ? *)",
  putObjects
);
    
    /*
    const s3Client = new aws.sdk.S3(); //creates interface to service
    const bucket = dataBucket.id.get();
  
    const { Contents = [] } = await s3Client //get list of objects in bucket
      .listObjects({ Bucket: bucket })
      .promise();
    const objects: ObjectIdentifier[] = Contents.map(object => {
      return { Key: object.Key! };
    });
  
    await s3Client //delete objects
      .deleteObjects({
        Bucket: bucket,
        Delete: { Objects: objects, Quiet: false }
      })
      .promise()
      .catch(error => console.log(error));
    console.log(
      `Deleted ${Contents.length} item${
        Contents.length === 1 ? "" : "s"
      } from ${bucket}.`
    );
    */
