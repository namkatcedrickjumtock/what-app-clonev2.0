const getRecipientEmail = (user, userLoggedIn) =>user?.filter(userToFilter => userToFilter !== userLoggedIn?.email)

export default getRecipientEmail;