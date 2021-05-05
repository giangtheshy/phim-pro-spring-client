export default (createdAt) => {
  const time = new Date().getTime() - new Date(createdAt).getTime();
  if (time / (1000 * 60 * 60 * 24 * 30) >= 1) {
    return `${Math.floor(time / (1000 * 60 * 60 * 24 * 30))} months ago`;
  } else if (time / (1000 * 60 * 60 * 24) >= 1) {
    return `${Math.floor(time / (1000 * 60 * 60 * 24))} days ago`;
  } else if (time / (1000 * 60 * 60) >= 1) {
    return `${Math.floor(time / (1000 * 60 * 60))} hours ago`;
  } else if (time / (1000 * 60) >= 1) {
    return `${Math.floor(time / (1000 * 60))} minutes ago`;
  } else {
    return "Just now";
  }
};
