# DIDI's World - Google Apps Script source

Files:

- `Code.gs`: Apps Script backend and image upload logic.
- `index.html`: public website.
- `admin.html`: password-protected content management page.

## Before deployment

In Apps Script, open **Project Settings** > **Script Properties** and add:

| Property | Value |
| --- | --- |
| `DIDI_ADMIN_PIN` | Your new management password |

Do not commit your real management password to GitHub.

## GitHub

Upload all three source files and this README to the repository. The website needs Google Apps Script services (`google.script.run`, DriveApp, and PropertiesService), so GitHub Pages alone cannot provide the management-page and image-upload features.
