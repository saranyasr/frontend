const { default: api } = require("./api");

const handleToken = (accessToken) => {
  if (accessToken) {
    console.log("====================================");
    console.log("====================================");
    
    localStorage.setItem("accessToken", accessToken);

    
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common.Authorization;
  }
};

export { handleToken };
