#!/bin/bash

# Define the list of Kubernetes configuration files in the order of deployment
FILES=(
  "namespace.yaml"             # Create the namespace first
  "config-map.yaml"            # Deploy ConfigMap
  "secret.yaml"                # Deploy Secret
  "postgres-service.yaml"      # Postgres service
  "postgres-statefulset.yaml"  # Postgres StatefulSet
  "backend-deployment.yaml"    # Backend deployment
  "backend-service.yaml"       # Backend service
)

# Ensure the user has kubectl installed
if ! command -v kubectl &>/dev/null; then
  echo "kubectl not found. Please install kubectl to proceed."
  exit 1
fi

# Apply each file
for FILE in "${FILES[@]}"; do
  if [[ -f "$FILE" ]]; then
    echo "Applying $FILE..."
    kubectl apply -f "$FILE"
    if [[ $? -ne 0 ]]; then
      echo "Error applying $FILE. Exiting."
      exit 1
    fi
  else
    echo "File $FILE not found. Skipping."
  fi
done

echo "All configuration files applied successfully."
