#!/bin/bash
BACKUP=$1

psql -h default-group2-database.francecentral.cloudapp.azure.com -p 5432 -d postgres -U postgres < $BACKUP
