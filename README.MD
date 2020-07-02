# Echo bot template

# Setup

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

# Deployment

> If you already deployed your Azure Web App before merging application settings, you will need to deploy from GitHub Actions again.
