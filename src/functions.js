import numbro from "numbro";

export const getInstaUser = name => {
  fetch(`https://www.instagram.com/${name}/?__a=1`)
    .then(response => {
      if (!response.ok) {
        alert("User not found");
        throw new Error("User not found");
      }
      return response.json();
    })
    .then(response => {
      const { graphql } = response;

      return {
        count: graphql.user.edge_followed_by.count,
        username: graphql.user.username
      };
    })
    .catch(e => {
      console.log(e);
    });
  return {
    count,
    username
  };
};

export const niceFormat = number => {
  return numbro(number).format({ thousandSeparated: true });
};
