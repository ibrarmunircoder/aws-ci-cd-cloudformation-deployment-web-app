if [[ "$DEPLOYMENT_GROUP_NAME" == "BenefitFormDeploymentGroup" ]]
then
    mkdir -p /var/www/benefit
    mv /tmp/benefit/* /var/www/benefit/
fi