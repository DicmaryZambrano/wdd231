const url = "./data/members.json";
const memberSection = document.querySelector(".spotlight-list");

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
  memberImage.loading = "lazy";
  memberImage.src = data.logo;
  memberImage.alt = `${data.name}'s logo`;
  memberImage.width = 600;
  memberImage.height = 600;
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
    memberSection.appendChild(memberCard);
  });

}

function getRandomMembers(members, count) {
  const shuffledMembers = members.sort(() => 0.5 - Math.random());
  return shuffledMembers.slice(0, count);
}

async function getMembers(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    const memberFilter = data.members.filter(member => member.membership == 3 || member.membership == 2)
    const randomMembers = getRandomMembers(memberFilter, 4);

    displayMembers(randomMembers);
  }
}

getMembers(url)