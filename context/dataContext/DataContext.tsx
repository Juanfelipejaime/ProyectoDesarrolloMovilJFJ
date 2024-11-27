import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { dataReducer } from "./DataReducer";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { DefaultResponse, PostProps, UserChange } from "@/interface/postInterface";
import { addDoc, collection, doc, getDocs, onSnapshot, query, setDoc, Unsubscribe, where } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { AuthContext } from "../authContext/AuthContext";

export interface DataState {
    userGet: [],
    changeUser: [],
    getAllUser: [],
    messages: [],
}

const dataStateDefault: DataState = {
    userGet: [],
    changeUser: [],
    //getTags: [],
    getAllUser: [],
    messages: []
}

interface DataContextProps {
    state: DataState,
    getUser: () => Promise<void>,
    modUser: ( username: string, photo:string) => Promise<boolean>,
    getAllUsers: () => Promise<void>,
    addMessageToChat: (chatId: string, newMessage: any) => void
}


export const DataContext = createContext({} as DataContextProps);

export function DataProvider({ children }: any) {

    const [messages, setMessages] = useState<any[]>([]);
    const [state, dispatch] = useReducer(dataReducer, dataStateDefault);
    const { state: { user } } = useContext(AuthContext)

    useEffect(() => {
            getUser();
            getAllUsers();
    }, []);


    const uploadImage = async (uri: string) => {
        const storage = getStorage(); // posts/nombre
        const storageRef = ref(storage, 'posts/'+ user.uid ?? "" + "-"+ Date.now());

        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            const snapshot = await uploadBytes(storageRef, blob)
            const url = await getDownloadURL(storageRef);

            console.log('Uploaded a raw string!');

            return url ??" ";
        } catch (error) {
            console.log(error)
            return""
        }
    }

    const getUser = async () => {
        try {
            const postref = collection(db, "users");
            const qu = query(postref, where("usuario", "==", user.uid));
            const querySnapshot = await getDocs(qu);

            const users = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            dispatch({type: "getUser", payload: users})
        } catch (error){
            console.log(error)
        }
    }

    const modUser = async (username: string, foto: string): Promise<boolean> => {

        try {
            let urlImage = await uploadImage(foto);

            console.log({
                username
            })

            // Guardar los datos del usuario en Firestore
            await setDoc(doc(db, "users", user.uid), {
                foto: urlImage,
                email: user.email,
                username: username,
                juegos: user.juegos
            });
            dispatch({ type: "changeUser", payload: true })
            return true;
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error: ", {
                errorCode,
                errorMessage
            })
            return false
        }
    }

    const getAllUsers = async () => {
        try {
            const postref = collection(db, "users");
            const querySnapshot = await getDocs(postref);

            const users = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            dispatch({type: "getAllUser", payload: users})
        } catch (error){
            console.log(error)
        }
    } 


    return <DataContext.Provider
        value={{
            state,
            getUser,
            modUser,
            getAllUsers,
            addMessageToChat(chatId, newMessage) {
                
            },
        }}
    >
        {children}
    </DataContext.Provider>
}