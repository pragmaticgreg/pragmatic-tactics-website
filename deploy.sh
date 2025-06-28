#!/bin/bash

# Strategic Solutions Consulting Website Deployment Script
# This script automates the deployment to Google Cloud App Engine

echo "🚀 Strategic Solutions Consulting Website Deployment"
echo "=================================================="

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK is not installed."
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "🔐 Please authenticate with Google Cloud..."
    gcloud auth login
fi

# Get current project
CURRENT_PROJECT=$(gcloud config get-value project 2>/dev/null)

if [ -z "$CURRENT_PROJECT" ]; then
    echo "📋 No project set. Please enter your Google Cloud Project ID:"
    read -p "Project ID: " PROJECT_ID
    
    # Set the project
    gcloud config set project $PROJECT_ID
    
    # Check if project exists
    if ! gcloud projects describe $PROJECT_ID &>/dev/null; then
        echo "❌ Project $PROJECT_ID does not exist or you don't have access."
        echo "Creating new project..."
        gcloud projects create $PROJECT_ID --name="Strategic Solutions Website"
        gcloud config set project $PROJECT_ID
    fi
else
    echo "📋 Using project: $CURRENT_PROJECT"
    PROJECT_ID=$CURRENT_PROJECT
fi

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable appengine.googleapis.com

# Check if App Engine is initialized
if ! gcloud app describe &>/dev/null; then
    echo "🏗️  Initializing App Engine..."
    echo "Available regions:"
    echo "  us-central1 (Iowa)"
    echo "  us-east1 (South Carolina)"
    echo "  europe-west1 (Belgium)"
    echo "  asia-northeast1 (Tokyo)"
    
    read -p "Enter region (default: us-central1): " REGION
    REGION=${REGION:-us-central1}
    
    gcloud app create --region=$REGION
fi

# Deploy the application
echo "🚀 Deploying to App Engine..."
gcloud app deploy --quiet

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "🌐 Your website is now live at:"
    gcloud app browse --no-launch-browser
    echo ""
    echo "📊 To view logs: gcloud app logs tail -s default"
    echo "🔧 To update: Run this script again after making changes"
    echo ""
    echo "🎉 Congratulations! Your consulting website is now live on Google Cloud!"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi 