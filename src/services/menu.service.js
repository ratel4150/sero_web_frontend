import {menusUserIdRequest} from '../api/menu'

export const getMenusUserId = async (user_id) => {
  try {
    const res = await menusUserIdRequest(user_id)
    //console.log('este es el 1er res:' + res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}