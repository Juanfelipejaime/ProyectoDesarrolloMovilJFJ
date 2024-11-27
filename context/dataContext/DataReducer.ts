import { DataState } from "./DataContext";

type ActionsProps = { type: "getPosts", payload: any } | {type: "getAllPosts", payload: any} 
| {type: "getUser", payload: any} | {type: "changeUser", payload: any} | {type: "getTags", payload: any}
| {type: "getAllUser", payload: any} | {type: "getMessages", payload: any}

export const dataReducer = (state: DataState, actions: ActionsProps): DataState => {
    switch (actions.type) {
            case "getAllPosts":
                return {
                    ...state,
                    allPosts: actions.payload
                }
                case "getUser":
                    return {
                        ...state,
                        userGet: actions.payload
                    }
                    case "changeUser":
                        return {
                            ...state,
                            changeUser: actions.payload
                        }
                        case "getTags":
                        return {
                            ...state,
                            changeUser: actions.payload
                        }
                        case "getAllUser":
                    return {
                        ...state,
                        getAllUser: actions.payload
                    }
                        case "getMessages":
                    return {
                        ...state,
                        messages: actions.payload
                    }
    

        default:
            return state
    }
}