const url = "./data/members.json";

const membersContainer = document.querySelector("#Cards");

function generateMemberCard(data) {
  const memberCard = document.createElement("div");
  memberCard.classList.add("member-card");

  const memberBadge = document.createElement("div");
  switch (data.membership) {
    case 3:
      memberCard.classList.add("gold-member");
      memberBadge.classList.add("membership-badge");
      memberBadge.classList.add("membership-gold");
      memberBadge.textContent = "Gold";
      break;
    case 2:
      memberCard.classList.add("silver-member");
      memberBadge.classList.add("membership-badge");
      memberBadge.classList.add("membership-silver");
      memberBadge.textContent = "Silver";
      break;
    default:
      memberCard.classList.add("bronze-member");
      memberBadge.classList.add("membership-badge");
      memberBadge.classList.add("membership-bronze");
      memberBadge.textContent = "Bronze";
  }
  memberCard.appendChild(memberBadge);

  const memberName = document.createElement("h3");
  memberName.textContent = data.name;
  memberCard.appendChild(memberName);

  const memberImage = document.createElement("img");
  memberImage.src = data.logo;
  memberImage.alt = `${data.name}'s logo`;
  memberImage.width = 600;
  memberImage.width = 600;
  memberCard.appendChild(memberImage);

  const memberAddress = document.createElement("p");
  memberAddress.textContent = data.address;
  memberCard.appendChild(memberAddress);

  const memberPhone = document.createElement("p");
  memberPhone.textContent = data.phone;
  memberCard.appendChild(memberPhone);

  const memberWebsite = document.createElement("a");
  memberWebsite.href = data.website;
  memberWebsite.textContent = data.website;
  memberCard.appendChild(memberWebsite);

  return memberCard;
}

function displayMembers(members) {
  members.forEach((member) => {
    const memberCard = generateMemberCard(member);
    membersContainer.appendChild(memberCard);
  });

}

async function getMemberData() {
  try {
    // after this line, our function will wait for the `fetch()` call to be settled
    // the `fetch()` call will either return a Response or throw an error
    const response = await fetch(
      url
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    // after this line, our function will wait for the `response.json()` call to be settled
    // the `response.json()` call will either return the parsed JSON object or throw an error
    const data = await response.json();
    console.log(data);
    displayMembers(data.members);

  } catch (error) {
    console.error(`Could not get members: ${error}`);
  }
}

getMemberData();