# Echo bot template

# Setup

1. [Create a new Azure Web App](#create-a-new-azure-web-app)
1. [Generate a new repository](#generate-a-new-github-repository)

## Azure Web Apps

### Create a new Azure Web Apps

Navigate to https://ms.portal.azure.com/#create/Microsoft.WebSite and start creating a new Azure Web App.

- Publish: Code
- Runtime stack: Node.js 12 LTS
- Operating System: Windows

### Update general settings

- Required
   - Web sockets: On
- Optional
   - FTP state: Disabled
   - ARR affinity: Off

### Merge application settings

Update the application settings JSON below and merge it into your Azure Web App.

#### Required

```json
[
  {
    "name": "DIRECTLINE_EXTENSION_VERSION",
    "value": "latest",
    "slotSetting": false
  },
  {
    "name": "DirectLineExtensionKey",
    "value": "",
    "slotSetting": false
  },
  {
    "name": "MicrosoftAppId",
    "value": "",
    "slotSetting": false
  },
  {
    "name": "MicrosoftAppPassword",
    "value": "",
    "slotSetting": false
  },
  {
    "name": "WEBSITE_RUN_FROM_PACKAGE",
    "value": "1",
    "slotSetting": false
  }
]
```

#### Optional

```json
[
  {
    "name": "DIRECT_LINE_SECRET",
    "value": "",
    "slotSetting": false
  },
  {
    "name": "SPEECH_SERVICES_REGION",
    "value": "",
    "slotSetting": false
  },
  {
    "name": "SPEECH_SERVICES_SUBSCRIPTION_KEY",
    "value": "",
    "slotSetting": false
  }
]
```

## Generate a new GitHub repository

> If you already deployed your Azure Web App before merging application settings, you will need to deploy from GitHub Actions again.

Build a new repository by navigate to https://github.com/compulim/botframework-echobot-template/generate.

### Add new secret `PUBLISH_PROFILE`

Go to Settings > Secrets, add a new secret `PUBLISH_PROFILE`.

The content is from the `*.PublishSettings` file from your Azure Web App. Steps at https://docs.microsoft.com/en-us/visualstudio/deployment/tutorial-import-publish-settings-azure?view=vs-2019#create-the-publish-settings-file-in-azure-app-service.

### Restart the first GitHub Actions workflow

Shortly after you generated the repository, a workflow named "Initial commit" will be started.

Since the `PUBLISH_PROFILE` was not set when the workflow is started, the deploy step will fail.

After you added `PUBLISH_PROFILE`, please re-run the "Initial commit" workflow and it should succeed.
