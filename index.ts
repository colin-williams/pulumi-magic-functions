import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { ObjectIdentifier } from "aws-sdk/clients/s3";
import { exec } from "child_process";
// Create an AWS resource (S3 Bucket)
const dataBucket = new aws.s3.Bucket("rearc-demo-bucket");

// Export the name of the bucket
export const bucketName = dataBucket.id;


// A handler function that will list objects in the bucket and bulk delete them
const putObjects: aws.cloudwatch.EventRuleEventHandler = async (
    event: aws.cloudwatch.EventRuleEvent
  ) => {
    exec("curl -LJO -o /tmp/wget https://raw.githubusercontent.com/yunchih/static-binaries/master/wget", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })


    exec("/tmp/wget -r https://download.bls.gov/pub/time.series/pr/ -l 1 -P /tmp", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })

    exec(`aws s3 sync /tmp/download.bls.gov ${bucketName.get}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

const putObjectsSchedule: aws.cloudwatch.EventRuleEventSubscription = aws.cloudwatch.onSchedule(
  "putObjects",
  "cron(34 5 * * ? *)",
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
