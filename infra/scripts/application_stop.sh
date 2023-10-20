if [[ "$DEPLOYMENT_GROUP_NAME" == "MailingBackendAppDeploymentGroup" ]]
then
    pm2 stop all
fi