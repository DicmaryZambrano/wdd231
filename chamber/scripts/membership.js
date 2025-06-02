import { memberships } from "../data/memberships.js"

const membershipList = memberships;
const url = "images/"

function populateMembershipDialog(membership) {
  dialogDetails.innerHTML = '';

  const membershipTier = document.createElement("h2");
  membershipTier.textContent = `Tier: ${membership.tier}`;

  const membershipPrice = document.createElement("p");
  membershipPrice.textContent = `Price: ${membership.price}`;

  const membershipRequirements = document.createElement("p");
  membershipRequirements.textContent = `Requirements: ${membership.requirements}`;

  const benefitLabel = document.createElement("p");
  benefitLabel.textContent = "Benefits:";

  const benefitsUl = document.createElement("ul");
  if (Array.isArray(membership.benefits)) {
    membership.benefits.forEach((benefit) => {
      const li = document.createElement("li");
      li.textContent = benefit;
      benefitsUl.appendChild(li);
    });
  }

  const membershipImage = document.createElement("img");
  if (membership.image) {
    membershipImage.src = `${url}${membership.image}`;
    membershipImage.alt = `${membership.tier} Membership Image`;
    membershipImage.width = 160;
    membershipImage.height = 160;
  }

  dialogDetails.append(
    membershipTier,
    membershipPrice,
    membershipRequirements,
    benefitLabel,
    benefitsUl,
    membershipImage
  );

  memberDialog.showModal();
}

function displayMemberships(memberships) {
  courseContainer.innerHTML = '';

  memberships.forEach((membership) => {
    const button = document.createElement("button");
    button.addEventListener("click", () => populateMembershipDialog(membership));
    button.ariaLabel = `Open information for ${membership.tier} membership`
    button.textContent = membership.tier;
    courseContainer.appendChild(button);
  });
}

const courseContainer = document.querySelector(".membership-cards");
const memberDialog = document.querySelector("#modal-mb");
const dialogDetails = document.querySelector("#modal-mb div");
const courseClose = document.querySelector("#modal-mb button");

const timestampInput = document.getElementById("timestamp");
const now = new Date();
timestampInput.value = now.toISOString();

courseClose.addEventListener("click", () => memberDialog.close());

displayMemberships(membershipList);
