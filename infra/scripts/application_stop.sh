if [[ "$DEPLOYMENT_GROUP_NAME" == "MailingBackendAppDeploymentGroup" ]]
then
    echo $DEPLOYMENT_GROUP_NAME
    pm2 stop all
fi