export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
}


export const getToken = () => {
    return localStorage.getItem("token");
}

export const deleteToken = () => {
    localStorage.removeItem("token")
}


