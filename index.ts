import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { ObjectIdentifier } from "aws-sdk/clients/s3";
const { spawnSync } = require('child_process');

// Create an AWS resource (S3 Bucket)
const dataBucket = new aws.s3.Bucket("rearc-demo-bucket");

// Export the name of the bucket
export const bucketName = dataBucket.id;


// A handler function that will list objects in the bucket and bulk delete them
const putObjects: aws.cloudwatch.EventRuleEventHandler = async (
    event: aws.cloudwatch.EventRuleEvent
  ) => {
    const curl = spawnSync("curl -LJO -o /tmp/wget https://raw.githubusercontent.com/yunchih/static-binaries/master/wget");

    curl.stdout.on('data', (data: string) => {
      console.log(`stdout: ${data}`);
    });
    
    curl.stderr.on('data', (data: string) => {
      console.error(`stderr: ${data}`);
    });
    
    curl.on('close', (code: number) => {
      console.log(`child process exited with code ${code}`);
    });


    const wgetSpawned = spawnSync("/tmp/wget -r https://download.bls.gov/pub/time.series/pr/ -l 1 -P /tmp");
    
    // const awsS3Spawn = spawnSync(`aws s3 sync /tmp/download.bls.gov ${bucketName.get}`);

}

const putObjectsSchedule: aws.cloudwatch.EventRuleEventSubscription = aws.cloudwatch.onSchedule(
  "putObjects",
  "cron(52 19 * * ? *)",
  putObjects
);
