// utils/render.js

exports.renderWithLayout = (res, view, options = {}) => {
  return res.render("layouts/main", {
    ...options,
    body: require("ejs").render(
      require("fs").readFileSync(`views/${view}.ejs`, "utf-8"),
      options
    )
  });
};