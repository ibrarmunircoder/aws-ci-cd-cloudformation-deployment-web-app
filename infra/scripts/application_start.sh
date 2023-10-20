
if [[ "$DEPLOYMENT_GROUP_NAME" == "MailingBackendAppDeploymentGroup" ]]
then
    pm2 start "npm --prefix /var/www/backend-app run start" --name MailingBackendApp --log-date-format 'DD-MM HH:mm:ss.SSS'
fi