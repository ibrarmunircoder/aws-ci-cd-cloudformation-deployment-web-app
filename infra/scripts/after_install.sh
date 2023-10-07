if [[ "$DEPLOYMENT_GROUP_NAME" == "BenefitFormDeploymentGroup" ]]
then
    rm -rf /var/www/benefit-form/*
    mv /tmp/benefit-form/build/* /var/www/benefit-form/
fi

if [[ "$DEPLOYMENT_GROUP_NAME" == "AdminPanelDeploymentGroup" ]]
then
    rm -rf /var/www/admin-panel/*
    mv /tmp/admin-panel/build/* /var/www/admin-panel/
fi

if [[ "$DEPLOYMENT_GROUP_NAME" == "MailingBackendAppDeploymentGroup" ]]
then
    rm -rf /var/www/backend-app/*
    mv /tmp/backend-app/* /var/www/backend-app/
    npm --prefix /var/www/backend-app install
    npm --prefix /var/www/backend-app run migration:up
    npm --prefix /var/www/backend-app run build
    npm --prefix /var/www/backend-app run start
fi