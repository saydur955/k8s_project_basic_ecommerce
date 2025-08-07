#!/bin/bash


# --------------------------
# 1. Publish your npm package (common)
# --------------------------


echo "🚀 Publishing common package"
cd ./common || { echo "❌ Failed to enter ./common directory"; exit 1; }

rm ./tsconfig.tsbuildinfo

rm -rf ./build

rm -rf ./git

# Get new version
git init
git add .
git commit -m "updated"
npm version patch

NEW_VERSION=$(node -p "require('./package.json').version")

npm publish --access public || { echo "❌ Publish failed"; exit 1; }


echo "✅ Published common@${NEW_VERSION}"
cd ..



# wait 1 min
echo "⏳ Waiting 10 seconds before updating services..."
sleep 10

# --------------------------
# 2. Update all dependent services
# --------------------------

# SERVICES=("service-1" "service-2" "service-3") 
SERVICES=("products" "auth" "orders")  # Add/remove services as needed


for SERVICE in "${SERVICES[@]}"; do
  echo ""
  echo "🔄 Updating ${SERVICE}..."
  
  cd "$SERVICE" || { echo "❌ Can't access ${SERVICE}"; continue; }
  
  # Update dependency
  npm cache clean --force

  # wait 1 min
  echo "⏳ Waiting 10 seconds before updating services..."
  sleep 10

  npm install "@bivajon/common@${NEW_VERSION}" && \
  echo "✅ Updated ${SERVICE} to common@${NEW_VERSION}" || \
  echo "⚠️  Failed to update ${SERVICE}"

  # wait 5 sec
  sleep 5
  
  cd ..
done


echo ""
echo "Services updated to common@${NEW_VERSION}"


# --------------------------
# 3. Remove .git
# --------------------------

cd ./common

rm -rf .git

echo ".git removed"

cd ..

echo "🎉 All done!"


