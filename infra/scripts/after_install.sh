if [[ "$DEPLOYMENT_GROUP_NAME" == "BenefitFormDeploymentGroup" ]]
then
    mv /tmp/benefit-form/build/* /var/www/benefit/
fi