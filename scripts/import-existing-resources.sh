#!/bin/bash
set -e

echo "Importing existing AWS resources into Terraform state..."

# Import S3 buckets if they exist
if aws s3 ls s3://twin-dev-frontend-146279608294 2>/dev/null; then
  echo "Importing frontend S3 bucket..."
  terraform import aws_s3_bucket.frontend twin-dev-frontend-146279608294 || true
fi

if aws s3 ls s3://twin-dev-memory-146279608294 2>/dev/null; then
  echo "Importing memory S3 bucket..."
  terraform import aws_s3_bucket.memory twin-dev-memory-146279608294 || true
fi

# Import Lambda role if it exists
if aws iam get-role --role-name twin-dev-lambda-role 2>/dev/null; then
  echo "Importing Lambda IAM role..."
  terraform import aws_iam_role.lambda_role twin-dev-lambda-role || true
fi

# Import OIDC provider if it exists
OIDC_ARN="arn:aws:iam::146279608294:oidc-provider/token.actions.githubusercontent.com"
if aws iam get-open-id-connect-provider --open-id-connect-provider-arn "$OIDC_ARN" 2>/dev/null; then
  echo "Importing GitHub OIDC provider..."
  terraform import aws_iam_openid_connect_provider.github "$OIDC_ARN" || true
fi

echo "✅ Resource import complete!"
