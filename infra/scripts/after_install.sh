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