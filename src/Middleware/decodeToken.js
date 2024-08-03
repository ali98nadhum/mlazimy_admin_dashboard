


export const decodeToken = (token) => {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      return null;
    }
    const decodedPayload = JSON.parse(atob(tokenParts[1]));
    return decodedPayload;
  };
  