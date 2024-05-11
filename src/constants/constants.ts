export const REFERAL_AVATAR = [
  {
    name: "John doe",
    avatar_url:
      "https://www.payal.co.uk/wp-content/uploads/image_carousel_thumbs/Dummy-profile-picture-nx3mkaougs1i6vxuvb4p5i72go7eap7qkoqrv1pd8k.png",
  },
  {
    name: "Doe john",
    avatar_url:
      "https://www.payal.co.uk/wp-content/uploads/image_carousel_thumbs/Dummy-profile-picture-nx3mkaougs1i6vxuvb4p5i72go7eap7qkoqrv1pd8k.png",
  },
];

// exp 1-10 yrs
export const EXPERIENCE_OPTIONS: string[] = new Array(10)
  .fill(1)
  .map((_, i) => (i + 1).toString());

// location
export const LOCATION_OPTIONS: string[] = ["Remote", "Hybrid", "In-office"];

// roles
export const ROLES_OPTIONS: string[] = [
  "Frontend",
  "Backend",
  "Dev ops",
  "Android",
  "Ios",
];

// min pay
export const MIN_PAY_OPTIONS: string[] = [
  "Less than $30",
  "Less than $60",
  "Less than $90",
  "Less than $120",
  "More than $120",
];
