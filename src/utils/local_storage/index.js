import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage("your-secret-key");

export const setItem = (payload) => {
    if(Object.keys(payload).length > 0){
        let keys = Object.keys(payload);
        
        for(let i = 0; i < keys.length; i++){
            encryptStorage.setItem(keys[i], payload[keys[i]]);
        }
    }
};
export const getItem = (key) => encryptStorage.getItem(key);
export const removeItem = (key) => encryptStorage.removeItem(key);