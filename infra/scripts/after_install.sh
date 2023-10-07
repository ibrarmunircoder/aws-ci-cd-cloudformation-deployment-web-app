if [[ "$DEPLOYMENT_GROUP_NAME" == "BenefitFormDeploymentGroup" ]]
then
    mv /tmp/benefit-form/build/* /var/www/benefit-form/
fi

if [[ "$DEPLOYMENT_GROUP_NAME" == "AdminPanelDeploymentGroup" ]]
then
    mv /tmp/admin-panel/build/* /var/www/admin-panel/
fi